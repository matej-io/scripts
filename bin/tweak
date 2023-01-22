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
const uuid_1 = require("uuid");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('argv', process.argv[2]);
        const names = fs_1.default.readFileSync(process.argv[2], 'utf-8').split('\n');
        let csv = 'id,name\n';
        for (const name of names) {
            csv += `${(0, uuid_1.v4)().replace(/-/g, '')},${name}\n`;
        }
        fs_1.default.writeFileSync(process.argv[3], csv);
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
