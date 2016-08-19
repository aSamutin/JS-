'use strict'

import {Employee} from './employee';

class EmployeeWithTimePayment extends Employee{
    constructor(employee){
        super(employee);
        this.typePayment = "time";
    }
    getPayment(){
        return 20.8 * 8 * this.rate;
    }
};

export {EmployeeWithTimePayment};
