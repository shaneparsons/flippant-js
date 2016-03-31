var flippant = (function () {

  var flip = function (flipper, content, type, extra_class, timeout) {
    var position, back, style_func, type_class;
    timeout = timeout || 400;
    type = type || "card";

    if (type === "modal") {
      type_class = "flippant-modal-dark";
      position = "fixed";
      style_func = null_styles;
    }

    if (type === "card") {
      type_class = "flippant-modal-light"
      position = "absolute";
      style_func = card_styles;
    }

    back = document.createElement('div');
    document.body.appendChild(back);

    set_styles(back, flipper, position);
    back.innerHTML = content;
    flipper.classList.add('flippant');
    back.classList.add('flippant-back');
    back.classList.add(type_class);
    back.classList.add(extra_class);

    if (position == "absolute") {
      style_func(back)
    } else {
      window.setTimeout(function () {
        style_func(back)
      }, 0);
    }

    window.setTimeout(function () {
      back.classList.add('flipper')
      back.classList.add('flipped')
      flipper.classList.add('flipped')
    }, 0);

    back.addEventListener('close', close);
    back.close = close;

    function close() {
      set_styles(back, flipper, position);
      back.classList.remove('flipped');
      back.classList.remove('flipped');
      flipper.classList.remove('flipped');

      window.setTimeout(function () {
        back.classList.remove(type_class);
        back.classList.remove(extra_class);
        document.body.removeChild(back);
      }, timeout);
    }

    return back;
  }

  var set_styles = function (back, front, position) {
    back.style.position = position;
    cur = front;
    totalLeft = 0;
    totalTop = 0;

    while (cur) {
      totalLeft += cur.offsetLeft;
      totalTop += cur.offsetTop;
      cur = cur.offsetParent;
    }

    back.style.top = totalTop + "px";
    back.style.left = totalLeft + "px";
    back.style['min-height'] = front.offsetHeight + "px";
    back.style.width = front.offsetWidth + "px";
    back.style["z-index"] = 100;
  }

  var null_styles = function (back) {
    back.style.top = null;
    back.style.left = null;
    back.style.height = null;
    back.style.width = null;
  }

  var card_styles = function (back) {
    back.style.height = 'auto';
  }

  return {
    flip: flip
  }

})();
