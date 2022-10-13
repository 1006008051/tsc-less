#! /usr/bin/env node
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
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const path_1 = require("path");
const globby_1 = require("globby");
const slash_1 = require("slash");
const fs_1 = require("fs");
const codeToCSS_js_1 = require("./codeToCSS.js");
const lessToCSS_js_1 = require("./lessToCSS.js");
commander_1.program.version('0.0.1').option('-i, --in <path>', 'input root path').option('-o, --out <path>', 'output root path').option('-v, --verbose', 'output logs');
commander_1.program.on('--help', () => {
    console.log(`
  You can add the following commands to npm scripts:
 ------------------------------------------------------
  "compile": "tsc-less -i packages -o dist"
 ------------------------------------------------------
`);
});
commander_1.program.parse(process.argv);
const { in: input } = commander_1.program.opts();
const { out } = commander_1.program.opts();
if (!input) {
    throw new Error('--in must be specified');
}
if (!out) {
    throw new Error('--out must be specified');
}
const inRoot = (0, path_1.resolve)(process.cwd(), input);
const outRoot = (0, path_1.resolve)(process.cwd(), out);
console.log(`tsc-less --in ${inRoot} --out ${outRoot}`);
const outPath = (0, slash_1.default)(`${outRoot}/**/!(*.d).{ts,tsx,js,jsx}`);
const outFilesPath = (0, globby_1.globbySync)(outPath, { dot: true });
const outFiles = outFilesPath.map((x) => (0, path_1.resolve)(x));
const outFilesLen = outFiles.length;
for (let i = 0; i < outFilesLen; i += 1) {
    let file = outFiles[i];
    let content = (0, fs_1.readFileSync)(file, 'utf-8');
    let res = (0, codeToCSS_js_1.codeToCSS)(content);
    if (res) {
        console.log(`${file}: replaced .less to .css`);
        (0, fs_1.writeFileSync)(file, res, 'utf8');
    }
}
const inPath = (0, slash_1.default)(`${inRoot}/**/*.less`);
const inFilesPath = (0, globby_1.globbySync)(inPath, { dot: true });
const inFiles = inFilesPath.map((x) => (0, path_1.resolve)(x));
const inFilesLen = inFiles.length;
(() => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < inFilesLen; i += 1) {
        let file = inFiles[i];
        let content = (0, fs_1.readFileSync)(file, 'utf-8');
        let css = yield (0, lessToCSS_js_1.lessToCSS)(content);
        let toPath = file.replace(inRoot, outRoot);
        try {
            let pathArr = toPath.split('\\').slice(0, -1);
            let _path = pathArr.join('\\');
            if (!(0, fs_1.existsSync)(_path)) {
                _path = '';
                for (let i = 0; i < pathArr.length; i++) {
                    _path += `${pathArr[i]}\\`;
                    if (!(0, fs_1.existsSync)(_path))
                        (0, fs_1.mkdirSync)(_path);
                }
            }
        }
        catch (err) { }
        toPath = toPath.replace('.less', '.css');
        console.log(`${file}: copied to ${toPath}`);
        (0, fs_1.writeFileSync)(toPath, css, 'utf-8');
    }
    ;
}))();
