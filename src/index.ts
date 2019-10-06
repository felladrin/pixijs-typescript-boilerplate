import { Application, Texture, Sprite } from "pixi.js";
import "./index.css";

// @ts-ignore
import logoTexture from "./pixijs.png";

const app = new Application({
  view: document.getElementById("game") as HTMLCanvasElement,
  width: 800,
  height: 600,
  backgroundColor: 0x1099bb
});

const logo = new Sprite(Texture.from(logoTexture));
logo.x = 400;
logo.y = 300;
logo.anchor.set(0.5);
logo.interactive = true;
logo.buttonMode = true;

app.stage.addChild(logo);

let logoIsBeingDragged = false;
let pointerDownData = null;

const handlePointerDown = (event): void => {
  pointerDownData = event.data;
  logo.tint = 0x44ff44;
  logoIsBeingDragged = true;
};

const handlePointerUp = (): void => {
  logoIsBeingDragged = false;
  logo.tint = 0xffffff;
  pointerDownData = null;
};

const handlePointerMove = (): void => {
  if (logoIsBeingDragged) {
    const newPosition = pointerDownData.getLocalPosition(logo.parent);
    logo.x = newPosition.x;
    logo.y = newPosition.y;
  }
};

logo
  .on("pointerdown", handlePointerDown)
  .on("pointerup", handlePointerUp)
  .on("pointerupoutside", handlePointerUp)
  .on("pointermove", handlePointerMove);
