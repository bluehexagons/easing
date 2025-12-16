import {rename} from 'node:fs';

// Rename the compiled .js file to .cjs for CommonJS
rename('cjs/main.js', 'cjs/main.cjs', e => {
  if (e) {
    console.log('Error renaming to cjs:', e);
  }
});
