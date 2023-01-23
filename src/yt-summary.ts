#!/usr/bin/env node

import fs from 'fs';
import { exit } from 'process';

const text = fs.readFileSync(0, 'utf-8');
const regex =
	/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/;
const match = text.match(regex);
if (!match) {
	console.log('not found');
	exit(1);
}
const jsonStr = match[1];
const json = JSON.parse(jsonStr);
let textToRead = json.props.pageProps.summary.title + '\n\n';
const roolups: { [key: string]: any } = json.props.pageProps.summary.rollups;
for (const key in roolups) {
	textToRead += roolups[key].summary + '\n\n';
	const chlds = roolups[key].children;
	for (const key2 in chlds) {
		textToRead += chlds[key2] + '\n\n';
	}
}
console.log(textToRead);
