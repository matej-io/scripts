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
import { v4 as uuid } from 'uuid';
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('argv', process.argv[2]);
        const names = fs.readFileSync(process.argv[2], 'utf-8').split('\n');
        let csv = 'id,name\n';
        for (const name of names) {
            csv += `${uuid().replace(/-/g, '')},${name}\n`;
        }
        fs.writeFileSync(process.argv[3], csv);
    });
}
function isJson(str) {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
}
run();
