import easing = require('@bluehexagons/easing');
import named = require('@bluehexagons/easing/named');

const curve: easing.EasingFunction = easing.createElasticInOut();
const name: named.EasingName = 'quadInOut';
const result: number = named.easings[name](curve(0.5));

void result;
