import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import * as ReactDOM from "react-dom";
import * as _ from "lodash";
const dpi = 2;
const yarnSize = 12;
const margin = 50;
const fray = 15;
const pack = 1.5;

function packColor(a) {
  return `rgb(${a[0]},${a[1]},${a[2]})`;
}
function convertEventCoordinates(canvas, event) {
  let boundingRect = canvas.getBoundingClientRect();

  boundingRect = {
    left: boundingRect.left + margin,
    top: boundingRect.top + margin,
    width: boundingRect.width - margin * 2,
    height: boundingRect.height - margin * 2,
  };
  const scaleX = canvas.width / boundingRect.width;
  const scaleY = canvas.height / boundingRect.height;

  const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
  const canvasTop = (event.clientY - boundingRect.top) * scaleY;

  const x = Math.floor(canvasLeft / 4);
  const y = Math.floor(canvasTop / 4);
  return [x, y];
}

function draw(ctx, width, height, wefts, warps) {
  ctx.clearRect(0, 0, (width + margin * 2) * dpi, (height + margin * 2) * dpi);

  ctx.fillStyle = "red";
  ctx.shadowColor = "black";
  ctx.shadowBlur = 4;

  for (let x = 0; x < wefts.length; x++) {
    for (let y = 0; y < warps.length; y++) {
      let dx = 0;
      let dy = yarnSize * dpi;
      //   console.log(wefts[x]);
      let data = wefts[x];

      if ((x + y) % 2 === 0) {
        dx = yarnSize * dpi;
        dy = 0;

        data = warps[y];
      }
      console.log(data);
      ctx.strokeStyle = packColor(data);

      ctx.beginPath();
      ctx.lineWidth = yarnSize * pack;

      let space = 1.0 - pack / 3.5;
      //   ctx.strokeStyle = `rgb(${Math.random() * 250},${Math.random() * 250},${
      //     Math.random() * 250
      //   })`;

      const px = (margin + x * yarnSize) * dpi;
      const py = (margin + y * yarnSize) * dpi;
      ctx.moveTo(px + dx * space, py + dy * space);
      ctx.lineTo(px - dx * space, py - dy * space);
      ctx.stroke();
    }
  }
}
function Canvas() {
  const canvasRef = React.useRef();
  const width = 600;
  const height = 1400;
  const [wefts, setWefts] = useState(
    useMemo(
      () =>
        _.fill(Array(Math.floor(width / yarnSize)), [
          255 * Math.random(),
          100,
          120,
        ]),
      [width]
    )
  );
  const [warps, setWarps] = useState(
    useMemo(
      () =>
        _.fill(Array(Math.floor((height - margin) / yarnSize)), [55, 190, 120]),
      [height]
    )
  );
  useEffect(() => {
    console.log("DRAW");

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    draw(ctx, width, height, wefts, warps);
  }, [canvasRef, wefts, warps]);

  return (
    <canvas
      ref={canvasRef}
      width={(width + margin * 2) * dpi}
      height={(height + margin * 2) * dpi}
      style={{
        width: "100%",
        // height: height,
      }}
      onClick={(e) => {
        e.client;
        let [x, y] = convertEventCoordinates(e.target, e);
        console.log(x, y);
        if (y > wefts.length - 1) return;
        wefts[y] = [
          Math.random() * 250,
          Math.random() * 250,
          Math.random() * 250,
        ];
        setWefts(wefts.slice(0));

        if (x > warps.length - 1) return;

        warps[y] = [
          Math.random() * 250,
          Math.random() * 250,
          Math.random() * 250,
        ];
        setWarps(warps.slice(0));
      }}
    ></canvas>
  );
}

export default Canvas;
