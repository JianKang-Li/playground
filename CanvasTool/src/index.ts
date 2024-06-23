import type {
  Arc,
  Ellipse,
  Graph,
  Img,
  Rect,
  Shadow,
  Text,
  Triangle,
} from './canvas'
import Canvas from './canvas'

const canvas = new Canvas('canvas')

const text: Text = {
  text: 'ljk',
  x: 10,
  y: 100,
  direction: 'ltr',
}

const rect: Rect = {
  x: 100,
  y: 100,
  width: 100,
  height: 100,
  color: 'white',
  type: 'fill',
}

// canvas.drawText(text);

// canvas.drawRect({ x: 10, y: 10, width: 100, height: 100 });

const triangle: Triangle = {
  point1: { x: 10, y: 10 },
  point2: { x: 40, y: 40 },
  point3: { x: 40, y: 100 },
}
// canvas.drawTriangle(triangle);

const points = canvas.Arr2Point([
  [100, 100],
  [200, 200],
])

const graph: Graph = {
  points,
  // close: true,
  color: 'blue',
  type: 'fill',
}

// canvas.setLine({ lineWidth: 2, dash: [2, 4] });

// canvas.draw(graph);

// canvas.restoreLine();

// canvas.drawTriangle(triangle);

const arc: Arc = {
  x: 100,
  y: 100,
  radius: 50,
  start: 90,
  end: 270,
  anticlockwise: false,
  color: 'black',
  type: 'stroke',
}

const shadow: Shadow = {
  blur: 10,
  color: 'black',
  offsetX: 10,
  offsetY: 10,
}
// canvas.setShadow(shadow);
// canvas.drawRect(rect);

// canvas.drawArc(arc);
// canvas.ctx.arc(200, 200, 100, (Math.PI / 180) * 0, (Math.PI / 180) * 90, false);
// canvas.ctx.stroke();

// canvas.drawPoint({ x: 10, y: 10, size: 5 });

// canvas.set({ globalAlpha: 0.4 });

/* for (var i = 0; i < 6; i++) {
  for (var j = 0; j < 6; j++) {
    canvas.drawRect({
      x: j * 50,
      y: i * 50,
      width: 40,
      height: 40,
      color:
        "rgb(" +
        Math.floor(255 - 42.5 * i) +
        "," +
        Math.floor(255 - 42.5 * j) +
        ",0)",
      type: "stroke",
    });
  }
} */
const ellipse: Ellipse = {
  x: 100,
  y: 100,
  XRadius: 100,
  YRadius: 20,
  start: 0,
  end: 360,
  Rotation: 0,
  color: 'blue',
  type: 'fill',
}

// canvas.drawEllipse(ellipse);

// canvas.setLine({ dash: [2, 4] });

const ellipse1: Ellipse = {
  x: 200,
  y: 200,
  XRadius: 100,
  YRadius: 20,
  start: -90,
  end: 90,
  Rotation: 0,
  color: 'red',
  type: 'stroke',
}

// canvas.drawEllipse(ellipse1);

const ellipse2: Ellipse = {
  x: 200,
  y: 200,
  XRadius: 100,
  YRadius: 20,
  start: 30,
  end: 90,
  Rotation: 0,
  type: 'stroke',
}

// canvas.drawEllipse(ellipse2);

const btn = document.querySelector('#btn')

function down() {
  canvas.SaveAs({ type: 'image/png' })
}
btn?.addEventListener('click', () => {
  down()
})

const img: Img = {
  src: './assets/bw.jpeg',
  x: 400,
  y: 0,
  width: 150,
  height: 300,
}

/* canvas.drawImg(img).then((res) => {
  let data = res;
  // console.log(data);
}); */

const grad = canvas.getGradient({
  type: 'radial',
  x1: 45,
  y1: 45,
  r1: 10,
  x2: 52,
  y2: 50,
  r2: 30,
  colors: [
    { position: 0, color: '#F4F201' },
    { position: 0.8, color: '#E4C700' },
    { position: 1, color: 'rgba(228,199,0,0)' },
  ],
})

canvas.drawPoint({ x: 300, y: 300, size: 2, color: 'blue' })

canvas.drawEllipse(ellipse2)

canvas.setLine({ lineWidth: 2, dash: [2, 3] })

canvas.drawArc(arc)

canvas.setTran('scale', 1, 1)

canvas.drawArc({
  x: 150,
  y: 100,
  radius: 50,
  start: 90,
  end: 270,
  anticlockwise: false,
  color: 'black',
  type: 'fill',
})

canvas.drawImg(img)

canvas.restore()

canvas.drawText({
  text: 'ljk',
  x: 300,
  y: 100,
})

canvas.drawRect({
  x: 0,
  y: 0,
  type: 'fill',
  width: 200,
  height: 200,
  color: grad,
})
