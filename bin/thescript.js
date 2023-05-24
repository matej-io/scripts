#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// temporary script
async function run() {
    const files = fs_1.default.readdirSync('.', { encoding: 'utf-8' });
    let i = 1;
    for (const file of files) {
        const ext = path_1.default.extname(file).toLowerCase();
        const indexOf = file.indexOf('wishing-table');
        if (indexOf === 0) {
            //if (ext === '.jpeg' || ext === '.jpg') {
            console.log(`${process.argv[2]}-${String(i).padStart(2, '0')}-${process.argv[3]}.jpg`);
            fs_1.default.renameSync(file, `wishing-table-${String(i).padStart(2, '0')}-01.jpg`);
            i += 1;
        }
    }
}
run();
