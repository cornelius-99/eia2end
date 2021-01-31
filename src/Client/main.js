"use strict";
var Firework;
(function (Firework) {
    const canvas = document.getElementById("canvas");
    Firework.ctx = canvas.getContext("2d");
    const defaultFireworkConfig = {
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
    let fireworkSettings = {
        name: "",
        description: "",
        config: defaultFireworkConfig
    };
    let availableFireworks = [];
    let activeFireworks = [];
    canvas.addEventListener("click", ev => {
        launchRocket({ x: ev.offsetX, y: ev.offsetY }, fireworkSettings.config);
    });
    function launchRocket(pos, config) {
        activeFireworks.push(new Firework.FireworkRocket(pos, config));
    }
    function updateFrame() {
        requestAnimationFrame(updateFrame);
        Firework.ctx.fillStyle = `rgba(0, 0, 0, ${fireworkSettings.config.fadeEffect})`;
        Firework.ctx.fillRect(0, 0, canvas.width, canvas.height);
        activeFireworks.forEach((firework, i) => {
            if (!firework.isBurnedOut()) {
                firework.update();
            }
            else {
                activeFireworks.splice(i, 1);
            }
        });
    }
    updateFrame();
    //UI controls
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
    //name change
    fireworkName.addEventListener("input", () => fireworkSettings.name = fireworkName.value);
    //description change
    fireworkDescription.addEventListener("input", () => fireworkSettings.name = fireworkDescription.value);
    //add hue to list
    addHue.addEventListener("click", () => {
        fireworkSettings.config.hues.push(parseInt(hueInput.value));
        displayHues();
    });
    hueInput.addEventListener("input", () => {
        huePreview.style.backgroundColor = `hsl(${hueInput.value}, 100%, 50%)`;
    });
    // @ts-ignore
    function deleteHue(toDeleleIndex) {
        fireworkSettings.config.hues = fireworkSettings.config.hues.filter((_value, index) => index != toDeleleIndex);
        displayHues();
    }
    //display hue's help function
    function displayHues() {
        hueList.innerHTML = "";
        fireworkSettings.config.hues.forEach((hue, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = hue.toString();
            listItem.style.color = `hsl(${hue}, 100%, 50%)`;
            const deleteButton = document.createElement("input");
            deleteButton.type = "button";
            deleteButton.value = "DELETE";
            deleteButton.addEventListener("click", () => {
                deleteHue(index);
            });
            listItem.append(deleteButton);
            hueList.appendChild(listItem);
        });
    }
    saturationInput.addEventListener("input", () => {
        fireworkSettings.config.saturation = parseInt(saturationInput.value);
    });
    brightnessInput.addEventListener("input", () => {
        fireworkSettings.config.brightness = parseInt(brightnessInput.value);
    });
    gravityInput.addEventListener("input", () => {
        fireworkSettings.config.gravity = parseFloat(gravityInput.value);
    });
    frictionInput.addEventListener("input", () => {
        fireworkSettings.config.friction = parseFloat(frictionInput.value);
    });
    fadeEffectInput.addEventListener("input", () => {
        fireworkSettings.config.fadeEffect = parseFloat(fadeEffectInput.value);
    });
    particleRadiusInput.addEventListener("input", () => {
        fireworkSettings.config.particleRadius = parseInt(particleRadiusInput.value);
    });
    particleNumberInput.addEventListener("input", () => {
        fireworkSettings.config.particleNumber = parseInt(particleNumberInput.value);
    });
    particleSpeedInput.addEventListener("input", () => {
        fireworkSettings.config.particleSpeed = parseInt(particleSpeedInput.value);
    });
    particleAlphaReductionInput.addEventListener("input", () => {
        fireworkSettings.config.particleAlphaReduction = parseFloat(particleAlphaReductionInput.value);
    });
    function loadCurrentConfig() {
        displayHues();
        saturationInput.value = fireworkSettings.config.saturation.toString();
        brightnessInput.value = fireworkSettings.config.brightness.toString();
        gravityInput.value = fireworkSettings.config.gravity.toString();
        frictionInput.value = fireworkSettings.config.friction.toString();
        fadeEffectInput.value = fireworkSettings.config.fadeEffect.toString();
        particleRadiusInput.value = fireworkSettings.config.particleRadius.toString();
        particleNumberInput.value = fireworkSettings.config.particleNumber.toString();
        particleSpeedInput.value = fireworkSettings.config.particleSpeed.toString();
        particleAlphaReductionInput.value = fireworkSettings.config.particleAlphaReduction.toString();
    }
    loadCurrentConfig();
    submitFireworkButton.addEventListener("click", () => {
        let query = new URLSearchParams();
        query.append("fireworkconfig", JSON.stringify(fireworkSettings));
        query.append("type", "put");
        fetch("https://firework-eia2.herokuapp.com/?" + query.toString());
    });
    searchFireworkButton.addEventListener("click", async () => {
        let query = new URLSearchParams();
        query.append("type", "get");
        const response = await fetch("https://firework-eia2.herokuapp.com/?" + query.toString());
        const data = await response.json();
        availableFireworksDropdown.innerHTML = "";
        data.forEach(firework => {
            const newOption = document.createElement("option");
            newOption.value = firework._id;
            newOption.text = firework.name;
            availableFireworksDropdown.add(newOption);
        });
        availableFireworks = data;
    });
    loadFireworkButton.addEventListener("click", () => {
        const selectedId = availableFireworksDropdown.value;
        const selectedFirework = availableFireworks.find(firework => {
            return firework._id == selectedId;
        });
        fireworkSettings = selectedFirework;
        loadCurrentConfig();
    });
})(Firework || (Firework = {}));
//# sourceMappingURL=main.js.map