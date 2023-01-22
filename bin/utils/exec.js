"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function exec(cmd) {
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(cmd, (error, stdout, stderr) => {
            if (error) {
                console.warn(error);
                reject(error);
            }
            else {
                resolve(stdout);
            }
        });
    });
}
exports.default = exec;
