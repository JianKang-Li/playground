//封装mobile上的单击,长按，左滑，右滑的方法
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
    },
    swipLeft: function (callback) {
      this.elem.addEventListener("touchstart", fn, false);
      this.elem.addEventListener("touchend", fn, false);
      var startP = null, endP = null, _self = this;
      function fn(e) {
        e.preventDefault()
        // console.log(e.changedTouches[0].clientX)
        switch (e.type) {
          case "touchstart": startP = e.changedTouches[0].clientX; break;
          case "touchend": endP = e.changedTouches[0].clientX;
            if (startP - endP >= 100) {
              callback.call(_self.elem, e)
            };
            break;
        }
      }
    },

    swipRight: function (callback) {
      this.elem.addEventListener("touchstart", fn, false);
      this.elem.addEventListener("touchend", fn, false);
      var startP = null, endP = null, _self = this;
      function fn(e) {
        e.preventDefault()
        // console.log(e.changedTouches[0].clientX)
        switch (e.type) {
          case "touchstart": startP = e.changedTouches[0].clientX; break;
          case "touchend": endP = e.changedTouches[0].clientX;
            if (endP - startP >= 100) {
              callback.call(_self.elem, e)
            };
            break;
        }
      }
    }
  }

  window.$ = window.Touch = Touch
})(document)