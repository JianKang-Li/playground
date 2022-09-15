//封装mobile上的单击和长按的方法
; (function (doc) {
  var Touch = function (selector) {
    return Touch.prototype.init(selector)
  }
  Touch.prototype = {
    init: function (selector) {
      if (typeof (selector) == "string") {
        this.elem = doc.querySelector(selector);
        return this;
      }
    },
    tap: function (callback) {
      this.elem.addEventListener("touchstart", fn, false);
      this.elem.addEventListener("touchend", fn, false);
      var sTime, _self = this
        , eTime;
      function fn(e) {
        e.preventDefault();
        switch (e.type) {
          case "touchstart": sTime = new Date().getTime(); break;
          case "touchend": eTime = new Date().getTime();
            if (eTime - sTime < 500) {
              callback.call(_self.elem, e)
            }
            break;
        }
      }
    },

    longtap: function (callback) {
      this.elem.addEventListener("touchstart", fn, false);
      this.elem.addEventListener("touchmove", fn, false);
      this.elem.addEventListener("touchend", fn, false);
      var t = null, _self = this;

      function fn(e) {
        e.preventDefault()
        switch (e.type) {
          case "touchstart": t = setTimeout(function () {
            callback.call(_self.elem, e)
          }, 500); break;
          case "touchmove": clearTimeout(t); t = null; break;
          case "touchend": clearTimeout(t); t = null; break;
        }
      }
    }
  }

  window.$ = window.Touch = Touch
})(document)