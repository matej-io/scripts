var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import path from 'path';
import fs from 'fs';
import encodeHLSStream from './encodeHLSStream';
export default function encodeHLSVideo(videoFile, gallerySlug, outputHeights) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileParsed = path.parse(videoFile);
        const folderName = fileParsed.name;
        let mainM3U8contents = '#EXTM3U\n';
        for (const height of outputHeights) {
            console.log(`encoding video ${folderName} @${height}p`);
            const { bitrate } = yield encodeHLSStream(videoFile, gallerySlug, height);
            console.log('bitrate', bitrate);
            mainM3U8contents += `#EXT-X-STREAM-INF:PROGRAM-ID=1, BANDWIDTH=${bitrate}\n`;
            mainM3U8contents += `${height}_out.m3u8\n`;
        }
        const mainFilePath = path.join(gallerySlug, folderName, `${folderName}.m3u8`);
        fs.writeFileSync(mainFilePath, mainM3U8contents);
        console.log(mainFilePath);
        return { videoFile: mainFilePath };
    });
}
