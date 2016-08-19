'use strict'

import {Employee} from './employee';

class EmployeeWithFixedPayment extends Employee{
    constructor(employee){
        super(employee);
        this.typePayment = "fixed";
    }
};

export {EmployeeWithFixedPayment};
