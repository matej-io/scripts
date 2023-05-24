"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const encodeHLSStream_1 = __importDefault(require("./encodeHLSStream"));
async function encodeHLSVideo(videoFile, gallerySlug, outputHeights) {
    const fileParsed = path_1.default.parse(videoFile);
    const folderName = fileParsed.name;
    let mainM3U8contents = '#EXTM3U\n';
    for (const height of outputHeights) {
        console.log(`encoding video ${folderName} @${height}p`);
        const { bitrate } = await (0, encodeHLSStream_1.default)(videoFile, gallerySlug, height);
        console.log('bitrate', bitrate);
        mainM3U8contents += `#EXT-X-STREAM-INF:PROGRAM-ID=1, BANDWIDTH=${bitrate}\n`;
        mainM3U8contents += `${height}_out.m3u8\n`;
    }
    const mainFilePath = path_1.default.join(gallerySlug, folderName, `${folderName}.m3u8`);
    fs_1.default.writeFileSync(mainFilePath, mainM3U8contents);
    console.log(mainFilePath);
    return { videoFile: mainFilePath };
}
exports.default = encodeHLSVideo;
