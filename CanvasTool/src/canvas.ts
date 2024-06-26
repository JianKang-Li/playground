/* 线条样式 */
export interface Line {
  lineWidth?: number
  lineCap?: 'butt' | 'round' | 'square'
  lineJoin?: 'miter' | 'bevel' | 'round'
  miterLimit?: number
  dash?: number[]
  offset?: number
}

/* 阴影样式,阴影颜色为透明则不显示 */
export interface Shadow {
  blur: number
  color: string
  offsetX?: number
  offsetY?: number
}

/* 绘制样式 */
export interface Setting {
  globalAlpha?: number
  imageSmoothing?: boolean
}

/* 文本接口 */
export interface Text {
  text: string
  font?: string
  type?: 'fill' | 'stroke'
  x: number
  y: number
  maxWidth?: number
  color?: string | CanvasGradient
  textAlign?: CanvasTextAlign
  direction?: 'ltr' | 'rtl' | 'inherit'
  textBaseline?:
    | 'top'
    | 'hanging'
    | 'middle'
    | 'alphabetic'
    | 'ideographic'
    | 'bottom'
}

/* 矩形接口 */
export interface Rect {
  x: number
  y: number
  height: number
  width: number
  color?: string | CanvasGradient
  type?: 'fill' | 'stroke'
}

/* 点 */
export interface Point {
  x: number
  y: number
  size?: number
  color?: string
}

/* 三角形接口 */
export interface Triangle {
  point1: Point
  point2: Point
  point3: Point
  type?: 'stroke' | 'fill'
  color?: string | CanvasGradient
}

/* 图形 */
export interface Graph {
  points: Point[]
  close?: boolean
  type?: 'fill' | 'stroke'
  color?: string | CanvasGradient
}

/* 弧线 */
export interface Arc {
  x: number
  y: number
  start: number
  end: number
  radius: number
  anticlockwise?: boolean
  type?: 'stroke' | 'fill'
  color?: string | CanvasGradient
}

/* 椭圆 */
export interface Ellipse {
  x: number
  y: number
  XRadius: number
  YRadius: number
  Rotation: number
  start: number
  end: number
  anticlockwise?: boolean
  type?: 'fill' | 'stroke'
  color?: string | CanvasGradient
}

/* 贝塞尔曲线 */
/* 二次贝塞尔曲线 */

/* 三次贝塞尔曲线 */

/* 渐变 */
export interface GradientColor {
  position: number
  color: string
}

export interface Gradient {
  type: 'line' | 'radial'
  colors: Array<GradientColor>
  x1: number
  y1: number
  x2: number
  y2: number
  r1?: number
  r2?: number
}

/* 转换和变形 */

/* 图像 */
export interface Img {
  src: string
  x?: number
  y?: number
  width?: number
  height?: number
}

/* 保存格式 */
export interface Format {
  type: 'image/png' | 'image/ipeg' | 'image/webp'
  name?: string
  encoderOptions?: number
}

export default class Canvas {
  selector: string
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  BitMap: any

  constructor(selector: string) {
    this.selector = selector
    if (document.querySelector(selector) === null) {
      throw new Error('Can\'t get the canvas')
    }
    else {
      this.canvas = document.querySelector(selector) as HTMLCanvasElement
      this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    }
  }

  /* 数组转点类型 */
  Arr2Point(arr: Array<[number, number]>): Point[] {
    const points: Point[] = []
    for (const item of arr) {
      const point: Point = { x: item[0], y: item[1] }
      points.push(point)
    }
    return points
  }

  /* 全局设置 */
  set(setting: Setting) {
    setting.globalAlpha && (this.ctx.globalAlpha = setting.globalAlpha)
    setting.imageSmoothing
    && (this.ctx.imageSmoothingEnabled = setting.imageSmoothing)
  }

  /* 设置线条样式 */
  setLine(style: Line): void {
    this.ctx.save()
    this.ctx.lineWidth = style.lineWidth || 1
    this.ctx.lineCap = style.lineCap || 'round'
    this.ctx.lineJoin = style.lineJoin || 'miter'
    style.miterLimit
      = style.miterLimit && style.miterLimit >= 1 ? style.miterLimit : 1
    this.ctx.miterLimit = style.miterLimit || 10
    style.dash && this.ctx.setLineDash(style.dash)
    style.dash && (this.ctx.lineDashOffset = style.offset || 0)
  }

