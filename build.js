import {rename} from 'node:fs';

// At time of writing, TypeScript insists on keeping the same kind of file extension
rename('cjs/main.mjs', 'cjs/main.cjs', e => {
  if (e) {
    console.log('Error renaming to cjs:', e);
  }
});
