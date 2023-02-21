import fs from 'fs';
import path from 'path';
import { execa } from 'execa';

const cwd = process.cwd();

function lockfileExists (lockFile: string) {
  return fs.existsSync(path.join(cwd, lockFile))
}

let packageManager: 'yarn' | 'pnpm' | 'npm'
if (lockfileExists('yarn.lock')) {
  packageManager = 'yarn'
} else if (lockfileExists('pnpm-lock.yaml')) {
  packageManager = 'pnpm'
} else {
  packageManager = 'npm'
}

execa(packageManager, process.argv.slice(2))
