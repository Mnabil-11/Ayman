import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, '..', 'images');
const projectsDir = path.join(imagesDir, 'projects');

async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

  const dir = path.dirname(filePath);
  const name = path.basename(filePath, ext);

  const webpPath = path.join(dir, `${name}.webp`);
  const avifPath = path.join(dir, `${name}.avif`);

  const image = sharp(filePath);
  const metadata = await image.metadata();

  console.log(`Processing: ${path.relative(imagesDir, filePath)} (${(fs.statSync(filePath).size / 1024).toFixed(1)} KB)`);

  // Max width for hero is 1600, for projects/profile 800
  const isHero = name.includes('hero');
  const maxWidth = isHero ? 1600 : 800;

  let pipeline = image;
  if (metadata.width && metadata.width > maxWidth) {
    pipeline = pipeline.resize(maxWidth);
  }

  // Generate WebP
  await pipeline
    .clone()
    .webp({ quality: 80 })
    .toFile(webpPath);
  console.log(`  -> WebP: ${path.relative(imagesDir, webpPath)} (${(fs.statSync(webpPath).size / 1024).toFixed(1)} KB)`);

  // Generate AVIF
  await pipeline
    .clone()
    .avif({ quality: 65 })
    .toFile(avifPath);
  console.log(`  -> AVIF: ${path.relative(imagesDir, avifPath)} (${(fs.statSync(avifPath).size / 1024).toFixed(1)} KB)`);
}

async function run() {
  console.log('🖼️ Starting image optimization...');

  const filesInImages = fs.readdirSync(imagesDir).map(f => path.join(imagesDir, f));
  for (const file of filesInImages) {
    if (fs.statSync(file).isFile()) {
      await processImage(file);
    }
  }

  if (fs.existsSync(projectsDir)) {
    const filesInProjects = fs.readdirSync(projectsDir).map(f => path.join(projectsDir, f));
    for (const file of filesInProjects) {
      if (fs.statSync(file).isFile()) {
        await processImage(file);
      }
    }
  }

  console.log('✅ Image optimization complete!');
}

run().catch(err => {
  console.error('Error optimizing images:', err);
  process.exit(1);
});