  /* 设置阴影 */
  setShadow(shadow: Shadow) {
    this.ctx.save()
    this.ctx.shadowBlur = shadow.blur
    shadow.color && (this.ctx.shadowColor = shadow.color)
    shadow.offsetX && (this.ctx.shadowOffsetX = shadow.offsetX)
    shadow.offsetY && (this.ctx.shadowOffsetY = shadow.offsetY)
  }

  /* 保存状态 */
  save(): void {
    this.ctx.save()
  }

  /* 重置 */
  restore(): void {
    this.ctx.restore()
  }

  /* 渐变 */
  getGradient(gra: Gradient) {
    let grad = null
    if (gra.type === 'line') {
      grad = this.ctx.createLinearGradient(gra.x1, gra.y1, gra.x2, gra.y2)
    }
    else {
      if (gra.r1 && gra.r2) {
        grad = this.ctx.createRadialGradient(
          gra.x1,
          gra.y1,
          gra.r1,
          gra.x2,
          gra.y2,
          gra.r2,
        )
      }
      else {
        throw new Error('Missing parameter r1 or r2')
      }
    }
    for (let i = 0; i < gra.colors.length; i++) {
      const color = gra.colors[i]
      grad.addColorStop(color.position, color.color)
    }
    return grad
  }

  /* 设置转换默认旋转点为0,0使用transform进行设置
  scale方法可以缩放画布的水平和垂直的单位
  */
  setTran(tran: string, ...args: number[]) {
    const key = tran
    switch (key) {
      case 'rotate':
        this.ctx.rotate(this.deg2rad(args[0]))
        return
      case 'translate':
        this.ctx.translate(args[0], args[1])
        return
      case 'scale':
        this.ctx.scale(args[0], args[1])
        return
      case 'transform':
        this.ctx.transform(
          args[0],
          args[1],
          args[2],
          args[3],
          args[4],
          args[5],
        )
        return
      default:
        throw new Error(`Cant't identify ${key}`)
    }
  }

  /* 角度转弧度 */
  deg2rad(deg: number): number {
    return (Math.PI / 180) * deg
  }

