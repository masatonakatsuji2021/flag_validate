export default class validatorResponse{
    
    __validates = null;

    constructor(validates){
        this.__validates = validates;
    }

    get judge(){

        var colums = Object.keys(this.__validates);

        if(!colums.length){
            return true;
        }

        return false;
    }

    get get(){
        return this.__validates;
    }

};