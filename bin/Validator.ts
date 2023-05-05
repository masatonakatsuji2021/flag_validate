import ValidateResponse from "ValidateResponse";
import ValidateRule from "ValidateRule";

/**
 * Validator : 
 * Class used for input data validation checks.
 */
export default class Validator{

    rules = {};

    constructor(rules){
        if(rules){
            this.rules = rules;
        }
    }

    /**
     * beforeValidate : 
     * Event handler executed before validation.
     * @param {object} data Input data
     * @param {object} rules Validation rules
     * @returns {void}
     */
    beforeValidate(data : object, rules : object) : void{}

    #arrayShift(data){
        var result = [];
        for(let n = 1 ; n <data.length ; n++){
            let d : any= data[n];
            result.push(d);
        }
        return result;
    }

    /**
     * verify : 
     * run the validation
     * @param {object} data Input data
     * @returns {ValidateResponse} ValidateResponse Class Object
     */
    verify(data : object) : ValidateResponse;

    /**
     * verify : 
     * run the validation
     * @param {object} data Input data
     * @param {object} rules Validation rule
     * @returns {ValidateResponse} ValidateResponse Class Object
     */
    verify(data : object, rules : object) : ValidateResponse;

    /**
     * verify : 
     * run the validation
     * @param {object} data Input data
     * @param {object} rules Validation rule
     * @param {object} option Validate Option
     * @returns {ValidateResponse} ValidateResponse Class Object
     */
    verify(data : object, rules : object, option: object) : ValidateResponse;

    verify(data, rules = null, option = null) : ValidateResponse{

        this.beforeValidate(data, rules);

        if(!option){
            option = {};
        }

        var targetRules = this.rules;

        if(rules){
            if(typeof rules == "string"){
                if(this[rules]){
                    targetRules = this[rules];
                }
            }
            else{
                targetRules = rules;
            }
        }

        var validateRule = new ValidateRule(data);

        var resBuffer = {};

        var colum = Object.keys(targetRules);
        for(var n = 0 ; n < colum.length ; n++){

            var field = colum[n];
            var r_ = targetRules[field];

            var colum2 = Object.keys(r_);
            for(var n2 = 0 ; n2 < colum2.length ; n2++){

                var ruleField = colum2[n2];
                var rr_ = r_[ruleField];

                var rule = null;

                if(typeof rr_ == "string"){
                    var rr2_ = rr_.split("|");
                    var buff = [];

                    buff.push(rr2_[0]);

                    if(rr2_[1]){
                        var rr22_ = rr2_[1].split(",");
                        for(var n3 = 0 ; n3 < rr22_.length ; n3++){
                            buff.push(rr22_[n3]);
                        }
                    }

                    rule = {
                        rule: buff,
                    };
                }
                else if(typeof rr_ == "function"){

                    rule = {
                        rule: [ rr_ ],
                    };
                }
                else if(typeof rr_ == "object"){

                    if(Array.isArray(rr_)){

                        rule = {
                            rule: rr_,
                        };
                    }
                    else{
                        
                        rule = rr_;
                    }
                }

                var ruleList = rule.rule;

                if(typeof ruleList == "string"){
                    ruleList = [ruleList];
                }
                
                var args = this.#arrayShift(rule.rule);

                var jugement=true;
                if(typeof ruleList[0] === "function"){
                    jugement = ruleList[0](data[field], args);
                }
                else{
                    if(validateRule[ruleList[0]]){
                        jugement = validateRule[ruleList[0]](data[field], args);
                    }
                    else if(this[ruleList[0]]){
                        jugement = this[ruleList[0]](data[field], args);
                    }    
                }

                var message = rule.message;
                if(!message){
                    var ruleStr="";
                    var argStr = "";

                    if(typeof ruleList[0] === "function"){
                        ruleStr = "rule=[FUNCTION]";
                    }
                    else{
                        ruleStr = "rule=" + ruleList[0].toString() + "";
                    }
                    
                    if(args.length){
                        var argStr = " args=[";
                        for(var n3 = 0 ; n3 < args.length ; n3++){
                            if(n3 != 0){
                                argStr += ", ";
                            }
                            argStr += args[n3];
                        }
                        argStr += "]";
                    }

                    message = "index=" + ruleField + ", " + ruleStr + argStr;
                }

                if(!jugement){
                    
                    if(!resBuffer[field]){
                        resBuffer[field]=[];
                    }

                    resBuffer[field].push(message);    
                }
            }
        }

        var response = new ValidateResponse(resBuffer);

        return response;
    }

    /**
     * addRule : 
     * Add validation rules dynamically.
     * @param {string} field Input item name
     * @param {object} rule additional rules
     * @returns {Validator} Validator Class Object (method chain)
     */
    addRule(field : string, rule : object) : Validator;

    /**
     * addRule : 
     * Add validation rules dynamically.
     * @param {string} field Input item name
     * @param {object} rule additional rules
     * @param {string} message Validate Error message
     * @returns {Validator} Validator Class Object (method chain)
     */
    addRule(field : string, rule : object, message : string) : Validator;

    addRule(field : string, rule : object, message = null) : Validator{
        let Length = 0;
        if(this.rules[field]){
            Length = Object.keys(this.rules[field]).length;
        }

        return this.addRuleWithIndex(Length, field, rule, message);
    }

    /**
     * addRuleWithIndex
     * Add validation rule at specified location
     * @param {string | number} indexName index name
     * @param {string} field Input item name
     * @param {object} rule additional rules
     * @returns {Validator} Validator Class Object (method chain)
     */
    addRuleWithIndex(indexName : string | number, field : string, rule : object) : Validator;

    /**
     * addRuleWithIndex
     * Add validation rule at specified location
     * @param {string | number} indexName index name
     * @param {string} field Input item name
     * @param {object} rule additional rules
     * @param {string} message Validate Error message
     * @returns {Validator} Validator Class Object (method chain)
     */
    addRuleWithIndex(indexName : string | number, field : string, rule : object, message : string) : Validator;

    addRuleWithIndex(indexName, field, rule, message = null){

        if(!this.rules){
            this.rules = {};
        }
        if(!this.rules[field]){
            this.rules[field] = {};
        }

        let values : any = {};
        values.rule = rule;
        if(message){
            values.message = message;
        }

        this.rules[field][indexName] = values;

        return this;
    }

    /**
     * deleteRule
     * @param {*} field 
     * @param {*} index 
     * @returns 
     */
    deleteRule(field, index){

        if(index == undefined){
            delete this.rules[field];
        }
        else{
            delete this.rules[field][index];
        }

        return this;
    }

};