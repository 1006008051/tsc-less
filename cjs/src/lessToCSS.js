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
exports.lessToCSS = void 0;
const less = require("less");
const lessToCSS = (str) => __awaiter(void 0, void 0, void 0, function* () {
    let count = 0;
    let content = "";
    try {
        const { css: content } = yield less.render(str, {
            compress: true
        });
        count += 1;
    }
    catch (err) {
    }
    return {
        content,
        count,
    };
});
exports.lessToCSS = lessToCSS;
