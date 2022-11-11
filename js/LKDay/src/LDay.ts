class Day {
  private date: Date;
  private $Y: number;
  private $M: number;
  private $D: number;
  private $W: number;
  private $h: number;
  private $m: number;
  private $s: number;
  private $t: number;
  private $L: boolean;

  constructor(date?: string) {
    this.date = date ? new Date(date) : new Date();
    this.$Y = this.date.getFullYear();
    this.$M = this.date.getMonth() + 1;
    this.$D = this.date.getDate();
    this.$W = this.date.getDay();
    this.$h = this.date.getHours();
    this.$m = this.date.getMinutes();
    this.$s = this.date.getSeconds();
    this.$t = this.date.getTime();
    this.$L = this.isLeap();
  }

  /* 判断是否是闰年 */
  isLeap() {
    return (this.$Y % 4 === 0 && this.$Y !== 0) || this.$Y % 400 === 0;
  }

  /* 格式化 */
  format(pattern: string = "YYYY-MM-DD") {
    switch (pattern) {
      case "YYYY-MM-DD":
        return `${this.$Y.toString().padStart(4, "0")}-${this.$M
          .toString()
          .padStart(2, "0")}-${this.$D.toString().padStart(2, "0")}`;
      default: {
        return `${this.$Y}-${this.$M}-${this.$D}`;
      }
    }
  }

  /* 是否相同时间 */
  isSame(otherDate: Day) {
    return this.$t - otherDate.$t === 0;
  }

  /* 获取是一周第几天 */
  day() {
    return this.$W === 0 ? 7 : this.$W;
  }

  /* 一年内第几天 */
  dayOfYear() {
    let num = this.$D;
    const Months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (let i = 0; i < this.$M - 1; i++) {
      num += Months[i];
    }
    if (this.$L) {
      num++;
    }
    return num;
  }

  /* 一年内第几周 */
  week() {
    const firstday = new Date(`${this.$Y} 1 1`);
    const diff = this.$t - firstday.getTime();
    const days = Math.ceil(diff / 86400000);
    return Math.ceil(days / 7) + 1;
  }

  /* 获取数据 */
  get(id?: string) {
    let key = id || "";
    switch (key) {
      case "y":
      case "year":
        return this.$Y;
      case "M":
      case "month":
        return this.$M;
      case "d":
      case "date":
        return this.$D;
      case "h":
      case "hour":
        return this.$h;
      case "m":
      case "minute":
        return this.$m;
      case "s":
      case "second":
        return this.$s;
      case "ms":
      case "millisecond":
        return this.$t;
      case "w":
      case "day":
        return this.$W;
      default:
        return this.date;
    }
  }
}

/* 构造函数 */
export default function Lday(date?: string) {
  return new Day(date);
}
