class Day {
  constructor(date) {
    this.date = date ? new Date(date) : new Date()
    this.$Y = this.date.getFullYear()
    this.$M = this.date.getMonth() + 1
    this.$D = this.date.getDate()
    this.$W = this.date.getDay()
    this.$h = this.date.getHours()
    this.$m = this.date.getMinutes()
    this.$s = this.date.getSeconds()
    this.$t = this.date.getTime()
    this.$L = this.isLeap()
  }


  isLeap() {
    return (this.$Y % 4 === 0 && this.$Y !== 0) || this.$Y % 400 === 0
  }

  format(pattern = "YYYY-MM-DD") {
    switch (pattern) {
      case "YYYY-MM-DD": return `${this.$Y.toString().padStart(4, 0)}-${this.$Y.toString().padStart(2, 0)
        }-${this.$D.toString().padStart(2, 0)}`
      default: {
        return `${this.$Y}-${this.$M}-${this.$D}`
      }
    }
  }

  isSame(otherDate) {
    return (this.date - otherDate.date === 0)
  }

  day() {
    return this.$W === 0 ? 7 : this.$W
  }

  dayOfYear() {
    const num = this.$D
    const Months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (let i = 0; i < this.$M - 1; i++) {
      num += Months[i]
    }
    if (this.$L) {
      num++
    }
    return num
  }

  week() {
    const firstday = new Date(`${this.$Y} 1 1`)
    const diff = this.$t - firstday.getTime()
    const days = Math.ceil(diff / 86400000)
    return Math.ceil(days / 7) + 1
  }

  get(id) {
    let key = id && id.toLowerCase() || ''
    switch (key) {
      case 'y':
      case 'year': return this.$Y
      case 'm':
      case 'month': return this.$M
      case "d":
      case 'date': return this.$D
      case "h":
      case 'hour': return this.$h
      case "m":
      case 'minute': return this.$m
      case "s":
      case 'second': return this.$s
      case "ms":
      case 'millisecond': return this.$t
      case "w":
      case 'day': return this.$W
      default:
        return this.date
    }
  }
}


function Lday(date) {
  return new Day(date)
}