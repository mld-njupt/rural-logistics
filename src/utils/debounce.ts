export function debounce(fn, interval) {
  let timer: any;
  timer = null;
  return function () {
    let _this = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn.apply(_this, args), interval);
  };
}
