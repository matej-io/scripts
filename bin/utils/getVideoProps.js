var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Ffmpeg from 'fluent-ffmpeg';
import { promisify } from 'util';
export default function getVideoTrackProps(videoFile) {
    return __awaiter(this, void 0, void 0, function* () {
        const ffprobe = promisify(Ffmpeg.ffprobe);
        const probeData = (yield ffprobe(videoFile));
        const videoStream = probeData.streams.find((stream) => stream.codec_type === 'video');
        if (!videoStream) {
            throw 'missing video stream';
        }
        return videoStream;
    });
}
