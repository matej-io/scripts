#!/usr/bin/env node

import Ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import { promisify } from 'util';
import fs from 'fs';
import { exec, execSync } from 'child_process';

async function encodeHLSStream() {
	try {
		const videoFile = process.argv[2];
		if (!videoFile) {
			throw '[param 1] video file not specified';
		}
		const gallerySlug = process.argv[3];
		if (!gallerySlug) {
			throw '[param 2] gallery slug not specified';
		}

		const outputHeights = process.argv[4]
			.split(',')
			.map((value) => parseInt(value));
		if (
			outputHeights.length === 0 ||
			outputHeights.find((value) => isNaN(value))
		) {
			throw '[param 3] output heights not valid';
		}
		const fileParsed = path.parse(videoFile);

		const folderName = fileParsed.name;

		let mainM3U8contents = '#EXTM3U\n';
		for (const height of outputHeights) {
			console.log(`encoding video ${folderName} @${height}p`);
			const result = execSync(
				`encode_hls_stream.js ${videoFile} ${gallerySlug} ${height}`,
				{ encoding: 'utf-8' }
			);
			const lines = result.split('\n');
			const bitrate = parseInt(
				lines[lines.length - 3].replace('stream bitrate: ', '')
			);
			console.log('bitrate', bitrate);
			mainM3U8contents += `#EXT-X-STREAM-INF:PROGRAM-ID=1, BANDWIDTH=${bitrate}\n`;
			mainM3U8contents += `${height}_out.m3u8\n`;
		}
		const mainFilePath = path.join(
			gallerySlug,
			folderName,
			`${folderName}.m3u8`
		);
		fs.writeFileSync(mainFilePath, mainM3U8contents);
	} catch (error) {
		console.error('error:', error);
	}
}

encodeHLSStream();
