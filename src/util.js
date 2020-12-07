"use strict";
exports.__esModule = true;
var allCss = [].slice
  .call(document.styleSheets)
  .reduce(function (prev, styleSheet) {
    if (styleSheet.cssRules) {
      return (
        prev +
        [].slice.call(styleSheet.cssRules).reduce(function (prev, cssRule) {
          return prev + cssRule.cssText;
        }, "")
      );
    } else {
      return prev;
    }
  }, "");
function selectToolChange(change) {
  this.selectedTool =
    change === null || change === void 0 ? void 0 : change.tool;
}
