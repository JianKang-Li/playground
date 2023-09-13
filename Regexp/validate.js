class Validate {
  constructor() {
    window._v = this;
  }

  is_Email(email) {
    return /^[A-Za-z0-9-_\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)
  }

  // zh_cn
  is_Phone(phone) {
    return /^((\+|00)86)?(1[3-9]|9[28])\d{9}$/.test(phone)
  }

  is_HexColor(color) {
    return /^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(color)
  }
}

const validator = new Validate()

export default validator