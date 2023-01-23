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
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const gallerySlug = process.argv[2];
        const imageSetNo = process.argv[3];
        if (!gallerySlug) {
            throw 'param 1, gallery slug not specified';
        }
        if (!imageSetNo) {
            throw 'param2, image set not specified';
        }
        const thumbDir = path.join(gallerySlug, 'thumb');
        const previewDir = path.join(gallerySlug, 'preview');
        const fullDir = path.join(gallerySlug, 'full');
        if (!fs.existsSync(gallerySlug) || !fs.lstatSync(gallerySlug).isDirectory) {
            fs.mkdirSync(gallerySlug);
        }
        if (!fs.existsSync(thumbDir) || !fs.lstatSync(thumbDir).isDirectory) {
            fs.mkdirSync(thumbDir);
        }
        if (!fs.existsSync(previewDir) || !fs.lstatSync(previewDir).isDirectory) {
            fs.mkdirSync(previewDir);
        }
        if (!fs.existsSync(fullDir) || !fs.lstatSync(fullDir).isDirectory) {
            fs.mkdirSync(fullDir);
        }
        const images = [];
        const files = fs.readdirSync('.', { encoding: 'utf-8' });
        let i = 1;
        for (const file of files) {
            const ext = path.extname(file).toLowerCase();
            if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
                const outName = `${process.argv[2]}-${String(i).padStart(2, '0')}-${process.argv[3]}.jpg`;
                const outFile = path.join(previewDir, outName);
                const outFileFull = path.join(fullDir, outName);
                const outFileThumb = path.join(thumbDir, outName);
                yield sharp(file)
                    .resize(1280, 1280, { fit: 'inside' })
                    .jpeg({ quality: 80 })
                    .toFile(outFile);
                yield sharp(file)
                    .resize(512, 512, { fit: 'inside' })
                    .jpeg({ quality: 80 })
                    .toFile(outFileThumb);
                yield sharp(file).jpeg({ quality: 80 }).toFile(outFileFull);
                const image = sharp(outFile);
                const meta = yield image.metadata();
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
    });
}
run();
