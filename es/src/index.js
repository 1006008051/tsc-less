#! /usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { program } from 'commander';
import { resolve } from 'path';
import { globbySync } from 'globby';
import slash from 'slash';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { codeToCSS } from './codeToCSS.js';
import { lessToCSS } from './lessToCSS.js';
program.version('0.0.1').option('-i, --in <path>', 'input root path').option('-o, --out <path>', 'output root path').option('-v, --verbose', 'output logs');
program.on('--help', () => {
    console.log(`
  You can add the following commands to npm scripts:
 ------------------------------------------------------
  "compile": "tsc-less -i packages -o dist"
 ------------------------------------------------------
`);
});
program.parse(process.argv);
const { in: input } = program.opts();
const { out } = program.opts();
if (!input) {
    throw new Error('--in must be specified');
}
if (!out) {
    throw new Error('--out must be specified');
}
const inRoot = resolve(process.cwd(), input);
const outRoot = resolve(process.cwd(), out);
console.log(`tsc-less --in ${inRoot} --out ${outRoot}`);
const outPath = slash(`${outRoot}/**/!(*.d).{ts,tsx,js,jsx}`);
const outFilesPath = globbySync(outPath, { dot: true });
const outFiles = outFilesPath.map((x) => resolve(x));
const outFilesLen = outFiles.length;
for (let i = 0; i < outFilesLen; i += 1) {
    let file = outFiles[i];
    let content = readFileSync(file, 'utf-8');
    let res = codeToCSS(content);
    if (res) {
        console.log(`${file}: replaced .less to .css`);
        writeFileSync(file, res, 'utf8');
    }
}
const inPath = slash(`${inRoot}/**/*.less`);
const inFilesPath = globbySync(inPath, { dot: true });
const inFiles = inFilesPath.map((x) => resolve(x));
const inFilesLen = inFiles.length;
(() => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < inFilesLen; i += 1) {
        let file = inFiles[i];
        let content = readFileSync(file, 'utf-8');
        let css = yield lessToCSS(content);
        let toPath = file.replace(inRoot, outRoot);
        try {
            let pathArr = toPath.split('\\').slice(0, -1);
            let _path = pathArr.join('\\');
            if (!existsSync(_path)) {
                _path = '';
                for (let i = 0; i < pathArr.length; i++) {
                    _path += `${pathArr[i]}\\`;
                    if (!existsSync(_path))
                        mkdirSync(_path);
                }
            }
        }
        catch (err) { }
        toPath = toPath.replace('.less', '.css');
        console.log(`${file}: copied to ${toPath}`);
        writeFileSync(toPath, css, 'utf-8');
    }
    ;
}))();
