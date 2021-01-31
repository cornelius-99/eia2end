namespace Firework {
  const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
  export const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext("2d");

  export type FireworkConfig = {
    hues: number[]; //hue values not colors 0-360
    saturation: number; //0-100%
    brightness: number; //0-100%
    gravity: number;
    friction: number;
    fadeEffect: number;
    particleRadius: number;
    particleNumber: number;
    particleSpeed: number;
    particleAlphaReduction: number;
  };

  type FireworkSettings = {
    name: string;
    description: string;
    config: FireworkConfig;
    _id?: string;
  };

  const defaultFireworkConfig: FireworkConfig = {
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

  let fireworkSettings: FireworkSettings = {
    name: "",
    description: "",
    config: defaultFireworkConfig
  };

  let availableFireworks: FireworkSettings[] = [];

  let activeFireworks: FireworkRocket[] = [];

  canvas.addEventListener("click", ev => {
    launchRocket({x: ev.offsetX, y: ev.offsetY}, fireworkSettings.config);
  });


  function launchRocket(pos: Vector, config: FireworkConfig): void {
    activeFireworks.push(new FireworkRocket(pos, config));
  }

  function updateFrame(): void {
    requestAnimationFrame(updateFrame);
    ctx.fillStyle = `rgba(0, 0, 0, ${fireworkSettings.config.fadeEffect})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    activeFireworks.forEach((firework, i) => {
      if (!firework.isBurnedOut()) {
        firework.update();
      } else {
        activeFireworks.splice(i, 1);
      }
    });
  }

  updateFrame();


  //UI controls
  const fireworkName: HTMLInputElement = <HTMLInputElement>document.getElementById("name");
  const fireworkDescription: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById("description");
  const hueList: HTMLUListElement = <HTMLUListElement>document.getElementById("huelist");
  const huePreview: HTMLDivElement = <HTMLDivElement>document.getElementById("huepreview");
  const hueInput: HTMLInputElement = <HTMLInputElement>document.getElementById("hue");
  const addHue: HTMLInputElement = <HTMLInputElement>document.getElementById("addhue");
  const saturationInput: HTMLInputElement = <HTMLInputElement>document.getElementById("saturation");
  const brightnessInput: HTMLInputElement = <HTMLInputElement>document.getElementById("brightness");
  const gravityInput: HTMLInputElement = <HTMLInputElement>document.getElementById("gravity");
  const frictionInput: HTMLInputElement = <HTMLInputElement>document.getElementById("friction");
  const fadeEffectInput: HTMLInputElement = <HTMLInputElement>document.getElementById("fadeeffect");
  const particleRadiusInput: HTMLInputElement = <HTMLInputElement>document.getElementById("particleradius");
  const particleNumberInput: HTMLInputElement = <HTMLInputElement>document.getElementById("particlenumber");
  const particleSpeedInput: HTMLInputElement = <HTMLInputElement>document.getElementById("particlespeed");
  const particleAlphaReductionInput: HTMLInputElement = <HTMLInputElement>document.getElementById("particlealphareduction");
  const submitFireworkButton: HTMLInputElement = <HTMLInputElement>document.getElementById("submit");
  const searchFireworkButton: HTMLInputElement = <HTMLInputElement>document.getElementById("searchFireworks");
  const loadFireworkButton: HTMLInputElement = <HTMLInputElement>document.getElementById("loadFirework");
  const availableFireworksDropdown: HTMLSelectElement = <HTMLSelectElement>document.getElementById("availableFireworks");


  //UI events
  //name change
  fireworkName.addEventListener("input", () => fireworkSettings.name = fireworkName.value);

  //description change
  fireworkDescription.addEventListener("input", () => fireworkSettings.description = fireworkDescription.value);

  //add hue to list
  addHue.addEventListener("click", () => {
    fireworkSettings.config.hues.push(parseInt(hueInput.value));
    displayHues();
  });

  hueInput.addEventListener("input", () => {
    huePreview.style.backgroundColor = `hsl(${hueInput.value}, 100%, 50%)`;
  });

  // @ts-ignore
  function deleteHue(toDeleleIndex: number): void {
    fireworkSettings.config.hues = fireworkSettings.config.hues.filter((_value, index) => index != toDeleleIndex);
    displayHues();
  }

  //display hue's help function
  function displayHues(): void {
    hueList.innerHTML = "";
    fireworkSettings.config.hues.forEach((hue, index) => {
      const listItem: HTMLLIElement = <HTMLLIElement>document.createElement("li");
      listItem.innerHTML = hue.toString();
      listItem.style.color = `hsl(${hue}, 100%, 50%)`;
      const deleteButton: HTMLInputElement = <HTMLInputElement>document.createElement("input");
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


  function loadCurrentConfig(): void {
    displayHues();
    fireworkName.value = fireworkSettings.name;
    fireworkDescription.value = fireworkSettings.description;
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
    let query: URLSearchParams = new URLSearchParams();
    fireworkSettings._id = undefined;
    query.append("fireworkconfig", JSON.stringify(fireworkSettings));
    query.append("type", "put");
    fetch("https://firework-eia2.herokuapp.com/?" + query.toString());
  });

  searchFireworkButton.addEventListener("click", async () => {
    let query: URLSearchParams = new URLSearchParams();
    query.append("type", "get");
    const response: Response = await fetch("https://firework-eia2.herokuapp.com/?" + query.toString());
    const data: FireworkSettings[] = await response.json();
    availableFireworksDropdown.innerHTML = "";
    data.forEach(firework => {
      const newOption: HTMLOptionElement = <HTMLOptionElement>document.createElement("option");
      newOption.value = <string>firework._id;
      newOption.text = firework.name;
      availableFireworksDropdown.add(newOption);
    });
    availableFireworks = data;
  });

  loadFireworkButton.addEventListener("click", () => {
    const selectedId: string = availableFireworksDropdown.value;
    const selectedFirework: FireworkSettings = <FireworkSettings>availableFireworks.find(firework => {
      return firework._id == selectedId;
    });
    fireworkSettings = selectedFirework;
    loadCurrentConfig();
  });

}