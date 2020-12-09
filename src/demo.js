var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
console.log(1231);
var Super = /** @class */ (function () {
  function Super() {
    this.name = "super";
  }
  Super.prototype.say = function () {
    console.log(this.name);
  };
  return Super;
})();
var Sub = /** @class */ (function (_super) {
  __extends(Sub, _super);
  function Sub() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.age = 12;
    return _this;
  }
  Sub.prototype.introduce = function () {
    this.say();
    console.log(this.age);
  };
  return Sub;
})(Super);
