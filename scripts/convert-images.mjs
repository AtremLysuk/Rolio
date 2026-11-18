// Конвертирует все PNG/JPG из public/images в WebP и удаляет оригиналы.
// Запуск: node scripts/convert-images.mjs
import {readdir, stat, unlink} from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = 'public/images';
const QUALITY = 80;

const walk = async (dir) => {
	const entries = await readdir(dir, {withFileTypes: true});
	const files = await Promise.all(
		entries.map((entry) => {
			const fullPath = path.join(dir, entry.name);
			return entry.isDirectory() ? walk(fullPath) : [fullPath];
		})
	);
	return files.flat();
};

const files = (await walk(ROOT)).filter((file) => /\.(png|jpe?g)$/i.test(file));
let before = 0;
let after = 0;

for (const file of files) {
	const output = file.replace(/\.(png|jpe?g)$/i, '.webp');
	await sharp(file).webp({quality: QUALITY}).toFile(output);

	const [src, dest] = await Promise.all([stat(file), stat(output)]);
	before += src.size;
	after += dest.size;
	console.log(`${file}: ${(src.size / 1024).toFixed(0)} KB → ${(dest.size / 1024).toFixed(0)} KB`);

	await unlink(file);
}

console.log(`\nИтого: ${(before / 1024 / 1024).toFixed(2)} MB → ${(after / 1024 / 1024).toFixed(2)} MB`);
