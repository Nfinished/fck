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
const ps = execa(packageManager, process.argv.slice(2), { stdio: 'inherit' })
ps.stdout?.pipe(process.stdout)
ps.stderr?.pipe(process.stderr)
