export type EasingFunction = (time: number) => number;
export interface ElasticOptions {
    amplitude?: number;
    period?: number;
}
export interface SpringOptions {
    mass?: number;
    stiffness?: number;
    damping?: number;
    velocity?: number;
    duration?: number;
}
export type StepPosition = 'start' | 'end';
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
/** Create an elastic-in curve with reusable parameters. */
export declare const createElasticIn: (options?: ElasticOptions) => EasingFunction;
/** Create an elastic-out curve with reusable parameters. */
export declare const createElasticOut: (options?: ElasticOptions) => EasingFunction;
/** Create an elastic-in-out curve with reusable parameters. */
export declare const createElasticInOut: (options?: ElasticOptions) => EasingFunction;
/** Create a curve that uses one easing function for each half. */
export declare const combineInOut: (start: EasingFunction, end: EasingFunction) => EasingFunction;
/** Reverse an easing function in time and value. */
export declare const reverse: (fn: EasingFunction) => EasingFunction;
/** Clamp an easing function's output to a range. */
export declare const clamp: (fn: EasingFunction, minimum?: number, maximum?: number) => EasingFunction;
/** Create an easing function equivalent to CSS cubic-bezier(). */
export declare const cubicBezier: (x1: number, y1: number, x2: number, y2: number) => EasingFunction;
/** Create a stepped easing curve. */
export declare const steps: (count: number, position?: StepPosition) => EasingFunction;
/** Create a normalized damped-spring easing curve. */
export declare const spring: (options?: SpringOptions) => EasingFunction;
