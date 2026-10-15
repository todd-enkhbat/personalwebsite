import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const sharp = require('sharp');
const kinds = ['satellite','habitat','gimbal','cubesat','exoplanet','balloon','growlight','camp','telescope','suit','record','rocket','piano','retail','finance','learning'];

/** Publish only a complete, nonempty set. Content hashes invalidate image optimizer caches. */
export async function publishPortfolioPreviews() {
  const manifest = {};
  let totalBytes = 0;
  for (const kind of kinds) {
    const bytes = await fs.readFile(`public/models/previews/studio/${kind}.webp`);
    const stats = await sharp(bytes).stats();
    if (stats.channels[3]?.max === 0) throw new Error(`Empty render: ${kind}`);
    const hash = createHash('sha256').update(bytes).digest('hex').slice(0,10);
    const file = `/models/previews/studio/${kind}-${hash}.webp`;
    await fs.writeFile(`public${file}`,bytes);
    manifest[kind] = file;
    totalBytes += bytes.length;
  }
  await fs.writeFile('app/data/modelPreviewAssets.json',JSON.stringify(manifest,null,2)+'\n');
  console.log(`Published ${kinds.length} previews, ${Math.round(totalBytes/1024)} KiB total.`);
}
if (process.argv[1]?.endsWith('publish-portfolio-previews.mjs')) await publishPortfolioPreviews();
