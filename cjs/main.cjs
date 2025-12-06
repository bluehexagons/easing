"use strict";
/*
  Code heavily-adapted from https://github.com/jimjeffers/Easie
  which is itself adapted from http://robertpenner.com/easing

  Original code MIT License + 3-clause BSD http://robertpenner.com/easing_terms_of_use.html
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.lerp = exports.ease = exports.inOut = exports.sineInOut = exports.sineOut = exports.sineIn = exports.quintInOut = exports.quintOut = exports.quintIn = exports.quartInOut = exports.quartOut = exports.quartIn = exports.quadInOut = exports.quadOut = exports.quadIn = exports.linear = exports.expoInOut = exports.expoOut = exports.expoIn = exports.elasticInOut = exports.elasticIn = exports.elasticOut = exports.cubicInOut = exports.cubicOut = exports.cubicIn = exports.circInOut = exports.circOut = exports.circIn = exports.bounceInOut = exports.bounceIn = exports.bounceOut = exports.backInOut = exports.backOut = exports.backIn = void 0;
const backIn = (time, overshoot = 1.70158) => {
    return time * time * ((overshoot + 1) * time - overshoot);
};
exports.backIn = backIn;
const backOut = (time, overshoot = 1.70158) => {
    time = time - 1;
    return time * time * ((overshoot + 1) * time + overshoot) + 1;
};
exports.backOut = backOut;
const backInOut = (time, overshoot = 1.70158) => {
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
const bounceOut = (time) => {
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
const bounceIn = (time) => {
    return 1 - (0, exports.bounceOut)(1 - time);
};
exports.bounceIn = bounceIn;
const bounceInOut = (time) => {
    if (time < 0.5) {
        return (0, exports.bounceIn)(time * 2) * 0.5;
    }
    else {
        return (0, exports.bounceOut)(time * 2 - 1) * 0.5 + 0.5;
    }
};
exports.bounceInOut = bounceInOut;
const circIn = (time) => {
    return -(Math.sqrt(1 - time * time) - 1);
};
exports.circIn = circIn;
const circOut = (time) => {
    time = time - 1;
    return Math.sqrt(1 - time * time);
};
exports.circOut = circOut;
const circInOut = (time) => {
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
const cubicIn = (time) => {
    return time * time * time;
};
exports.cubicIn = cubicIn;
const cubicOut = (time) => {
    time = time - 1;
    return time * time * time + 1;
};
exports.cubicOut = cubicOut;
const cubicInOut = (time) => {
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
const elasticOut = (time, amplitude = 1, period = 0.3) => {
    if (time === 0) {
        return 0;
    }
    else if (time === 1) {
        return 1;
    }
    else {
        const overshoot = (period / (2 * Math.PI)) * Math.asin(1 / amplitude);
        return (amplitude *
            2 ** (-10 * time) *
            Math.sin(((time - overshoot) * (2 * Math.PI)) / period) +
            1);
    }
};
exports.elasticOut = elasticOut;
const elasticIn = (time, amplitude = 1, period = 0.3) => {
    if (time === 0) {
        return 0;
    }
    else if (time === 1) {
        return 1;
    }
    else {
        const overshoot = (period / (2 * Math.PI)) * Math.asin(1 / amplitude);
        time -= 1;
        return (-(amplitude * 2 ** (10 * time)) *
            Math.sin(((time - overshoot) * (2 * Math.PI)) / period));
    }
};
exports.elasticIn = elasticIn;
const elasticInOut = (time, amplitude = 1, period = 0.45) => {
    time = time * 2;
    if (time === 0) {
        return 0;
    }
    else if (time === 2) {
        return 1;
    }
    else {
        const overshoot = (period / (2 * Math.PI)) * Math.asin(1 / amplitude);
        time = time - 1;
        if (time < 0) {
            return (-0.5 *
                (amplitude * 2 ** (10 * time)) *
                Math.sin((time - overshoot) * ((2 * Math.PI) / period)));
        }
        else {
            return (amplitude *
                2 ** (-10 * time) *
                Math.sin(((time - overshoot) * (2 * Math.PI)) / period) +
                1);
        }
    }
};
exports.elasticInOut = elasticInOut;
const expoIn = (time) => {
    if (time === 0) {
        return 0;
    }
    return 2 ** (10 * (time - 1));
};
exports.expoIn = expoIn;
const expoOut = (time) => {
    if (time === 1) {
        return 1;
    }
    return -(2 ** (-10 * time)) + 1;
};
exports.expoOut = expoOut;
const expoInOut = (time) => {
    time = time * 2;
    if (time === 0) {
        return 0;
    }
    else if (time === 2) {
        return 1;
    }
    else if (time < 1) {
        return 0.5 * 2 ** (10 * (time - 1));
    }
    else {
        return 0.5 * (-(2 ** (-10 * (time - 1))) + 2);
    }
};
exports.expoInOut = expoInOut;
const linear = (time) => {
    return time;
};
exports.linear = linear;
const quadIn = (time) => {
    return time * time;
};
exports.quadIn = quadIn;
const quadOut = (time) => {
    return -time * (time - 2);
};
exports.quadOut = quadOut;
const quadInOut = (time) => {
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
const quartIn = (time) => {
    return time * time * time * time;
};
exports.quartIn = quartIn;
const quartOut = (time) => {
    time = time - 1;
    return -(time * time * time * time - 1);
};
exports.quartOut = quartOut;
const quartInOut = (time) => {
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
const quintIn = (time) => {
    return time * time * time * time * time;
};
exports.quintIn = quintIn;
const quintOut = (time) => {
    time = time - 1;
    return time * time * time * time * time + 1;
};
exports.quintOut = quintOut;
const quintInOut = (time) => {
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
const sineIn = (time) => {
    return -Math.cos(time * (Math.PI / 2)) + 1;
};
exports.sineIn = sineIn;
const sineOut = (time) => {
    return Math.sin(time * (Math.PI / 2));
};
exports.sineOut = sineOut;
const sineInOut = (time) => {
    return -0.5 * (Math.cos(Math.PI * time) - 1);
};
exports.sineInOut = sineInOut;
/**
 * Helper function to use different easing functions above and below 0.5
 */
const inOut = (time, start, end) => {
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
 */
const ease = (fn, time, from, to) => from + fn(time) * (to - from);
exports.ease = ease;
/**
 * Convenience function to linearly interpolate between two values at a given time.
 */
const lerp = (time, from, to) => from + (0, exports.linear)(time) * (to - from);
exports.lerp = lerp;
