return class validatorResponse{

    constructor(validates){
        this.__validates = validates;
    }

    exists(){

        var colums = Object.keys(this.__validates);

        if(!colums.length){
            return false;
        }

        return true;
    }

    get(){
        return this.__validates;
    }
};