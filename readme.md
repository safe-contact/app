# SAFE CONTACT
Safe Contact is an open source ios / android application based on ionic / cordova.

The main purpose of this application is to detect and notify when someone meet a people infected by a virus (COVID-19 for example).

## Principle
On the first app launch, a random ID is generated to idenfity a device.

When the app is launched (even in background) the app notify on bluetooth others devices that the app is running on it.

If another device detect the application, we send all meetings to the backend. 

## Legal informations
#### RGPD complient
##### No localitation
##### No identity or device informations go out of the device.

We don't send any localisation data or identity data. So this application is **RGPD complient**. 

## Notifications

If someone send the information that he think he is sick or the doctor tell him that he is sick. We notify everyone he meet in the 10 past days
that they had meet a sick people and they need to take care to don't spread the sickness.

##Technical informations

This app is based on ionic 5 and angular 8.
To setup the application : 

```
yarn global add @ionic/cli corvoda
yarn install
ionic cordova prepare <android>/<ios>

ionic cordova run android -l
```

The app can run in the browser for dev purposes with some limitations, we don't have any bluetooth detection, device UUID, device notifications, etc... 
But it can help in some case.
```
yarn start
```
