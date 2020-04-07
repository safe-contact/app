# SAFE CONTACT
Safe Contact is an open source ios / android application based on ionic / cordova.
The main purpose of this application is to detect and notify when someone meet a people infected by a virus (COVID-19 for example).


<b> SAFE CONTACT, a mobile application to adapt the alertness of people who may have come across sick people. </b>

<b> The application was designed with two distinct but complementary objectives: </b>

- Be informed of potential contact with people suffering from a viral disease and encourage them to redouble their vigilance by strengthening prevention with those close to them and by advising them to stay in quarantine

- Offer statistical data to epidemiologists or other scientists to obtain information on the contagiousness of the virus.



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

## License
Copyright (c) Philippe Gellet, Rudy Zanotti, Julien Bourgain, Annabel Barra, Kossivi Amah, Yannis Epalle

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
