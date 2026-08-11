import { renameSync } from 'node:fs';

// Rename the compiled .js file to .cjs for CommonJS
try {
  renameSync(
    new URL('./cjs/main.js', import.meta.url),
    new URL('./cjs/main.cjs', import.meta.url),
  );
} catch (error) {
  throw new Error('Failed to create the CommonJS build', { cause: error });
}
