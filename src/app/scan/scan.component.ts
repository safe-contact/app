import { Component, OnInit } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';
import { Platform } from '@ionic/angular';
import { UUIDService } from '../core/uuid.service';
import { ScanService } from './scan.service';



@Component({
  selector: 'mv-scan',
  templateUrl: 'scan.component.html',
  styleUrls: ['scan.component.scss']
})
export class ScanComponent implements OnInit {
  status = '';

  devices = {};
  uuidsList = {};
  devicesUUids = {};

  //  seenDevices = {};
  statusAdvertising = '';


  userId: string;
  discovering: false;


  constructor(
    private androidPermissions: AndroidPermissions,
    private platform: Platform,
    private bluetoothle: BluetoothLE,
    private scanService: ScanService,
    private uuidService: UUIDService
  ) { }

  ngOnInit() {
    this.userId = this.uuidService.getUserID();


    // Dans le cas d'Android on demande des permissions spécifiques
    if (this.platform.is('android')) {
      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION]);
      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.BLUETOOTH]);
      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.BLUETOOTH_ADMIN]);
    }

  //  setTimeout(async () => {
      this.initAll();
  //  }, 2000);


  }

  initAll() {

    // Initialisation du Bluetooth
    this.bluetoothle.initialize({ request: true, statusReceiver: true }).subscribe(
      (initRes) => {

        // Initialisation du publish
        this.bluetoothle.initializePeripheral({ request: true, restoreKey: "bluetoothleplugin" }).subscribe(
          (initPerifRes) => {
            if (initPerifRes.status === 'enabled') {
              this.initPublish();
            }

            if (initPerifRes.status == 'connected') {
              let distantAddress = initPerifRes.address;

              this.bluetoothle.connect({ "address": distantAddress }).subscribe((resultC) => {
                // Si on a réussi à se connecter on va cherchér les informations
                this.discoverDevice(distantAddress, {});

              }, (error) => {
                console.log('error connect', error.message);
              });
            }

          },
          (err) => {
            console.log('error publish');
            console.log('error publish', err.message);
          });



        // On commence à scanner
        this.startReader();

      },
      err => {
        console.log('error initialize');
        console.log('error initialize', err.message);
      });

  }




  startReader() {

    this.status = 'Demarrage Reader';

    // Scan toutes les 20 secondes
    setInterval(() => {
      this.scan();
    }, 20000);

  }



  async initPublish() {


    let serviceParams = {
      service: "9997",
      characteristics: [
        {
          uuid: this.userId,
          permissions: {
            read: true,
            write: true
          },
          properties: {
            read: true,
            writeWithoutResponse: true,
            write: true,
            notify: true,
            indicate: true
          }
        }
      ]
    };


    this.bluetoothle.addService(serviceParams).then((result) => {

      // Dans le cas d'Android
      if (this.platform.is('android')) {
        // setInterval(() => {

        let advertisingParams: any = {
          name: "virhelp",
          uuid: this.userId,
          mode: "lowLatency",
          connectable: true,
          timeout: 0,
          service: '9997'
        };


        this.bluetoothle.startAdvertising(advertisingParams).then((resultA) => {
          this.statusAdvertising = resultA.status;
        }, (error) => {
          console.log('error advertising', error.message);
        });

      }
      // Dans le cas iOs, il semble qu'il faille relancer si nécessaire
      else {
        let advertisingParams: any = {
          name: "virhelp",
          uuid: this.userId,
          mode: "lowLatency",
          connectable: true,
          timeout: 0,
          services: ["9997"]
        };


        this.bluetoothle.startAdvertising(advertisingParams).then((resultA) => {
          this.statusAdvertising = resultA.status;
        }, (error) => {
          console.log('error advertising', error.message);
          if (error.message === 'Advertising already started') {
            this.bluetoothle.stopAdvertising().then((resultSt) => {
              this.statusAdvertising = resultSt.status;
              this.initPublish();
            }, (error) => {
              console.log('error stop advertising', error.message);
            });
          }
        });

      }

    }, (error) => {
      console.log('error service', error.message);
    });

  }







  async scan() {

    this.status = 'Scan en cours';

    try {
      await this.bluetoothle.stopScan();
    } catch (e) { }

    const options = {
      "services": [
        '9997'
      ],
      "allowDuplicates": true,
      "scanMode": this.bluetoothle.SCAN_MODE_LOW_LATENCY,
      "matchMode": this.bluetoothle.MATCH_MODE_AGGRESSIVE,
      "matchNum": this.bluetoothle.MATCH_NUM_MAX_ADVERTISEMENT,
      "callbackType": this.bluetoothle.CALLBACK_TYPE_ALL_MATCHES,
    };


    this.devices = {};

    // On commence le scan
    this.bluetoothle.startScan(options).subscribe(
      event => {
        if (event.status === 'scanResult') {

          let theAddress = event.address;

          // Si on ne l'a pas déjà vu pendant ce scan
          if (!this.devices[theAddress]) {
            this.devices[theAddress] = event;

            // Si on connait déjà ce device et sa relation avec un uuid, pas besoin de l'interogger
            if (this.devicesUUids[theAddress]) {

              let date = new Date();
              const theUiid = this.devicesUUids[theAddress].uuid;

              // On met à jour la dernière fois qu'on l'a vu
              if (this.uuidsList[theUiid]) {
                this.uuidsList[theUiid].last = new Date().toLocaleTimeString();
                this.uuidsList[theUiid].rssiMin = (event.rssi && event.rssi < this.uuidsList[theUiid].rssiMin ? event.rssi : this.uuidsList[theUiid].rssiMin);
                this.uuidsList[theUiid].rssiMax = (event.rssi && event.rssi > this.uuidsList[theUiid].rssiMax ? event.rssi : this.uuidsList[theUiid].rssiMax);

              } else {
                // Ou on l'initialise
                let date = new Date();

                this.uuidsList[theUiid] = {
                  uuid: theUiid,
                  address: theAddress,
                  first: date.toLocaleTimeString(),
                  last: date.toLocaleTimeString(),
                  rssiMin: event.rssi,
                  rssiMax: event.rssi

                }
              }

            } else {
                            // Sinon on va aller l'interroger pour en savoir plus
              this.bluetoothle.connect({ "address": theAddress }).subscribe((resultC) => {
                // Si on a réussi à se connecter on va chercher les informations
                console.log('Nouveau: ' + theAddress);
                this.discoverDevice(theAddress, event);
              }, (error) => {
                console.log('error connect',error.message);
              });
            }

          }

        } 
      },
      err => {
        console.log('error startScan',err.message);
      }
    );

    setTimeout(async () => {
      const event = await this.bluetoothle.stopScan();
      this.status = '...';
      console.log('stop', event);
    }, 1000);
  }





  discoverDevice(theAddress, event) {

    let servParams = {
      "address": theAddress,
      "services": ['9997']
    }
    this.bluetoothle.discover(servParams).then((resultS) => {

      resultS.services.forEach((service) => {

        if (service.uuid === '9997') {

          this.devicesUUids[theAddress] = { uuid: service.characteristics[0].uuid };
          if (this.uuidsList[service.characteristics[0].uuid]) {
            const theUiid = service.characteristics[0].uuid;
            this.uuidsList[theUiid].last = new Date().toLocaleTimeString();
            this.uuidsList[theUiid].rssiMin = (event.rssi && event.rssi < this.uuidsList[theUiid].rssiMin ? event.rssi : this.uuidsList[theUiid].rssiMin);
            this.uuidsList[theUiid].rssiMax = (event.rssi && event.rssi > this.uuidsList[theUiid].rssiMax ? event.rssi : this.uuidsList[theUiid].rssiMax);
          } else {
            let date = new Date();
            const theUiid = service.characteristics[0].uuid;

            this.uuidsList[theUiid] = {
              uuid: theUiid,
              address: theAddress,
              first: date.toLocaleTimeString(),
              last: date.toLocaleTimeString(),
              rssiMin: event.rssi,
              rssiMax: event.rssi
            }

            // On envoie l'info au service
            this.scanService.meetUser(theUiid, event.rssi);
          }

        }

      });



    }, (error) => {
      console.log('error discover',error.message);
    });
  }

  
}
