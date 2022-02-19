#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
// temporary script

async function run() {
	const files = fs.readdirSync('.', { encoding: 'utf-8' });
	let i = 1;
	for (const file of files) {
		const ext = path.extname(file).toLowerCase();
		const indexOf = file.indexOf('wishing-table');
		if (indexOf === 0) {
			//if (ext === '.jpeg' || ext === '.jpg') {
			console.log(
				`${process.argv[2]}-${String(i).padStart(2, '0')}-${
					process.argv[3]
				}.jpg`
			);
			fs.renameSync(
				file,
				`wishing-table-${String(i).padStart(2, '0')}-01.jpg`
			);
			i += 1;
		}
	}
}

run();
