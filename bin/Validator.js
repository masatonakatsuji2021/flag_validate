const ValidateResponse = use("ValidateResponse");
const ValidateRule = use("ValidateRule");

return class Validator{

    constructor(rules){
        this._rules = {};
        if(rules){
            this._rules = rules;
        }
    }

    beforeValidate(data, rules){}

    #arrayShift(data){
        var result = [];
        for(var n = 1 ; n <data.length ; n++){
            result.push(data[n]);
        }
        return result;
    }

    /**
     * verify
     * @param {*} data 
     * @param {*} rules
     * @param {*} option 
     * @returns 
     */
    verify(data, rules, option){

        this.beforeValidate(data, rules);

        if(!option){
            option = {};
        }

        var targetRules = this._rules;

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
     * addRule
     * @param {*} field 
     * @param {*} rule 
     * @param {*} message 
     * @returns 
     */
    addRule(field, rule, message){
        var Length = 0;
        if(this.rules[field]){
            Length = Object.keys(context.rules[field]).length;
        }

        return this.addRuleWithIndex(Length, field, rule, message);
    }


    /**
     * addRuleWithIndex
     * @param {*} indexName 
     * @param {*} field 
     * @param {*} rule 
     * @param {*} message 
     * @returns 
     */
    addRuleWithIndex(indexName, field, rule, message){

        if(!context.rules){
            context.rules = {};
        }
        if(!context.rules[field]){
            context.rules[field] = {};
        }

        var values = {};
        values.rule = rule;
        if(message){
            values.message = message;
        }

        context.rules[field][indexName] = values;

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
            delete context.rules[field];
        }
        else{
            delete context.rules[field][index];
        }

        return this;
    }

}