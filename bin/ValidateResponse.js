"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class validatorResponse {
    constructor(validates) {
        this.__validates = null;
        this.__validates = validates;
    }
    get judge() {
        var colums = Object.keys(this.__validates);
        if (!colums.length) {
            return true;
        }
        return false;
    }
    get get() {
        return this.__validates;
    }
}
exports.default = validatorResponse;
;
