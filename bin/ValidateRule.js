"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidateRule {
    constructor(data) {
        this._data = null;
        this._data = data;
    }
    /**
     * convertArg
     * @param {*} name
     * @returns
     */
    convertArg(name) {
        var res = name;
        if (Array.isArray(name)) {
            var target = name[0];
        }
        else {
            var target = name;
        }
        if (target.toString().substring(0, 1) == "@") {
            var field = target.toString().substring(1);
            res = this._data[field];
        }
        return res;
    }
    /**
     * required
     * @param {*} value
     * @returns
     */
    required(value) {
        if (value) {
            return true;
        }
        return false;
    }
    /**
     * requiredIf
     * @param {*} value
     * @param {*} args
     * @returns
     */
    requiredIf(value, args) {
        if (!this._data[args[0]]) {
            return true;
        }
        if (this._data[args[0]] != args[1]) {
            return true;
        }
        if (value) {
            return true;
        }
        return false;
    }
    /**
     * confirmed
     * @param {*} value
     * @param {*} args
     * @returns
     */
    confirmed(value, args) {
        if (!value) {
            return true;
        }
        if (value == this._data[args[0]]) {
            return true;
        }
        return false;
    }
    /**
     * alphaNumeric
     * @param {*} value
     * @param {*} args
     * @returns
     */
    alphaNumeric(value, args) {
        if (!value) {
            return true;
        }
        if (args.length) {
            var words = this.convertArg(args);
            for (var n = 0; n < words.length; n++) {
                var word = words[n];
                value = value.split(word).join("");
            }
        }
        var reg = "^[a-zA-Z0-9]+$";
        if (this.regex(value, [reg])) {
            return true;
        }
        return false;
    }
    /**
     * numeric
     * @param {*} value
     * @param {*} args
     * @returns
     */
    numeric(value, args) {
        if (!value) {
            return true;
        }
        if (args.length) {
            var words = this.convertArg(args);
            for (var n = 0; n < words.length; n++) {
                var word = words[n];
                value = value.split(word).join("");
            }
        }
        var reg = "^[0-9]+$";
        if (this.regex(value, reg)) {
            return true;
        }
        return false;
    }
    /**
     * length
     * @param {*} value
     * @param {*} args
     * @returns
     */
    length(value, args) {
        if (!value) {
            return true;
        }
        var lengthValue = this.convertArg(args[0]);
        if (value.length == parseInt(lengthValue)) {
            return true;
        }
        return false;
    }
    /**
     * minLength
     * @param {*} value
     * @param {*} args
     * @returns
     */
    minLength(value, args) {
        if (!value) {
            return true;
        }
        var lengthValue = this.convertArg(args[0]);
        if (value.length >= parseInt(lengthValue)) {
            return true;
        }
        return false;
    }
    /**
     * maxLength
     * @param {*} value
     * @param {*} args
     * @returns
     */
    maxLength(value, args) {
        if (!value) {
            return true;
        }
        var lengthValue = this.convertArg(args[0]);
        if (value.length <= parseInt(lengthValue)) {
            return true;
        }
        return false;
    }
    /**
     * betweenLength
     * @param {*} value
     * @param {*} args
     * @returns
     */
    betweenLength(value, args) {
        if (!value) {
            return true;
        }
        var juge1 = this.minLength(value, [args[0]]);
        var juge2 = this.maxLength(value, [args[1]]);
        if (juge1 && juge2) {
            return true;
        }
        return false;
    }
    /**
     * value
     * @param {*} value
     * @param {*} args
     * @returns
     */
    value(value, args) {
        if (!value) {
            return true;
        }
        var targetValue = this.convertArg(args[0]);
        if (value == parseFloat(targetValue)) {
            return true;
        }
        return false;
    }
    /**
     * minValue
     * @param {*} value
     * @param {*} args
     * @returns
     */
    minValue(value, args) {
        if (!value) {
            return true;
        }
        var targetValue = this.convertArg(args[0]);
        if (value >= parseFloat(targetValue)) {
            return true;
        }
        return false;
    }
    /**
     * maxValue
     * @param {*} value
     * @param {*} args
     * @returns
     */
    maxValue(value, args) {
        if (!value) {
            return true;
        }
        var targetValue = this.convertArg(args[0]);
        if (value <= parseFloat(targetValue)) {
            return true;
        }
        return false;
    }
    /**
     * betweenValue
     * @param {*} value
     * @param {*} args
     * @returns
     */
    betweenValue(value, args) {
        if (!value) {
            return true;
        }
        var juge1 = this.minValue(value, [args[0]]);
        var juge2 = this.maxValue(value, [args[1]]);
        if (juge1 && juge2) {
            return true;
        }
        return false;
    }
    /**
     * selectedCount
     * @param {*} values
     * @param {*} args
     * @returns
     */
    selectedCount(values, args) {
        if (!values) {
            return true;
        }
        var targetSelectCount = this.convertArg(args[0]);
        if (values.length == parseInt(targetSelectCount)) {
            return true;
        }
        return false;
    }
    /**
     * minSelectedCount
     * @param {*} values
     * @param {*} args
     * @returns
     */
    minSelectedCount(values, args) {
        if (!values) {
            return true;
        }
        var targetSelectCount = this.convertArg(args[0]);
        if (values.length >= parseInt(targetSelectCount)) {
            return true;
        }
        return false;
    }
    /**
     * maxSelectedCount
     * @param {*} values
     * @param {*} args
     * @returns
     */
    maxSelectedCount(values, args) {
        if (!values) {
            return true;
        }
        var targetSelectCount = this.convertArg(args[0]);
        if (values.length <= parseInt(targetSelectCount)) {
            return true;
        }
        return false;
    }
    /**
     * betweenSelectedCount
     * @param {*} value
     * @param {*} args
     * @returns
     */
    betweenSelectedCount(values, args) {
        if (!values) {
            return true;
        }
        var juge1 = this.minSelectedCount(values, [args[0]]);
        var juge2 = this.maxSelectedCount(values, [args[1]]);
        if (juge1 && juge2) {
            return true;
        }
        return false;
    }
    /**
         * like
         * @param {*} value
         * @param {*} args
         * @returns
         */
    like(value, args) {
        if (!value) {
            return true;
        }
        var targetLike = this.convertArg(args[0]);
        if (value.indexOf(targetLike) > -1) {
            return true;
        }
        return false;
    }
    /**
     * any
     * @param {*} values
     * @param {*} args
     * @returns
     */
    any(values, args) {
        if (!values) {
            return true;
        }
        if (typeof values == "string" ||
            typeof values == "number" ||
            typeof values == "boolean") {
            values = [values];
        }
        var targetAny = this.convertArg(args);
        var juges = false;
        for (var n = 0; n < targetAny.length; n++) {
            for (var n2 = 0; n2 < values.length; n2++) {
                if (targetAny[n] == values[n2]) {
                    juges = true;
                    break;
                }
            }
        }
        return juges;
    }
    /**
     * date
     * @param {*} value
     * @returns
     */
    date(value) {
        if (!value) {
            return true;
        }
        var tims = new Date(value);
        var juges = parseInt(tims.getTime().toString());
        if (juges > 0) {
            return true;
        }
        return false;
    }
    /**
     * minDate
     * @param {*} value
     * @param {*} args
     * @returns
     */
    minDate(value, args) {
        if (!value) {
            return true;
        }
        var tims = new Date(value);
        var target_date = parseInt(tims.getTime().toString());
        var targetDate = this.convertArg(args[0]);
        var tims2 = new Date(targetDate);
        var mindate = parseInt(tims2.getTime().toString());
        if (target_date >= mindate) {
            return true;
        }
        return false;
    }
    /**
     * minDateToday
     * @param {*} value
     * @param {*} args
     * @returns
     */
    minDateToday(value, args) {
        if (!value) {
            return true;
        }
        var tims = new Date(value);
        var target_date = parseInt(tims.getTime().toString());
        var tims2 = new Date();
        tims2.setHours(0);
        tims2.setMinutes(0);
        tims2.setSeconds(0);
        tims2.setMilliseconds(0);
        if (args[0]) {
            var incrementDay = this.convertArg(args[0]);
            tims2.setDate(tims2.getDate() + parseInt(incrementDay));
        }
        var mindate = parseInt(tims2.getTime().toString());
        if (target_date >= mindate) {
            return true;
        }
        return false;
    }
    /**
     * maxDate
     * @param {*} value
     * @param {*} args
     * @returns
     */
    maxDate(value, args) {
        if (!value) {
            return true;
        }
        var tims = new Date(value);
        var target_date = parseInt(tims.getTime().toString());
        var targetDate = this.convertArg(args[0]);
        var tims2 = new Date(targetDate);
        var mindate = parseInt(tims2.getTime().toString());
        if (target_date <= mindate) {
            return true;
        }
        return false;
    }
    /**
     * maxDateToday
     * @param {*} value
     * @param {*} args
     * @returns
     */
    maxDateToday(value, args) {
        if (!value) {
            return true;
        }
        var tims = new Date(value);
        var target_date = parseInt(tims.getTime().toString());
        var tims2 = new Date();
        tims2.setHours(0);
        tims2.setMinutes(0);
        tims2.setSeconds(0);
        tims2.setMilliseconds(0);
        if (args[0]) {
            var incrementDay = this.convertArg(args[0]);
            tims2.setDate(tims2.getDate() + parseInt(incrementDay));
        }
        var mindate = parseInt(tims2.getTime().toString());
        if (target_date <= mindate) {
            return true;
        }
        return false;
    }
    /**
     * betweenDate
     * @param {*} value
     * @param {*} args
     * @returns
     */
    betweenDate(value, args) {
        if (!value) {
            return true;
        }
        var juge1 = this.minDate(value, [args[0]]);
        var juge2 = this.maxDate(value, [args[1]]);
        if (juge1 && juge2) {
            return true;
        }
        return false;
    }
    /**
     * time
     * @param {*} value
     */
    time(value) {
        if (!value) {
            return true;
        }
        var tims = new Date("0000-01-01 " + value);
        var juges = parseInt(tims.getTime().toString());
        if (juges > 0) {
            return true;
        }
        return false;
    }
    /**
     * minTime
     * @param {*} value
     * @param {*} args
     */
    minTime(value, args) {
        if (!value) {
            return true;
        }
        var tims = new Date("0000-01-01 " + value);
        var target_date = parseInt(tims.getTime().toString());
        var targetTime = this.convertArg(args[0]);
        var tims2 = new Date("0000-01-01 " + targetTime);
        var minTime = parseInt(tims2.getTime().toString());
        if (target_date >= minTime) {
            return true;
        }
        return false;
    }
    /**
     * maxTime
     * @param {*} value
     * @param {*} args
     */
    maxTime(value, args) {
        if (!value) {
            return true;
        }
        var tims = new Date("0000-01-01 " + value);
        var target_date = parseInt(tims.getTime().toString());
        var targetTime = this.convertArg(args[0]);
        var tims2 = new Date("0000-01-01 " + targetTime);
        var minTime = parseInt(tims2.getTime().toString());
        if (target_date <= minTime) {
            return true;
        }
        return false;
    }
    /**
     * betweenTime
     * @param {*} value
     * @param {*} args
     */
    betweenTime(value, args) {
        if (!value) {
            return true;
        }
        var juge1 = this.minTime(value, [args[0]]);
        var juge2 = this.maxTime(value, [args[1]]);
        if (juge1 && juge2) {
            return true;
        }
        return false;
    }
    /**
     * isInt
     * @param {*} value
     * @returns
     */
    isInt(value) {
        if (!value) {
            return true;
        }
        if (value[0] == 0) {
            return false;
        }
        if (!isNaN(value)) {
            return true;
        }
        return false;
    }
    /**
     * isBool
     * @param {*} value
     * @returns
     */
    isBool(value) {
        if (!value) {
            return true;
        }
        if (value == 0 || value == 1) {
            return true;
        }
        return false;
    }
    /**
     * isEmail
     * @param {*} value
     * @returns
     */
    isEmail(value) {
        if (!value) {
            return true;
        }
        if (value.match(/^[0-9a-z_./?-]+@([0-9a-z_./?-]+\.)+[0-9a-z-]+$/)) {
            return true;
        }
        return false;
    }
    /**
     * isTel
     * @param {*} value
     * @returns
     */
    isTel(value) {
        if (!value) {
            return true;
        }
        if (value.match(/^[0-9]{2,4}-[0-9]{2,4}-[0-9]{3,4}$/)) {
            return true;
        }
        if (value.match(/^[0-9]{1,15}$/)) {
            return true;
        }
        return false;
    }
    /**
     * isIp
     * @param {*} value
     * @returns
     */
    isIp(value) {
        if (!value) {
            return true;
        }
        if (value.match(/(([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])/)) {
            return true;
        }
        return false;
    }
    /**
     * isUrl
     * @param {*} value
     * @returns
     */
    isUrl(value) {
        if (!value) {
            return true;
        }
        if (value.match(/^(http|https|ftp):\/\/([A-Z0-9][A-Z0-9_-]*(?:\.[A-Z0-9][A-Z0-9_-]*)+):?(\d+)?\/?/i)) {
            return true;
        }
        return false;
    }
    /**
     * regex
     * @param {*} value
     * @param {*} args
     * @returns
     */
    regex(value, args) {
        if (!value) {
            return true;
        }
        var targetRegex = this.convertArg(args[0]);
        if (targetRegex.substring(targetRegex.length - 2) == "/i") {
            targetRegex = targetRegex.substring(0, (targetRegex.length - 2));
        }
        if (targetRegex == "/") {
            targetRegex = targetRegex.substring(1);
        }
        let regExp = new RegExp(targetRegex, "i");
        if (value.match(regExp)) {
            return true;
        }
        return false;
    }
    /**
     * isJpZip
     * @param {*} value
     * @param {*} arg1
     * @param {*} arg2
     * @returns
     */
    isJpZip(value) {
        if (!value) {
            return true;
        }
        if (value.match(/^([0-9]{3}-[0-9]{4})?$|^[0-9]{7}$/)) {
            return true;
        }
        return false;
    }
    /**
     * isJpKatakana
     * @param {*} value
     * @param {*} args
     * @returns
     */
    isJpKatakana(value, args) {
        if (!value) {
            return true;
        }
        if (args.length) {
            var words = this.convertArg(args);
            for (var n = 0; n < words.length; n++) {
                value = value.split(words[n]).join("");
            }
        }
        if (value.match(/^[ァ-ヶー]+$/u)) {
            return true;
        }
        return false;
    }
    /**
     * isJpHiragana
     * @param {*} value
     * @param {*} args
     * @returns
     */
    isJpHiragana(value, args) {
        if (!value) {
            return true;
        }
        if (args.length) {
            var words = this.convertArg(args);
            for (var n = 0; n < words.length; n++) {
                value = value.split(words[n]).join("");
            }
        }
        if (value.match(/^[ぁ-ん]+$/u)) {
            return true;
        }
        return false;
    }
}
exports.default = ValidateRule;
;
