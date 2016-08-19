'use strict'

class Employee {
    constructor(employee){
        this.id = employee.id;
        this.first_name = employee.first_name;
        this.last_name = employee.last_name;
        this.job = employee.job;
        this.rate = employee.rate;
    }
    getPayment(){
        return this.rate;
    }
};

export {Employee};
