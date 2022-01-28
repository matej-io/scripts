#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { exit } from 'process';
import sharp from 'sharp';

async function convertFiles() {
	try {
		const width = parseInt(process.argv[2]);
		const height = parseInt(process.argv[3]);
		const classSlug = process.argv[4];
		const exportFolder = process.argv[5];
		if (!width || !height) {
			throw 'enclosing width and/or height not specified';
		}
		if (!classSlug) {
			throw 'class slug not specified';
		}
		if (!exportFolder) {
			throw 'export folder not specified';
		}
		if (
			!fs.existsSync(exportFolder) ||
			!fs.lstatSync(exportFolder).isDirectory
		) {
			fs.mkdirSync(exportFolder);
		}
		const files = fs.readdirSync('.');
		let numFiles = 0;
		for (const file of files) {
			const ext = path.extname(file).toLowerCase();
			if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
				const parsed = path.parse(file);
				const outFile = path.join(
					exportFolder,
					`${parsed.name}${
						classSlug === 'none' ? '' : `-${classSlug}`
					}.jpg`
				);
				await sharp(file)
					.resize(width, height, { fit: 'inside' })
					.jpeg({ quality: 80 })
					.toFile(outFile);
				numFiles += 1;
				console.log(outFile);
			}
		}
		// if (numFiles > 0) {
		// 	console.log(
		// 		`${numFiles} successfuly converted to '${exportFolder}' foder`
		// 	);
		// } else {
		// 	console.log('no image files found (jpeg or png)');
		// }
	} catch (error) {
		console.error('error:', error);
		process.exitCode = 1;
	}
}

convertFiles();
