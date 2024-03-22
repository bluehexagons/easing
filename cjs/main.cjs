"use strict";
/*
  Code heavily-adapted from https://github.com/jimjeffers/Easie
  which is itself adapted from http://robertpenner.com/easing

  Original code MIT License + 3-clause BSD http://robertpenner.com/easing_terms_of_use.html
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.lerp = exports.ease = exports.inOut = exports.sineInOut = exports.sineOut = exports.sineIn = exports.quintInOut = exports.quintOut = exports.quintIn = exports.quartInOut = exports.quartOut = exports.quartIn = exports.quadInOut = exports.quadOut = exports.quadIn = exports.linear = exports.expoInOut = exports.expoOut = exports.expoIn = exports.elasticInOut = exports.elasticIn = exports.elasticOut = exports.cubicInOut = exports.cubicOut = exports.cubicIn = exports.circInOut = exports.circOut = exports.circIn = exports.bounceInOut = exports.bounceIn = exports.bounceOut = exports.backInOut = exports.backOut = exports.backIn = void 0;
/**
 * @param {number} time
 * @param {number} [overshoot=1.70158]
 * @returns {number}
 */
var backIn = function (time, overshoot) {
    if (overshoot === void 0) { overshoot = 1.70158; }
    return time * time * ((overshoot + 1) * time - overshoot);
};
exports.backIn = backIn;
/**
 * @param {number} time
 * @param {number} [overshoot=1.70158]
 * @returns {number}
 */
var backOut = function (time, overshoot) {
    if (overshoot === void 0) { overshoot = 1.70158; }
    time = time - 1;
    return time * time * ((overshoot + 1) * time + overshoot) + 1;
};
exports.backOut = backOut;
/**
 * @param {number} time
 * @param {number} [overshoot=1.70158]
 * @returns {number}
 */
var backInOut = function (time, overshoot) {
    if (overshoot === void 0) { overshoot = 1.70158; }
    time = time * 2;
    overshoot = overshoot * 1.525;
    if (time < 1) {
        return 0.5 * (time * time * ((overshoot + 1) * time - overshoot));
    }
    else {
        return 0.5 * (time * time * ((overshoot + 1) * time + overshoot) + 2);
    }
};
exports.backInOut = backInOut;
/**
 * @param {number} time
 * @returns {number}
 */
var bounceOut = function (time) {
    if (time < 1 / 2.75) {
        return 7.5625 * time * time;
    }
    else if (time < 2 / 2.75) {
        return 7.5625 * (time -= 1.5 / 2.75) * time + 0.75;
    }
    else if (time < 2.5 / 2.75) {
        return 7.5625 * (time -= 2.25 / 2.75) * time + 0.9375;
    }
    else {
        return 7.5625 * (time -= 2.625 / 2.75) * time + 0.984375;
    }
};
exports.bounceOut = bounceOut;
/**
 * @param {number} time
 * @returns {number}
 */
var bounceIn = function (time) {
    return 1 - (0, exports.bounceOut)(1 - time);
};
exports.bounceIn = bounceIn;
/**
 * @param {number} time
 * @returns {number}
 */
var bounceInOut = function (time) {
    if (time < 0.5) {
        return (0, exports.bounceIn)(time * 2) * 0.5;
    }
    else {
        return (0, exports.bounceOut)(time * 2 - 1) * 0.5 + 0.5;
    }
};
exports.bounceInOut = bounceInOut;
/**
 * @param {number} time
 * @returns {number}
 */
var circIn = function (time) {
    return -(Math.sqrt(1 - time * time) - 1);
};
exports.circIn = circIn;
/**
 * @param {number} time
 * @returns {number}
 */
var circOut = function (time) {
    time = time - 1;
    return Math.sqrt(1 - time * time);
};
exports.circOut = circOut;
/**
 * @param {number} time
 * @returns {number}
 */
var circInOut = function (time) {
    time = time * 2;
    if (time < 1) {
        return -0.5 * (Math.sqrt(1 - time * time) - 1);
    }
    else {
        time = time - 2;
        return 0.5 * (Math.sqrt(1 - time * time) + 1);
    }
};
exports.circInOut = circInOut;
/**
 * @param {number} time
 * @returns {number}
 */
