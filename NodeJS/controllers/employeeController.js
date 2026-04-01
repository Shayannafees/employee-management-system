const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const mongoose = require('mongoose');


var {Employee} = require('../models/employee');



router.get('/', async (req, res) => {
    try {
        const docs = await Employee.find();
        res.send(docs);
    } catch (err) {
        console.log('Error in retreiving employees: '+ err);
        res.status(500).send(err);
    }   
});


router.get('/:id', async (req, res) => {
    const {id} = req.params;
    
    //validating objectid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: `No record with given id: ${id}`
        });
    }
    try {
        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }
        res.status(200).json(employee);
    } catch (error) {
        console.error("Error retreiving employee: ", error);
        res.status(500).json({
            message: "Server error"
        });
    }
});
 

router.post('/', async (req, res) => {
    try {
        var emp = new Employee({            // creating a new employee object in memory. (not saved yet)
            name: req.body.name,
            position: req.body.position,
            office: req.body.office,
            salary: req.body.salary
        });

        const savedEmployee = await emp.save(); //telling mongodb Please store this in database and wait until done.
        res.status(201).send(savedEmployee);        //201 means successfully created

    } catch (err) {
        console.log("Error in employee Save: " + err);
        res.status(400).send(err);
    }
})


router.put('/:id', async (req,res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).json({
            message: `No record found for id: ${id}`
        });
    
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {new: true});
        if (!updatedEmployee) return res.status(404).json({message: "Employee not found"});
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(500).json({message: error.message});
    }

})

router.delete('/:id', async (req,res)=> {
    const {id} = req.params;
    //validate id
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).json({
            message: `No record found for id: ${id}`
        });
    

    try {
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) return res.status(404).json({
            message: "Employee not found"
        });
        res.status(200).json({message: 'Employee deleted successfully'});
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})

module.exports = router;