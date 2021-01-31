"use strict";
var Firework;
(function (Firework) {
    const canvas = document.getElementById("canvas");
    //Canvas 2D Kontext wird benötigt zum Zeichen von Elementen in dem Canvas
    Firework.ctx = canvas.getContext("2d");
    //Standardkonfiguration für das Feuerwerk
    let fireworkSettings = {
        name: "",
        description: "",
        hues: [0, 120, 240],
        saturation: 50,
        brightness: 50,
        gravity: 0.03,
        friction: 0.99,
        fadeEffect: 0.1,
        particleRadius: 3,
        particleNumber: 400,
        particleSpeed: 10,
        particleAlphaReduction: 0.005
    };
    //Hier werden die von dem Server geladene Konfigurationen gespeichert
    let availableFireworks = [];
    //Hier werden alle aktiven Feuerwerke gespeichert um gezeichnet zu werden
    //Brennt ein Feuerwerk aus wird es aus der liste entfernt
    let activeFireworks = [];
    //Wenn auf Canvas geklickt wird launchRocket aufrufen mit der Mausposition und den Aktuellen Konfiguration
    canvas.addEventListener("click", ev => {
        launchRocket({ x: ev.offsetX, y: ev.offsetY }, fireworkSettings);
    });
    //Erstellt eine neue Rakete an übergebener Position und fügt sie zu activeFireworks hinzu
    function launchRocket(pos, config) {
        activeFireworks.push(new Firework.FireworkRocket(pos, config));
    }
    //Hier wird der neue Frame "berechnet" und angezeigt
    function updateFrame() {
        //requestAnimationFrame ruft diese funktion auf, wenn der Browser einen neuen Frame berechnen möchte
        window.requestAnimationFrame(updateFrame);
        //Hier wird der Canvas überschrieben mit schwarzer Farbe und dem Alphawert welcher in fadeEffect konfiguriert ist
        //Ist zuständig für die Spur, welche die Partikel hinter sich her ziehen
        Firework.ctx.fillStyle = `rgba(0, 0, 0, ${fireworkSettings.fadeEffect})`;
        Firework.ctx.fillRect(0, 0, canvas.width, canvas.height);
        //Für jedes aktive Feuerwerk wird die Methode update aufgerufen um das feuerwerk zu zeichnen
        activeFireworks.forEach((firework, i) => {
            //Überprüfen mithilfe von isBurnedOut ob das Feuerwerk noch nicht erloschen ist, falls nein, Zeichne Feuerwerk
            if (!firework.isBurnedOut()) {
                firework.update();
            }
            else {
                //falls erloschen, entferne Feuerwerk aus der liste
                activeFireworks.splice(i, 1);
            }
        });
    }
    //updateFrame muss einmal aufgerufen werden, damit sich die funktion immer wieder selbst aufrufen kann
    updateFrame();
    //Hier werden alle UI elemente initialisiert
    const fireworkName = document.getElementById("name");
    const fireworkDescription = document.getElementById("description");
    const hueList = document.getElementById("huelist");
    const huePreview = document.getElementById("huepreview");
    const hueInput = document.getElementById("hue");
    const addHue = document.getElementById("addhue");
    const saturationInput = document.getElementById("saturation");
    const brightnessInput = document.getElementById("brightness");
    const gravityInput = document.getElementById("gravity");
    const frictionInput = document.getElementById("friction");
    const fadeEffectInput = document.getElementById("fadeeffect");
    const particleRadiusInput = document.getElementById("particleradius");
    const particleNumberInput = document.getElementById("particlenumber");
    const particleSpeedInput = document.getElementById("particlespeed");
    const particleAlphaReductionInput = document.getElementById("particlealphareduction");
    const submitFireworkButton = document.getElementById("submit");
    const searchFireworkButton = document.getElementById("searchFireworks");
    const loadFireworkButton = document.getElementById("loadFirework");
    const availableFireworksDropdown = document.getElementById("availableFireworks");
    //UI events
    //Wenn Name geändert wird, ändere Name der aktuellen Konfiguration
    fireworkName.addEventListener("input", () => fireworkSettings.name = fireworkName.value);
    //Wenn Beschreibung geändert wird, ändere Beschreibung der aktuellen Konfiguration
    fireworkDescription.addEventListener("input", () => fireworkSettings.description = fireworkDescription.value);
    //Add buton bei Hue fügt den Hue Wert der Listen hinzu
    addHue.addEventListener("click", () => {
        fireworkSettings.hues.push(parseInt(hueInput.value));
        displayHues();
    });
    //Wird der Hue slider verschoben bekommt man eine vorschau der aktuellen Farbe
    hueInput.addEventListener("input", () => {
        huePreview.style.backgroundColor = `hsl(${hueInput.value}, 100%, 50%)`;
    });
    //Diese Funktion löscht einen Hue Wert zu einem Index und stellt die Hue-Liste neu dar
    function deleteHue(toDeleleIndex) {
        fireworkSettings.hues = fireworkSettings.hues.filter((_value, index) => index != toDeleleIndex);
        displayHues();
    }
    //Stellt die Huewerte in der Liste dar
    function displayHues() {
        //Zuerst alles aus der liste Löschen
        hueList.innerHTML = "";
        //Jedes element aus dem hue-Array der aktuellen konfiguration darstellen
        fireworkSettings.hues.forEach((hue, index) => {
            //li element erstellen, welches auf der Seite angezeigt werden kann
            const listItem = document.createElement("li");
            //hue Wert als Text einfügen
            listItem.innerHTML = hue.toString();
            //angezeigten Hue Wert einfärben
            listItem.style.color = `hsl(${hue}, 100%, 50%)`;
            //Input element erstellen (DELETE Knopf)
            const deleteButton = document.createElement("input");
            deleteButton.type = "button";
            deleteButton.value = "DELETE";
            //Bei klicken des buttons funktion deleteHue aufrufen mit dem eigenen Index
            deleteButton.addEventListener("click", () => {
                deleteHue(index);
            });
            //button an ListItem anhängen
            listItem.append(deleteButton);
            //Listitem der Huelist hinzufügen
            hueList.appendChild(listItem);
        });
    }
    //Folgende funktionen ändern den Wert in der aktuellen konfiguration sobald dieser über die UI geändert wurde
    saturationInput.addEventListener("input", () => {
        //da saturationInput.value ein string ist muss dieser mit parseInt zu einer Ganzzahl umgewandelt werden
        fireworkSettings.saturation = parseInt(saturationInput.value);
    });
    brightnessInput.addEventListener("input", () => {
        fireworkSettings.brightness = parseInt(brightnessInput.value);
    });
    gravityInput.addEventListener("input", () => {
        //umwandlung von gravityInput zu Kommazahl
        fireworkSettings.gravity = parseFloat(gravityInput.value);
    });
    frictionInput.addEventListener("input", () => {
        fireworkSettings.friction = parseFloat(frictionInput.value);
    });
    fadeEffectInput.addEventListener("input", () => {
        fireworkSettings.fadeEffect = parseFloat(fadeEffectInput.value);
    });
    particleRadiusInput.addEventListener("input", () => {
        fireworkSettings.particleRadius = parseInt(particleRadiusInput.value);
    });
    particleNumberInput.addEventListener("input", () => {
        fireworkSettings.particleNumber = parseInt(particleNumberInput.value);
    });
    particleSpeedInput.addEventListener("input", () => {
        fireworkSettings.particleSpeed = parseInt(particleSpeedInput.value);
    });
    particleAlphaReductionInput.addEventListener("input", () => {
        fireworkSettings.particleAlphaReduction = parseFloat(particleAlphaReductionInput.value);
    });
    //Diese funktion überträgt die Werte der aktuellen Konfiguration auf die UI
    function loadCurrentConfig() {
        displayHues();
        fireworkName.value = fireworkSettings.name;
        fireworkDescription.value = fireworkSettings.description;
        saturationInput.value = fireworkSettings.saturation.toString();
        brightnessInput.value = fireworkSettings.brightness.toString();
        gravityInput.value = fireworkSettings.gravity.toString();
        frictionInput.value = fireworkSettings.friction.toString();
        fadeEffectInput.value = fireworkSettings.fadeEffect.toString();
        particleRadiusInput.value = fireworkSettings.particleRadius.toString();
        particleNumberInput.value = fireworkSettings.particleNumber.toString();
        particleSpeedInput.value = fireworkSettings.particleSpeed.toString();
        particleAlphaReductionInput.value = fireworkSettings.particleAlphaReduction.toString();
    }
    //Zu beginn einmal ausführen, sodass die Standartkonfiguraiton im UI angezeigt wird
    loadCurrentConfig();
    //Submit Button sendet Konfiguration an server
    submitFireworkButton.addEventListener("click", () => {
        let query = new URLSearchParams();
        //id auf undefined setzen, falls zuvor eine Konfiguration des Servers geladen wurde, damit mongodb wieder eine neue zufällige id generiert
        fireworkSettings._id = undefined;
        //aktuelle Konfiguration in einen String umwandeln und der queryparameter anhängen
        query.append("fireworkconfig", JSON.stringify(fireworkSettings));
        //Parameter type auf put setzen, da Servercode dann die Konfiguration in mongodb abspeichert (Siehe server.ts)
        query.append("type", "put");
        //HTTP Anfrage ausführen an Server
        fetch("https://REPLACE_HEROKUURL.herokuapp.com/?" + query.toString());
    });
    //Searchbutton lädt alle gespeicherten Konfigurationen vom Server
    searchFireworkButton.addEventListener("click", async () => {
        let query = new URLSearchParams();
        // type auf get setzen, damit Server alle Feuerwerke zurück gibt (siehe server.ts)
        query.append("type", "get");
        //absenden der abfrage
        const response = await fetch("https://REPLACE_HEROKUURL.herokuapp.com/?" + query.toString());
        //umwandeln der zurückbekommenen daten in ein json-Objekt
        const data = await response.json();
        //Dropdown der verfügbaren Feuerwerke leeren
        availableFireworksDropdown.innerHTML = "";
        //für jede Fonfiguration neues Dropdown element erstellen
        data.forEach(firework => {
            //neues Option Element erstellen (Element, welches sich im Dropdownmenu befindet)
            const newOption = document.createElement("option");
            //Wert auf die ID (welche von mongodb generiert wurde) setzen
            newOption.value = firework._id;
            //Name des Feuerwerks als Text anzeigen
            newOption.text = firework.name;
            //Option Element der Dropdownliste hinzufügen
            availableFireworksDropdown.add(newOption);
        });
        //availableFireworks auf die geladenen Feuerwerke setzen
        availableFireworks = data;
    });
    //Im Dropdown ausgewählte Konfiguration übernehmen
    loadFireworkButton.addEventListener("click", () => {
        //ausgewählte id bestimmen
        const selectedId = availableFireworksDropdown.value;
        //geladene Konfigurationen anhand der ID suchen
        const selectedFirework = availableFireworks.find(firework => {
            return firework._id == selectedId;
        });
        //gefundene Konfiguration auf die aktuelle konfiguration übertragen
        fireworkSettings = selectedFirework;
        //aktuelle konfiguration darstellen
        loadCurrentConfig();
    });
    //Hilfsfunktion zum generieren einer zufälligen Ganzzahl
    function randomNumberFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    Firework.randomNumberFromRange = randomNumberFromRange;
})(Firework || (Firework = {}));
//# sourceMappingURL=main.js.map