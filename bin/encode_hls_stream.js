#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const encodeHLSStream_1 = __importDefault(require("./utils/encodeHLSStream"));
async function encode_hls_stream() {
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
        await (0, encodeHLSStream_1.default)(videoFile, gallerySlug, outputHeight);
    }
    catch (error) {
        console.error('error:', error);
    }
}
encode_hls_stream();
