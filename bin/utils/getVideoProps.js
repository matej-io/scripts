"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const util_1 = require("util");
async function getVideoTrackProps(videoFile) {
    const ffprobe = (0, util_1.promisify)(fluent_ffmpeg_1.default.ffprobe);
    const probeData = (await ffprobe(videoFile));
    const videoStream = probeData.streams.find((stream) => stream.codec_type === 'video');
    if (!videoStream) {
        throw 'missing video stream';
    }
    return videoStream;
}
exports.default = getVideoTrackProps;
