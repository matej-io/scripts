#!/usr/bin/env node

import fs from 'fs';
import { v4 as uuid } from 'uuid';

async function run() {
	console.log('argv', process.argv[2]);
	const names = fs.readFileSync(process.argv[2], 'utf-8').split('\n');
	let csv = 'id,name\n';
	for (const name of names) {
		csv += `${uuid().replace(/-/g, '')},${name}\n`;
	}
	fs.writeFileSync(process.argv[3], csv);
}

function isJson(str: string) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}
run();
