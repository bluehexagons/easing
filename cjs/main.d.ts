export declare const backIn: (time: number, overshoot?: number) => number;
export declare const backOut: (time: number, overshoot?: number) => number;
export declare const backInOut: (time: number, overshoot?: number) => number;
export declare const bounceOut: (time: number) => number;
export declare const bounceIn: (time: number) => number;
export declare const bounceInOut: (time: number) => number;
export declare const circIn: (time: number) => number;
export declare const circOut: (time: number) => number;
export declare const circInOut: (time: number) => number;
export declare const cubicIn: (time: number) => number;
export declare const cubicOut: (time: number) => number;
export declare const cubicInOut: (time: number) => number;
export declare const elasticOut: (time: number, amplitude?: number, period?: number) => number;
export declare const elasticIn: (time: number, amplitude?: number, period?: number) => number;
export declare const elasticInOut: (time: number, amplitude?: number, period?: number) => number;
export declare const expoIn: (time: number) => number;
export declare const expoOut: (time: number) => number;
export declare const expoInOut: (time: number) => number;
export declare const linear: (time: number) => number;
export declare const quadIn: (time: number) => number;
export declare const quadOut: (time: number) => number;
export declare const quadInOut: (time: number) => number;
export declare const quartIn: (time: number) => number;
export declare const quartOut: (time: number) => number;
export declare const quartInOut: (time: number) => number;
export declare const quintIn: (time: number) => number;
export declare const quintOut: (time: number) => number;
export declare const quintInOut: (time: number) => number;
export declare const sineIn: (time: number) => number;
export declare const sineOut: (time: number) => number;
export declare const sineInOut: (time: number) => number;
export type EasingFunction = (time: number) => number;
/**
 * Helper function to use different easing functions above and below 0.5
 */
export declare const inOut: (time: number, start: EasingFunction, end: EasingFunction) => number;
/**
 * Helper function to ease with a function between two values.
 */
export declare const ease: (fn: EasingFunction, time: number, from: number, to: number) => number;
/**
 * Convenience function to linearly interpolate between two values at a given time.
 */
export declare const lerp: (time: number, from: number, to: number) => number;
