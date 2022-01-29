#!/usr/bin/env node

import Ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import { promisify } from 'util';
import fs from 'fs';

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

		const outputHeight = parseInt(process.argv[4]);
		if (!outputHeight) {
			throw '[param 3] output height not specified';
		}
		const fileParsed = path.parse(videoFile);

		const folderName = fileParsed.name;

		const ffprobe = promisify(Ffmpeg.ffprobe);
		const probeData = await ffprobe(videoFile);
		const videoStream = probeData.streams.find(
			(stream) => stream.codec_type === 'video'
		);
		if (!videoStream) {
			throw 'missing video stream';
		}
		const inputWidth = videoStream.width;
		const inputHeight = videoStream.height;
		if (!inputWidth || !inputHeight) {
			throw 'missing video dimensions';
		}

		const outputWidth =
			Math.floor((inputWidth * outputHeight) / inputHeight / 2) * 2;

		const pixelArea = outputWidth * outputHeight;
		// 3500000 is bitrate for 1080p 16:9 video
		const videoBitrate = (pixelArea * 3500000) / (1920 * 1080);
		const audioBitrate =
			videoBitrate > 1000000
				? 128000
				: videoBitrate > 500000
				? 96000
				: 64000;

		const outputFolder = path.join(gallerySlug, folderName);
		if (
			!fs.existsSync(outputFolder) ||
			!fs.statSync(outputFolder).isDirectory()
		) {
			fs.mkdirSync(outputFolder, { recursive: true });
		}
		const outputPath = path.join(outputFolder, `${outputHeight}_out.m3u8`);

		await new Promise((resolve, reject) => {
			const ffmpeg = Ffmpeg();
			ffmpeg.addInput(videoFile);
			ffmpeg.addOutputOption('-c:a aac');
			ffmpeg.addOutputOption('-c:v libx264');
			ffmpeg.addOutputOption(`-b:v ${videoBitrate}`);
			ffmpeg.addOutputOption(`-b:a ${audioBitrate}`);
			ffmpeg.addOutputOption(`-s ${outputWidth}x${outputHeight}`);
			ffmpeg.addOutputOption('-f hls');
			ffmpeg.addOutputOption('-hls_list_size 1000000');
			ffmpeg.addOutputOption('-hls_time 2');

			ffmpeg.addOutput(outputPath);
			ffmpeg.on('start', () => {
				console.log('video render start');
			});
			ffmpeg.on('progress', (progress) => {
				console.log('render progress', JSON.stringify(progress));
			});
			ffmpeg.on('error', (error, stdout, stderr) => {
				console.log('error', error);
				console.log('stdout', stdout);
				console.log('stderr', stderr);
				reject(error);
			});
			ffmpeg.on('end', () => {
				resolve();
			});
			ffmpeg.run();
		});
		console.log('stream bitrate:', videoBitrate + audioBitrate);
		console.log('render complete:', outputPath);
	} catch (error) {
		console.error('error:', error);
	}
}

encodeHLSStream();
