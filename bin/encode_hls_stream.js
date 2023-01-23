#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import encodeHLSStream from './utils/encodeHLSStream';
function encode_hls_stream() {
    return __awaiter(this, void 0, void 0, function* () {
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
            yield encodeHLSStream(videoFile, gallerySlug, outputHeight);
        }
        catch (error) {
            console.error('error:', error);
        }
    });
}
encode_hls_stream();
