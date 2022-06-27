import { onMount, onCleanup, createEffect } from "solid-js";
import hand from "./images/do_you_know_what_is_this/hand.png";
import Canvas from "./Canvas";
import { IChooseImage, IImgOption, ITextOption } from "./App";

const CANVAS_SIZE = {
  w: 1920,
  h: 1080,
};

const handImg = new Image(CANVAS_SIZE.w, CANVAS_SIZE.h);
handImg.src = hand;

function drawText(
  w: number,
  h: number,
  ctx: CanvasRenderingContext2D,
  textOption: ITextOption
) {
  const { x, y, text } = textOption;
  ctx.strokeText(text, x + w / 2, y + h / 2 + (h / 5) * 2);
  ctx.fillText(text, x + w / 2, y + h / 2 + (h / 5) * 2);
}

function draw(
  ctx: CanvasRenderingContext2D,
  bgImg: IChooseImage,
  imgOption: IImgOption
) {
  if (!bgImg) return;
  if (bgImg.name === "did_you_know_what_is_this") {
    const img1 = new Image();
    img1.src = bgImg.src;
    ctx.drawImage(img1, 0, 0);
    if (imgOption) {
      const { x, y, size, img } = imgOption;
      if (img) {
        ctx.drawImage(
          img,
          x + CANVAS_SIZE.w / 2 - (img.width * size) / 2,
          y + CANVAS_SIZE.h / 2 - (img.height * size) / 2,
          img.width * size,
          img.height * size
        );
      }
    }
    ctx.drawImage(handImg, 0, 0);
    return;
  }

  const img1 = new Image();
  img1.src = bgImg.src;
  ctx.drawImage(img1, 0, 0);
}

interface IDrawProps {
  canvasSize: { w: number; h: number };
  bgImg: IChooseImage;
  textOption: ITextOption;
  imgOption: IImgOption;
}

export default function Draw(props: IDrawProps) {
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  const { w, h } = props.canvasSize;

  onMount(() => {
    const context = canvas.getContext("2d");
    if (!context) return;
    ctx = context;
    ctx.font = "normal 72px 'Noto Sans TC'";
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.lineWidth = 6;
    ctx.textAlign = "center";
    ctx.fillText("1. 選擇底圖", w / 2, (h / 5) * 1);
    ctx.fillText("2. 輸入文字", w / 2, (h / 5) * 2);
    ctx.fillText("3. 上傳圖片", w / 2, (h / 5) * 3);
    ctx.fillText("4. 右鍵另存圖片", w / 2, (h / 5) * 4);
    ctx.fillStyle = "white";
  });

  createEffect(() => {
    if (!ctx) return;
    draw(ctx, props.bgImg, props.imgOption);
    drawText(w, h, ctx, props.textOption);
  });

  return <Canvas w={w} h={h} ref={canvas} />;
}