var cubicIn = function (time) {
    return time * time * time;
};
exports.cubicIn = cubicIn;
/**
 * @param {number} time
 * @returns {number}
 */
var cubicOut = function (time) {
    time = time - 1;
    return time * time * time + 1;
};
exports.cubicOut = cubicOut;
/**
 * @param {number} time
 * @returns {number}
 */
var cubicInOut = function (time) {
    time = time * 2;
    if (time < 1) {
        return 0.5 * time * time * time;
    }
    else {
        time = time - 2;
        return 0.5 * (time * time * time + 2);
    }
};
exports.cubicInOut = cubicInOut;
/**
 * @param {number} time
 * @param {number} [amplitude=1]
 * @param {number} [period=0.3]
 * @returns {number}
 */
var elasticOut = function (time, amplitude, period) {
    if (amplitude === void 0) { amplitude = 1; }
    if (period === void 0) { period = 0.3; }
    if (time === 0) {
        return 0;
    }
    else if (time === 1) {
        return 1;
    }
    else {
        var overshoot = (period / (2 * Math.PI)) * Math.asin(1 / amplitude);
        return (amplitude *
            Math.pow(2, (-10 * time)) *
            Math.sin(((time - overshoot) * (2 * Math.PI)) / period) +
            1);
    }
};
exports.elasticOut = elasticOut;
/**
 * @param {number} time
 * @param {number} [amplitude=1]
 * @param {number} [period=0.3]
 * @returns {number}
 */
var elasticIn = function (time, amplitude, period) {
    if (amplitude === void 0) { amplitude = 1; }
    if (period === void 0) { period = 0.3; }
    if (time === 0) {
        return 0;
    }
    else if (time === 1) {
        return 1;
    }
    else {
        var overshoot = (period / (2 * Math.PI)) * Math.asin(1 / amplitude);
        time -= 1;
        return (-(amplitude * Math.pow(2, (10 * time))) *
            Math.sin(((time - overshoot) * (2 * Math.PI)) / period));
    }
};
exports.elasticIn = elasticIn;
/**
 * @param {number} time
 * @param {number} [amplitude=1]
 * @param {number} [period=0.45]
 * @returns {number}
 */
var elasticInOut = function (time, amplitude, period) {
    if (amplitude === void 0) { amplitude = 1; }
    if (period === void 0) { period = 0.45; }
    time = time * 2;
    if (time === 0) {
        return 0;
    }
    else if (time === 2) {
        return 1;
    }
    else {
        var overshoot = (period / (2 * Math.PI)) * Math.asin(1 / amplitude);
        time = time - 1;
        if (time < 0) {
            return (-0.5 *
                (amplitude * Math.pow(2, (10 * time))) *
                Math.sin((time - overshoot) * ((2 * Math.PI) / period)));
        }
        else {
            return (amplitude *
                Math.pow(2, (-10 * time)) *
                Math.sin(((time - overshoot) * (2 * Math.PI)) / period) +
                1);
        }
    }
};
exports.elasticInOut = elasticInOut;
/**
 * @param {number} time
 * @returns {number}
 */
var expoIn = function (time) {
    if (time === 0) {
        return 0;
    }
    return Math.pow(2, (10 * (time - 1)));
};
exports.expoIn = expoIn;
/**
 * @param {number} time
 * @returns {number}
 */
var expoOut = function (time) {
    if (time === 1) {
        return 1;
    }
    return -(Math.pow(2, (-10 * time))) + 1;
};
exports.expoOut = expoOut;
/**
 * @param {number} time
 * @returns {number}
 */
var expoInOut = function (time) {
    time = time * 2;
    if (time === 0) {
        return 0;
    }
    else if (time === 2) {
        return 1;
    }
    else if (time < 1) {
        return 0.5 * Math.pow(2, (10 * (time - 1)));
    }
    else {
        return 0.5 * (-(Math.pow(2, (-10 * (time - 1)))) + 2);
    }
};
exports.expoInOut = expoInOut;
/**
 * @param {number} time
 * @returns {number}
 */
