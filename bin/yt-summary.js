#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const process_1 = require("process");
const text = fs_1.default.readFileSync(0, 'utf-8');
const regex = /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/;
const match = text.match(regex);
if (!match) {
    console.log('not found');
    (0, process_1.exit)(1);
}
const jsonStr = match[1];
const json = JSON.parse(jsonStr);
let textToRead = json.props.pageProps.summary.title + '\n\n';
const roolups = json.props.pageProps.summary.rollups;
for (const key in roolups) {
    textToRead += roolups[key].summary + '\n\n';
    const chlds = roolups[key].children;
    for (const key2 in chlds) {
        textToRead += chlds[key2] + '\n\n';
    }
}
console.log(textToRead);
