'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var readline = _interopDefault(require('readline'));

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var dist = createCommonjsModule(function (module, exports) {
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(readline);
class StdinLineStream {
    constructor(stream) {
        let stdin;
        if (stream) {
            stdin = stream;
        }
        else {
            stdin = process.stdin;
        }
        this.rl = readline_1.default.createInterface({
            input: stdin
        });
    }
    async getLine() {
        return new Promise((resolve, reject) => {
            this.rl.on("line", (input) => {
                resolve(input);
            });
        });
    }
    async getLineAsNumbers() {
        const line = await this.getLine();
        const split_whitespace = line.split(/\s+/);
        return split_whitespace.map(num => parseFloat(num));
    }
    close() {
        this.rl.close();
    }
}
exports.StdinLineStream = StdinLineStream;
});

unwrapExports(dist);
var dist_1 = dist.StdinLineStream;

var foregone_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

function foregone(input) {
    let a = "";
    let b = "";
    for (let ch of input) {
        if (ch == "4") {
            a += "2";
            b += "2";
        }
        else {
            a += ch;
            if (b.length > 0) {
                b += "0";
            }
        }
    }
    if (b.length == 0) {
        b = "0";
    }
    return [a, b];
}
// Await for now can only be used inside of functions labeled async.
async function main() {
    let inputStream = new dist.StdinLineStream();
    let [numberOfCases] = await inputStream.getLineAsNumbers();
    for (let i = 1; i < numberOfCases + 1; i++) {
        let n = await inputStream.getLine();
        let [a, b] = foregone(n);
        console.log(`Case #${i}: ${a} ${b}`);
    }
    inputStream.close();
}
main();
});

var foregone = unwrapExports(foregone_1);

module.exports = foregone;
