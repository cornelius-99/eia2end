"use strict";
var Firework;
(function (Firework) {
    function randomNumberFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    Firework.randomNumberFromRange = randomNumberFromRange;
})(Firework || (Firework = {}));
//# sourceMappingURL=utils.js.map