  /* 画图 */
  protected createImg(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = function () {
        resolve(img)
      }
      img.onerror = function (e) {
        reject(e)
      }
      img.src = require(`${src}`)
    })
  }

  /* 返回值为图片的BitMap数据 */
  async drawImg(img: Img) {
    this.ctx.beginPath()
    const x = img.x || 0
    const y = img.y || 0
    const wid = img.width || 150
    const hei = img.height || 200
    const _img = await this.createImg(img.src)
    this.ctx.drawImage(_img, x, y, wid, hei)
    const data = this.ctx.getImageData(x, y, wid, hei).data
    const map = this.getBitMap(wid, hei, data)
    return map
  }

  getPixelAt(
    x: number,
    y: number,
    width: number,
    pixels: Uint8ClampedArray,
  ): [number, number, number, number] {
    const i = y * width * 4 + x * 4
    return [
      pixels[i],
      pixels[i + 1],
      pixels[i + 2],
      +(pixels[i + 3] / 255).toFixed(2),
    ]
  }

  protected getBitMap(wid: number, hei: number, data: Uint8ClampedArray) {
    const map = []
    for (let i = 0; i < hei; i++) {
      for (let j = 0; j < wid; j++)
        map.push(this.getPixelAt(j, i, wid, data))
    }
    return map
  }

  /* 画弧 */
  drawArc(arcObj: Arc) {
    this.ctx.beginPath()
    this.ctx.arc(
      arcObj.x,
      arcObj.y,
      arcObj.radius,
      this.deg2rad(arcObj.start),
      this.deg2rad(arcObj.end),
      arcObj.anticlockwise === undefined ? false : arcObj.anticlockwise,
    )
    if (arcObj.type === 'fill') {
      arcObj.color && (this.ctx.fillStyle = arcObj.color)
      this.ctx.fill()
    }
    else {
      arcObj.color && (this.ctx.strokeStyle = arcObj.color)
      this.ctx.stroke()
    }
  }

  /* 画椭圆 */
  drawEllipse(ellipse: Ellipse) {
    this.ctx.beginPath()
    this.ctx.ellipse(
      ellipse.x,
      ellipse.y,
      ellipse.XRadius,
      ellipse.YRadius,
      this.deg2rad(ellipse.Rotation),
      this.deg2rad(ellipse.start),
      this.deg2rad(ellipse.end),
      ellipse.anticlockwise ? ellipse.anticlockwise : false,
    )
    if (ellipse.type === 'fill') {
      ellipse.color && (this.ctx.fillStyle = ellipse.color)
      this.ctx.fill()
    }
    else {
      ellipse.color && (this.ctx.strokeStyle = ellipse.color)
      this.ctx.stroke()
    }
  }

  /* 点默认1px */
  drawPoint(point: Point): void {
    this.ctx.beginPath()
    point.color && (this.ctx.fillStyle = point.color)
    this.ctx.arc(
      point.x,
      point.y,
      point.size ? point.size : 1,
      0,
      (Math.PI / 180) * 360,
      false,
    )
    this.ctx.fill()
  }

  /* 文字 */
  drawText(text: Text): void {
    this.ctx.font = text.font || '40px 宋体'
    this.ctx.textAlign = text.textAlign || 'left'
    this.ctx.textBaseline = text.textBaseline || 'alphabetic'
    if (text.type === 'fill') {
      this.ctx.fillStyle = text.color || '#000'
      this.ctx.fillText(text.text, text.x, text.y, text.maxWidth)
    }
    else {
      this.ctx.strokeStyle = text.color || '#000'
      this.ctx.strokeText(text.text, text.x, text.y, text.maxWidth)
    }
  }

  /* 矩形 */
  drawRect(rect: Rect): void {
    this.ctx.beginPath()
    if (rect.type === 'fill') {
      this.ctx.fillStyle = rect.color || '#000'
      this.ctx.fillRect(rect.x, rect.y, rect.width, rect.width)
    }
    else {
      this.ctx.strokeStyle = rect.color || '#000'
      this.ctx.strokeRect(rect.x, rect.y, rect.width, rect.width)
    }
  }

  /* 画三角 */
  drawTriangle(triangle: Triangle): void {
    this.ctx.beginPath()
    this.ctx.moveTo(triangle.point1.x, triangle.point1.y)
    this.ctx.lineTo(triangle.point2.x, triangle.point2.y)
    this.ctx.lineTo(triangle.point3.x, triangle.point3.y)
    this.ctx.closePath()
    if (triangle.type === 'fill') {
      this.ctx.fillStyle = triangle.color || '#000'
      this.ctx.fill()
    }
    else {
      this.ctx.strokeStyle = triangle.color || '#000'
      this.ctx.stroke()
    }
  }

  /* 画图 */
  draw(graph: Graph): void {
    if (graph.points.length === 0) {
      throw new Error('You need at least one starting point to draw a graph')
    }
    else {
      this.ctx.beginPath()
      this.ctx.moveTo(graph.points[0].x, graph.points[0].y)
      for (let i = 1; i < graph.points.length; i++) {
        const point: Point = graph.points[i]
        this.ctx.lineTo(point.x, point.y)
      }
      graph.close && this.ctx.closePath()
      if (graph.type === 'fill') {
        this.ctx.fillStyle = graph.color || '#000'
        this.ctx.fill()
      }
      else {
        this.ctx.strokeStyle = graph.color || '#000'
        this.ctx.stroke()
      }
    }
  }

  /* 转换为图片 */
  SaveAs(format: Format) {
    const url = this.canvas.toDataURL(format.type)
    const oA = document.createElement('a')
    format.name ? (oA.download = format.name) : (oA.download = '下载')
    oA.href = url
    document.body.appendChild(oA)
    oA.click()
    oA.remove()
  }

  /* 清空画布 */
  clearAll(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  /* 清空指定区域 */
  clear(x: number, y: number, h: number, w: number): void {
    this.ctx.clearRect(x, y, h, w)
  }
}
