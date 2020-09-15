# AWM_Restaurant
## Applicazioni Web e Mobile - Restaurant

**AWM_Restaurant** è una applicazione per la gestione di un ristorante, sviluppata come progetto d'esame del corso di Applicazioni Web e Mobile (A.A. 2019/2020).

E' composta da tre parti:
* **Server-side**: sviluppata in linguaggio Python utilizzando il framework [Django](https://www.djangoproject.com/) (Versione 2.2);
* **Client-side**, applicazione front-end Web: sviluppata utilizzando [React](https://it.reactjs.org/), JavaScript e richieste AJAX;
* **Mobile-side**, applicazione per dispositivi mobili: sviluppata utilizzando [ReactNative](https://reactnative.dev/) ed [Expo](https://expo.io/).

## Usage
### Server-side | Client-side
Avviare il server django (o appoggiarsi su un server-web esterno, es. [Apache](https://httpd.apache.org/)):

**Django**:
```bash
$ cd <AWM_directory>
$ python3 manage.py runserver <ip_address>:<port>
```
Da questo momento, il server risponderà all'indirizzo IP e porta appena definiti.

**Apache**:
```bash
$ cd <server_apache>/bin
$ ./apachectl start
```
Indirizzo IP, porta e file statici sono gestiti dal file di configurazione di Apache (*httpd.conf*)

### Mobile-side
Avviare Expo e poi eseguire l'applicazione sul proprio smartphone o mediante emulatore (es. [AndroidStudio](https://developer.android.com/studio))

```bash
$ cd <AWM_directory>/AWM_Restaurant/mobile/MobileRestaurant
$ sudo npm start
```
Ora Expo è in esecuzione all'indirizzo e porta (di default) *localhost:19002*.

## Tests
Sono disponibili alcuni test che riguardano aspetti fondamentali dell'applicazione, eseguibili attraverso il sistema integrato di testing di Django.

```bash
$ cd <AWM_directory>/
$ python3 manage.py test
```
## Requirements

Segue una lista dei pacchetti necessari alla corretta esecuzione dell'applicazione:

* Django (2.2)
* [djangorestframework (3.11.0)](https://www.django-rest-framework.org/)
* django-cors-headers (3.4.0)
* django-extensions (3.0.2)
* django-filter (2.3.0)
* Markdown (3.2.2)

Tutti i pacchetti richiesti possono essere installati utilizzando [pip3](https://pip.pypa.io/en/stable/).

Eventualmente, potrebbe interessare la creazione di un virtualenv mediante [venv](https://docs.python.org/3/library/venv.html).

## Contributors
* Alessio Ruggi - ??? - ??mail?? 
* Marco Cagrandi - 138763 - 203232@studenti.unimore.it
