/*
  Code heavily-adapted from https://github.com/jimjeffers/Easie
  which is itself adapted from http://robertpenner.com/easing

  Original code MIT License + 3-clause BSD http://robertpenner.com/easing_terms_of_use.html
*/
/**
 * @param {number} time
 * @param {number} [overshoot=1.70158]
 * @returns {number}
 */
export var backIn = function (time, overshoot) {
    if (overshoot === void 0) { overshoot = 1.70158; }
    return time * time * ((overshoot + 1) * time - overshoot);
};
/**
 * @param {number} time
 * @param {number} [overshoot=1.70158]
 * @returns {number}
 */
export var backOut = function (time, overshoot) {
    if (overshoot === void 0) { overshoot = 1.70158; }
    time = time - 1;
    return time * time * ((overshoot + 1) * time + overshoot) + 1;
};
/**
 * @param {number} time
 * @param {number} [overshoot=1.70158]
 * @returns {number}
 */
export var backInOut = function (time, overshoot) {
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
/**
 * @param {number} time
 * @returns {number}
 */
export var bounceOut = function (time) {
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
/**
 * @param {number} time
 * @returns {number}
 */
export var bounceIn = function (time) {
    return 1 - bounceOut(1 - time);
};
/**
 * @param {number} time
 * @returns {number}
 */
export var bounceInOut = function (time) {
    if (time < 0.5) {
        return bounceIn(time * 2) * 0.5;
    }
    else {
        return bounceOut(time * 2 - 1) * 0.5 + 0.5;
    }
};
/**
 * @param {number} time
 * @returns {number}
 */
export var circIn = function (time) {
    return -(Math.sqrt(1 - time * time) - 1);
};
/**
 * @param {number} time
 * @returns {number}
 */
export var circOut = function (time) {
    time = time - 1;
    return Math.sqrt(1 - time * time);
};
/**
 * @param {number} time
 * @returns {number}
 */
export var circInOut = function (time) {
    time = time * 2;
    if (time < 1) {
        return -0.5 * (Math.sqrt(1 - time * time) - 1);
    }
    else {
        time = time - 2;
        return 0.5 * (Math.sqrt(1 - time * time) + 1);
    }
};
/**
 * @param {number} time
 * @returns {number}
 */
export var cubicIn = function (time) {
    return time * time * time;
};
/**
 * @param {number} time
 * @returns {number}
 */
export var cubicOut = function (time) {
    time = time - 1;
    return time * time * time + 1;
};
/**
 * @param {number} time
 * @returns {number}
 */
export var cubicInOut = function (time) {
    time = time * 2;
    if (time < 1) {
        return 0.5 * time * time * time;
    }
    else {
        time = time - 2;
        return 0.5 * (time * time * time + 2);
    }
};
/**
 * @param {number} time
 * @param {number} [amplitude=1]
 * @param {number} [period=0.3]
 * @returns {number}
 */
export var elasticOut = function (time, amplitude, period) {
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
/**
 * @param {number} time
 * @param {number} [amplitude=1]
 * @param {number} [period=0.3]
 * @returns {number}
 */
export var elasticIn = function (time, amplitude, period) {
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
/**
 * @param {number} time
 * @param {number} [amplitude=1]
 * @param {number} [period=0.45]
 * @returns {number}
 */
export var elasticInOut = function (time, amplitude, period) {
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
/**
 * @param {number} time
 * @returns {number}
 */
export var expoIn = function (time) {
    if (time === 0) {
        return 0;
    }
    return Math.pow(2, (10 * (time - 1)));
};
/**
 * @param {number} time
 * @returns {number}
 */
export var expoOut = function (time) {
    if (time === 1) {
        return 1;
    }
    return -(Math.pow(2, (-10 * time))) + 1;
};
/**
 * @param {number} time
 * @returns {number}
 */
export var expoInOut = function (time) {
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
/**
 * @param {number} time
 * @returns {number}
 */
export var linear = function (time) {
    return time;
};
/**
 * @param {number} time
 * @returns {number}
 */
export var quadIn = function (time) {
    return time * time;
};
/**
 * @param {number} time
 * @returns {number}
 */
export var quadOut = function (time) {
    return -time * (time - 2);
};
/**
 * @param {number} time
 * @returns {number}
 */
export var quadInOut = function (time) {
    time = time * 2;
    if (time < 1) {
        return 0.5 * time * time;
    }
    else {
        time = time - 1;
        return -0.5 * (time * (time - 2) - 1);
    }
};
/**
 * @param {number} time
 * @returns {number}
 */
export var quartIn = function (time) {
    return time * time * time * time;
};
/**
 * @param {number} time
 * @returns {number}
 */
export var quartOut = function (time) {
    time = time - 1;
    return -(time * time * time * time - 1);
};
/**
 * @param {number} time
 * @returns {number}
 */
export var quartInOut = function (time) {
    time = time * 2;
    if (time < 1) {
        return 0.5 * time * time * time * time;
    }
    else {
        time = time - 2;
        return -0.5 * (time * time * time * time - 2);
    }
};
/**
 * @param {number} time
 * @returns {number}
 */
export var quintIn = function (time) {
    return time * time * time * time * time;
};
/**
 * @param {number} time
 * @returns {number}
 */
export var quintOut = function (time) {
    time = time - 1;
    return time * time * time * time * time + 1;
};
/**
 * @param {number} time
 * @returns {number}
 */
export var quintInOut = function (time) {
    time = time * 2;
    if (time < 1) {
        return 0.5 * time * time * time * time * time;
    }
    else {
        time = time - 2;
        return 0.5 * (time * time * time * time * time + 2);
    }
};
/**
 * @param {number} time
 * @returns {number}
 */
export var sineIn = function (time) {
    return -Math.cos(time * (Math.PI / 2)) + 1;
};
/**
 * @param {number} time
 * @returns {number}
 */
export var sineOut = function (time) {
    return Math.sin(time * (Math.PI / 2));
};
/**
 * @param {number} time
 * @returns {number}
 */
export var sineInOut = function (time) {
    return -0.5 * (Math.cos(Math.PI * time) - 1);
};
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
export var inOut = function (time, start, end) {
    time = time * 2;
    if (time <= 1) {
        return start(time) * 0.5;
    }
    else {
        return 0.5 + end(time - 1.0);
    }
};
/**
 * Helper function to ease with a function between two values.
 *
 * @param {EasingFunction} fn Easing function taking only time as a parameter
 * @param {number} time
 * @param {number} from Starting value at 0 time
 * @param {number} to Ending value at 1 time
 * @returns {number}
 */
export var ease = function (fn, time, from, to) { return from + fn(time) * (to - from); };
/**
 * Convenience function to linearly interpolate between two values at a given time.
 *
 * @param {number} time
 * @param {number} from Starting value at 0 time
 * @param {number} to Ending value at 1 time
 */
export var lerp = function (time, from, to) { return from + linear(time) * (to - from); };
