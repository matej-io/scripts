"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
function generateVideoThumbnail(videoPath, outPath) {
    return new Promise((resolve, reject) => {
        const ffmpeg = (0, fluent_ffmpeg_1.default)();
        ffmpeg.addInput(videoPath);
        ffmpeg.addOutputOption(`-vf select='eq(n,0)',scale=-1:720`);
        ffmpeg.addOutputOption(`-vframes 1`);
        ffmpeg.addOutput(outPath);
        // ffmpeg.on('start', () => {
        // 	console.log('thumb rendering start');
        // });
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
}
exports.default = generateVideoThumbnail;
