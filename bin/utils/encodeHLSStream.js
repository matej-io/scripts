"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const getVideoProps_1 = __importDefault(require("./getVideoProps"));
async function encodeHLSStream(videoFile, gallerySlug, outputHeight) {
    const fileParsed = path_1.default.parse(videoFile);
    const folderName = fileParsed.name;
    const videoTrackProps = await (0, getVideoProps_1.default)(videoFile);
    const inputWidth = videoTrackProps.width;
    const inputHeight = videoTrackProps.height;
    if (!inputWidth || !inputHeight) {
        throw 'missing video dimensions';
    }
    const outputWidth = Math.floor((inputWidth * outputHeight) / inputHeight / 2) * 2;
    const pixelArea = outputWidth * outputHeight;
    // 3500000 is bitrate for 1080p 16:9 video
    const videoBitrate = Math.floor((pixelArea * 3500000) / (1920 * 1080));
    const audioBitrate = videoBitrate > 1000000 ? 128000 : videoBitrate > 500000 ? 96000 : 64000;
    const outputFolder = path_1.default.join(gallerySlug, folderName);
    if (!fs_1.default.existsSync(outputFolder) ||
        !fs_1.default.statSync(outputFolder).isDirectory()) {
        fs_1.default.mkdirSync(outputFolder, { recursive: true });
    }
    const outputPath = path_1.default.join(outputFolder, `${outputHeight}_out.m3u8`);
    await new Promise((resolve, reject) => {
        const ffmpeg = (0, fluent_ffmpeg_1.default)();
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
            resolve(true);
        });
        ffmpeg.run();
    });
    console.log('render complete:', outputPath);
    return {
        outputFolder,
        outputPath,
        videoBitrate,
        audioBitrate,
        bitrate: videoBitrate + audioBitrate,
    };
}
exports.default = encodeHLSStream;
