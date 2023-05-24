#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const encodeHLSVideo_1 = __importDefault(require("./utils/encodeHLSVideo"));
async function encode_hls_video() {
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
        if (outputHeights.length === 0 ||
            outputHeights.find((value) => isNaN(value))) {
            throw '[param 3] output heights not valid';
        }
        (0, encodeHLSVideo_1.default)(videoFile, gallerySlug, outputHeights);
    }
    catch (error) {
        console.error('error:', error);
    }
}
encode_hls_video();
