'use strict'

class Employee {
    constructor(first_name, last_name, job, rate){
        this.id = Math.round(Math.random()*1000);
        this.first_name = first_name;
        this.last_name = last_name;
        this.job = job;
        this.rate = rate;
    }
    getPayment(){
        if (this.typePayment == "fixed" ) {
            return this.rate;
        } else {
            return 20.8 * 8 * this.rate;
        }
    }
    create (first_name, last_name, job, rate, typePayment){
      if (typePayment == "fixed" ) {
          return new EmployeeWithFixedPayment(first_name, last_name, job, rate);
      } else {
          return new EmployeeWithTimePayment(first_name, last_name, job, rate); 
      }
    }
};

class EmployeeWithFixedPayment extends Employee{
    constructor(first_name, last_name, job, rate){
        super(first_name, last_name, job, rate);
        this.typePayment = "fixed";
    }
};

class EmployeeWithTimePayment extends Employee{
    constructor(first_name, last_name, job, rate){
        super(first_name, last_name, job, rate);
        this.typePayment = "time";

    }
};

export {EmployeeWithFixedPayment, EmployeeWithTimePayment, Employee};
