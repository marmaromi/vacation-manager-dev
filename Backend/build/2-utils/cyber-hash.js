"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var salt = "MakeMuchBetterPasswords!";
function hash(plainText) {
    if (!plainText)
        return null;
    var hashText = crypto_1.default.createHmac("sha512", salt).update(plainText).digest("hex");
    return hashText;
}
exports.default = hash;
