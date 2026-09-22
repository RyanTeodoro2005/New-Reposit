import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const project = fileURLToPath(new URL('../', import.meta.url));
const blender = process.env.BLENDER_PATH || join(homedir(), 'Tools/RyanAvatar/blender/blender.exe');
if (!existsSync(blender)) {
  throw new Error('Set BLENDER_PATH to your Blender executable with KeenTools FaceBuilder installed. The website itself does not require Blender.');
}
const mode = process.argv[2] || 'export';
if (!['export', 'reconstruct'].includes(mode)) throw new Error('Use export or reconstruct.');
function run(script, args = []) {
  const result = spawnSync(blender, ['--background', '--python-exit-code', '1', '--python', join(project, 'scripts', script), ...args], { cwd: project, stdio: 'inherit', windowsHide: true });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}
if (mode === 'reconstruct') {
  run('reconstruct-facebuilder.py');
  run('reconstruct-facebuilder.py', ['--', '--reference', 'ryan-ink-reference-v5.png', '--name', 'ink-projection']);
}
run('export-facebuilder.py');
