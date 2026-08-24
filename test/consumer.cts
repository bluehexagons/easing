import easing = require('@bluehexagons/easing');
import named = require('@bluehexagons/easing/named');

const curve: easing.EasingFunction = easing.createElasticInOut();
const points = [
  [0, 0],
  [1, 1],
] as const;
const constructed: easing.EasingFunction[] = [
  easing.piecewiseLinear(points),
  easing.monotoneSpline(points),
  easing.invert(easing.linear),
  easing.hermite(),
  easing.compose(easing.quadIn, easing.quadOut),
  easing.mix(easing.quadIn, easing.quadOut),
  easing.repeat(easing.quadIn, 2),
  easing.alternate(easing.quadIn, 2),
  easing.smoothstep,
  easing.smootherstep,
];
const name: named.EasingName = 'quadInOut';
const result: number = named.easings[name](curve(0.5) + constructed.length);

void result;
