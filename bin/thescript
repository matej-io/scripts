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
// temporary script
function run() {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
run();
