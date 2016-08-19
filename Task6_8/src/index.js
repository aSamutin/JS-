'use strict'

import _ from "lodash";
import {saveData} from './saveData';
import {EmployeeWithFixedPayment} from './EmployeeWithFixedPayment';
import {EmployeeWithTimePayment} from './EmployeeWithTimePayment';

var addFile = document.getElementById("myfileinput");
var saveInFile = document.getElementById("save");
var display = document.getElementById('tables');
var employees = [];
var templ = require("ejs!./templates/empTable.ejs");
var templIdTable = require("ejs!./templates/empIdTable.ejs");

addFile.addEventListener('change', function(e){
    var files = e.target.files;
    if (files[0].name.lastIndexOf(".json")!=-1){

        var reader = new FileReader();
        reader.readAsText(files[0]);

        reader.onloadend = function () {
            employees = JSON.parse(reader.result);

      	    for (var i = 0; i < employees.length; i++) {
            		if (employees[i].typePayment =="fixed") {
            		    employees[i] = new EmployeeWithFixedPayment(employees[i]);
            		} else {
            		    employees[i] = new EmployeeWithTimePayment(employees[i]);
            		}
      	    }

      	    let sortEmployees =_.sortBy(employees, function(emp) { return [1/(emp.getPayment()), emp.first_name ]; });

      	    display.innerHTML = templ( {title: "Список работников", employees: sortEmployees});
            display.innerHTML+= templ( {title: "Топ 5 работников", employees: sortEmployees.slice(0,5)});
      	    display.innerHTML+= idTable( {title: "Последние id", employees: sortEmployees.slice(-5)});
        }
    } else {
      alert("Неверный формат файла!!!");
    }
});

saveInFile.addEventListener('click', function(e){
   saveData(employees, 'employees.json');
});
