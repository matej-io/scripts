#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
async function run() {
    const gallerySlug = process.argv[2];
    const imageSetNo = process.argv[3];
    if (!gallerySlug) {
        throw 'param 1, gallery slug not specified';
    }
    if (!imageSetNo) {
        throw 'param2, image set not specified';
    }
    const thumbDir = path_1.default.join(gallerySlug, 'thumb');
    const previewDir = path_1.default.join(gallerySlug, 'preview');
    const fullDir = path_1.default.join(gallerySlug, 'full');
    if (!fs_1.default.existsSync(gallerySlug) || !fs_1.default.lstatSync(gallerySlug).isDirectory) {
        fs_1.default.mkdirSync(gallerySlug);
    }
    if (!fs_1.default.existsSync(thumbDir) || !fs_1.default.lstatSync(thumbDir).isDirectory) {
        fs_1.default.mkdirSync(thumbDir);
    }
    if (!fs_1.default.existsSync(previewDir) || !fs_1.default.lstatSync(previewDir).isDirectory) {
        fs_1.default.mkdirSync(previewDir);
    }
    if (!fs_1.default.existsSync(fullDir) || !fs_1.default.lstatSync(fullDir).isDirectory) {
        fs_1.default.mkdirSync(fullDir);
    }
    const images = [];
    const files = fs_1.default.readdirSync('.', { encoding: 'utf-8' });
    let i = 1;
    for (const file of files) {
        const ext = path_1.default.extname(file).toLowerCase();
        if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
            const outName = `${process.argv[2]}-${String(i).padStart(2, '0')}-${process.argv[3]}.jpg`;
            const outFile = path_1.default.join(previewDir, outName);
            const outFileFull = path_1.default.join(fullDir, outName);
            const outFileThumb = path_1.default.join(thumbDir, outName);
            await (0, sharp_1.default)(file)
                .resize(1280, 1280, { fit: 'inside' })
                .jpeg({ quality: 80 })
                .toFile(outFile);
            await (0, sharp_1.default)(file)
                .resize(512, 512, { fit: 'inside' })
                .jpeg({ quality: 80 })
                .toFile(outFileThumb);
            await (0, sharp_1.default)(file).jpeg({ quality: 80 }).toFile(outFileFull);
            const image = (0, sharp_1.default)(outFile);
            const meta = await image.metadata();
            images.push({
                name: outName,
                width: meta.width,
                height: meta.height,
            });
            console.log(outName);
            i += 1;
        }
    }
    console.log(JSON.stringify(images, undefined, '\t'));
}
run();