var linear = function (time) {
    return time;
};
exports.linear = linear;
/**
 * @param {number} time
 * @returns {number}
 */
var quadIn = function (time) {
    return time * time;
};
exports.quadIn = quadIn;
/**
 * @param {number} time
 * @returns {number}
 */
var quadOut = function (time) {
    return -time * (time - 2);
};
exports.quadOut = quadOut;
/**
 * @param {number} time
 * @returns {number}
 */
var quadInOut = function (time) {
    time = time * 2;
    if (time < 1) {
        return 0.5 * time * time;
    }
    else {
        time = time - 1;
        return -0.5 * (time * (time - 2) - 1);
    }
};
exports.quadInOut = quadInOut;
/**
 * @param {number} time
 * @returns {number}
 */
var quartIn = function (time) {
    return time * time * time * time;
};
exports.quartIn = quartIn;
/**
 * @param {number} time
 * @returns {number}
 */
var quartOut = function (time) {
    time = time - 1;
    return -(time * time * time * time - 1);
};
exports.quartOut = quartOut;
/**
 * @param {number} time
 * @returns {number}
 */
var quartInOut = function (time) {
    time = time * 2;
    if (time < 1) {
        return 0.5 * time * time * time * time;
    }
    else {
        time = time - 2;
        return -0.5 * (time * time * time * time - 2);
    }
};
exports.quartInOut = quartInOut;
/**
 * @param {number} time
 * @returns {number}
 */
var quintIn = function (time) {
    return time * time * time * time * time;
};
exports.quintIn = quintIn;
/**
 * @param {number} time
 * @returns {number}
 */
var quintOut = function (time) {
    time = time - 1;
    return time * time * time * time * time + 1;
};
exports.quintOut = quintOut;
/**
 * @param {number} time
 * @returns {number}
 */
var quintInOut = function (time) {
    time = time * 2;
    if (time < 1) {
        return 0.5 * time * time * time * time * time;
    }
    else {
        time = time - 2;
        return 0.5 * (time * time * time * time * time + 2);
    }
};
exports.quintInOut = quintInOut;
/**
 * @param {number} time
 * @returns {number}
 */
var sineIn = function (time) {
    return -Math.cos(time * (Math.PI / 2)) + 1;
};
exports.sineIn = sineIn;
/**
 * @param {number} time
 * @returns {number}
 */
var sineOut = function (time) {
    return Math.sin(time * (Math.PI / 2));
};
exports.sineOut = sineOut;
/**
 * @param {number} time
 * @returns {number}
 */
var sineInOut = function (time) {
    return -0.5 * (Math.cos(Math.PI * time) - 1);
};
exports.sineInOut = sineInOut;
/**
 * @callback EasingFunction
 * @param {number} time
 * @returns {number}
 */
/**
 * Helper function to use different easing functions above and below 0.5
 * @param {number} time
 * @param {EasingFunction} start
 * @param {EasingFunction} end
 * @returns {number}
 */
var inOut = function (time, start, end) {
    time = time * 2;
    if (time <= 1) {
        return start(time) * 0.5;
    }
    else {
        return 0.5 + end(time - 1.0);
    }
};
exports.inOut = inOut;
/**
 * Helper function to ease with a function between two values.
 *
 * @param {EasingFunction} fn Easing function taking only time as a parameter
 * @param {number} time
 * @param {number} from Starting value at 0 time
 * @param {number} to Ending value at 1 time
 * @returns {number}
 */
var ease = function (fn, time, from, to) { return from + fn(time) * (to - from); };
exports.ease = ease;
/**
 * Convenience function to linearly interpolate between two values at a given time.
 *
 * @param {number} time
 * @param {number} from Starting value at 0 time
 * @param {number} to Ending value at 1 time
 */
var lerp = function (time, from, to) { return from + (0, exports.linear)(time) * (to - from); };
exports.lerp = lerp;
