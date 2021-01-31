# Firework Canvas

## Parameter Beschreibung
* Hue: Hue sind die verfügbaren Farben der Partikel
* Saturation: Die Sättigung der Partikelfarben
* Brightness: >50% mehr richtung Weiß; <50% mehr richtung Schwarz
* Gravity: Stärke der Gravitation
* Friction: Die Reibung (Verlangsamung) der Partikel
* Fadeeffect: Intensität der Spur, welche die Partikel hinter sich herziehen
* Particleradius: Größe der Partikel
* Particlespeed: Geschwindigkeit der Partikel
* Particlealphareduction: Geschwindigkeit mit der die Partikel ausbrennen


## Installationsanleitung

Vorrausetzungen:

* Dieses Git-Repository muss ich auf einem Github Server befinden und öffentlich gestellt sein

Die installation erfolgt in 3 Schritten:

1. [Mongo Server einrichten](#Mongo-Server-einrichten) 
2. [Heruko Server einrichten](#Heruko-Server-einrichten)
3. [Änderungen am Code](#änderungen-am-code)

---

### Mongo Server einrichten

1. Account bei https://www.mongodb.com/ erstellen(falls noch nicht getan) und Cluster stellen (falls noch nicht getan)
2. Unter Security -> NetworkAccess -> Add IP address -> Allow access from anywhere
3. Unter Security -> Database Access einen neuen Nutzer anlegen und Passwort notieren
4. Falls noch nicht automatisch geschehen unter Data storage -> Clusters ein Cluter erstellen
5. Bei dem Cluster auf den Connect-Button klicken -> connect your Application und den Connection String notieren
6. Bei dem Connection String `<password>` durch das Passwort des eben erstellten Users ersetzen und `<dbname>` durch “Firework” ersetzen


### Heruko Server einrichten 

1. Account bei https://www.heroku.com/ erstellen und wenn gefragt Primary language auf Noje.js einstellen
2. Neue App erstellen und namen vergeben
3. Anschließend in der app bei Deployment method Github verbinden(falls noch nicht getan) und das korrekte repository auswählen und Deployen
4. (optional) Automatic deploys auf gleicher Seite aktivieren, damit nicht bei jeder Anderung manuell deployed werden muss



### Änderungen am Code

1. In der Datei src/Client/main.ts `REPLACE_HEROKUURL` durch den namen der Heroku-App ersetzen. 
2. Connection String konfigurieren
   1. ENTWEDER in der Datei src/Server/server.ts `<string>process.env.CONNECTION_STRING` durch den Connection String ersetzen (ACHTUNG: Der username und passwort sind dann in dem GitRepository sichtbar)
   2. ODER Umgebungsvariable `CONNECTION_STRING`  auf den Connection String setzen. Dazu bei der Heroku-App -> Settings -> Config Vars die Umgebungsvariable  `CONNECTION_STRING` mit dem Wert des Connection Strings erstellen.

