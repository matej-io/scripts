#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const encodeHLSVideo_1 = __importDefault(require("./utils/encodeHLSVideo"));
function encode_hls_video() {
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
    });
}
encode_hls_video();
