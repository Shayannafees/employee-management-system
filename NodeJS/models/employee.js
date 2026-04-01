const mongoose = require('mongoose'); // import mongoose library

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    office: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Employee = mongoose.model('Employee', employeeSchema);  //creating model in db for employee

module.exports = { Employee }; // register a model called Employee & connects it to employeeSchema


//this can also be written as module.exports = { Employee: Employee }
// this is called destructuring

//short form for var employeeModel = require('../models/employee');
//var Employee = employeeModel.Employee;
//is
// var {Employee} = require('../models/employee')
