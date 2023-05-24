#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
async function run() {
    console.log('argv', process.argv[2]);
    const names = fs_1.default.readFileSync(process.argv[2], 'utf-8').split('\n');
    let csv = 'id,name\n';
    for (const name of names) {
        csv += `${(0, uuid_1.v4)().replace(/-/g, '')},${name}\n`;
    }
    fs_1.default.writeFileSync(process.argv[3], csv);
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
