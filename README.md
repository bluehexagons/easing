# @bluehexagons/easing

A simple easing library.

All functions expect a time constraint of \[0-1\].

Code heavily-adapted from https://github.com/jimjeffers/Easie
which is itself adapted from http://robertpenner.com/easing

MIT license.

## Usage
```js
import { lerp, ease, quadIn, linear } from '@bluehexagons/easing';

const time = 0.5;
const start = 0;
const end = 100;

// Linearly interpolate between a start and end value
console.log(
  lerp(time, start, end)
);

// Apply an EasingFunction to interpolate between start and end values
console.log(
  ease(quadIn, time, start, end)
);

// Use an EasingFunction directly
console.log(
  linear(time)
);

// elasticInOut is a more complicated easing function
const amplitude = 1.5;
const period = 0.3;
console.log(
  elasticInOut(time, amplitude, period)
);

// Using elasticInOut with the ease helper function, if you really want to
console.log(
  ease(t => elasticInOut(t, amplitude, period), time, start, end)
);

// Or the ease helper function on its own
console.log(
  ease(t => t ** 2, time, start, end)
);
```

## Contributing

Pull requests are welcome.

## TypeScript

`src/main.d.mts` contains typings.

To build TypeScript definitions for development, run `npm run build`
