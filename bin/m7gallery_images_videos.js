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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const kebab_case_1 = __importDefault(require("kebab-case"));
const sharp_1 = __importDefault(require("sharp"));
const generateVideoThumbnail_1 = __importDefault(require("./utils/generateVideoThumbnail"));
const encodeHLSVideo_1 = __importDefault(require("./utils/encodeHLSVideo"));
const tosource_1 = __importDefault(require("tosource"));
const getVideoProps_1 = __importDefault(require("./utils/getVideoProps"));
function prepareGallery() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const gallerySlug = process.argv[2];
            const galleryCamel = kebab_case_1.default.reverse(gallerySlug);
            const galleryTitle = process.argv[3];
            const thumbIndex = parseInt(process.argv[4]) || 0;
            if (!gallerySlug) {
                throw 'gallery slug not specified';
            }
            if (!galleryTitle) {
                throw 'gallery slug not specified';
            }
            const data = {
                id: gallerySlug,
                title: galleryTitle,
                caption: 'Installation or exhibition, Place, City, Country, Year',
                info: 'Longer description of the event',
                thumbnail: `https://media.zenplus.uk/miranda/projects/${gallerySlug}/thumb.jpg`,
                pageHref: `art/${gallerySlug}`,
                bgColor: '#44608C',
                slides: [],
            };
            if (!fs_1.default.existsSync(gallerySlug) ||
                !fs_1.default.lstatSync(gallerySlug).isDirectory) {
                fs_1.default.mkdirSync(gallerySlug);
            }
            const files = fs_1.default.readdirSync('.');
            let i = 0;
            for (const file of files) {
                const ext = path_1.default.extname(file).toLowerCase();
                const parsed = path_1.default.parse(file);
                if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
                    const outFile = path_1.default.join(gallerySlug, `${parsed.name}.jpg`);
                    yield (0, sharp_1.default)(file)
                        .resize(1280, 1280, { fit: 'inside' })
                        .jpeg({ quality: 80 })
                        .toFile(outFile);
                    const image = (0, sharp_1.default)(outFile);
                    const meta = yield image.metadata();
                    data.slides.push({
                        image: `https://media.zenplus.uk/miranda/projects/${outFile}`,
                        width: meta.width,
                        height: meta.height,
                        caption: '',
                    });
                    if (i === thumbIndex) {
                        const thumbOutFile = path_1.default.join(gallerySlug, 'thumb.jpg');
                        yield (0, sharp_1.default)(outFile)
                            .resize(512, 512, { fit: 'cover' })
                            .jpeg({ quality: 80 })
                            .toFile(thumbOutFile);
                        console.log(thumbOutFile);
                    }
                    i += 1;
                    console.log(outFile);
                }
                else if (ext === '.mp4' || ext === '.m4v' || ext === '.mov') {
                    const videoTrackProps = yield (0, getVideoProps_1.default)(file);
                    const w = videoTrackProps.width;
                    const h = videoTrackProps.height;
                    if (!w || !h) {
                        throw 'missing video dimensions';
                    }
                    const resolutions = [240, 360, 576];
                    if (h > 576) {
                        resolutions.push(720);
                    }
                    if (h > 720) {
                        resolutions.push(1080);
                    }
                    console.log('encoding video', file, '...');
                    const { videoFile } = yield (0, encodeHLSVideo_1.default)(file, gallerySlug, resolutions);
                    const thumbPath = path_1.default.join(gallerySlug, parsed.name, 'thumb.jpg');
                    yield (0, generateVideoThumbnail_1.default)(file, thumbPath);
                    data.slides.push({
                        video: `https://media.zenplus.uk/miranda/projects/${videoFile}`,
                        width: w,
                        height: h,
                        thumb: `https://media.zenplus.uk/miranda/projects/${thumbPath}`,
                        caption: '',
                    });
                    i += 1;
                }
            }
            const tsSource = (0, tosource_1.default)(data, undefined, '\t');
            let outStr = `import { ArtProject } from '.';

const ${galleryCamel}: ArtProject = ${tsSource};

export default ${galleryCamel};
`;
            fs_1.default.writeFileSync(`${galleryCamel}.ts`, outStr);
            console.log(`${galleryCamel}.ts`);
        }
        catch (error) {
            console.error('error:', error);
        }
    });
}
prepareGallery();
