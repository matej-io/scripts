#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import exec from './utils/exec.js';
import kebabCase from 'kebab-case';
import sharp from 'sharp';

async function prepareGallery() {
	try {
		const gallerySlug = process.argv[2];
		const galleryCamel = kebabCase.reverse(gallerySlug);
		const galleryTitle = process.argv[3];
		const thumbIndex = parseInt(process.argv[4]) || 0;
		if (!gallerySlug) {
			throw 'gallery slug not specified';
		}
		if (!galleryTitle) {
			throw 'gallery slug not specified';
		}
		const res = await exec(`resize_images.js 1280 1280 none ${gallerySlug}`);
		console.log(res);
		const data = {
			id: gallerySlug,
			title: galleryTitle,
			caption: 'Art Installation, Layerjeva Hiša, Kranj, Slovenia, 2019',
			info: 'A four-part walkthrough exhibition. Yin & Yang installation welcomed visitors to explore new options; the Rainbow Pyramid reminded them of the much needed tolerance in the society; then they were invited to dissolve their wishes in the salty Ocean of Unfulfilled Dreams and, finally, to recall the warm summertime feeling through macro photography and poetry from The Green Blue book.',
			thumbnail: `https://media.zenplus.uk/miranda/projects/${gallerySlug}/thumb.jpg`,
			pageHref: `art/${gallerySlug}`,
			bgColor: '#44608C',
			slides: [],
		};
		const lines = res.split('\n').filter((line) => line && true);
		let i = 0;
		for (const line of lines) {
			const image = await sharp(line);
			const meta = await image.metadata();
			data.slides.push({
				image: `https://media.zenplus.uk/miranda/projects/${line}`,
				width: meta.width,
				height: meta.height,
				caption: '',
			});
			if (i === thumbIndex) {
				const outFile = path.join(gallerySlug, 'thumb.jpg');
				await sharp(line)
					.resize(512, 512, { fit: 'cover' })
					.jpeg({ quality: 80 })
					.toFile(outFile);
				console.log(outFile);
			}
			i += 1;
		}
		let outStr = `import { ArtProject } from '.';

const ${galleryCamel}: ArtProject = ${JSON.stringify(data, null, '\t')};

export default ${galleryCamel};
`;
		fs.writeFileSync(`${galleryCamel}.ts`, outStr);
		console.log(`${galleryCamel}.ts`);
	} catch (error) {
		console.error('error:', error);
	}
}

prepareGallery();
