let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to model
let Project = require('../models/project');

//Manage routes
router.get('/', (req, res, next) => {
    Project.find((err, projectList) => {
        if(err){
            return console.error(err);
        }else{
            //console.log(projectList);
            res.render('project/list', {title: 'Project Info', ProjectList: projectList})
        }
    });
});

//to open add project page
router.get('/add', (req, res, next) => {
    res.render('project/add', {title: 'Add Project'})
});

//insert project data into mongoDB collection
router.post('/add', (req, res, next) => {
    //getting data from form
    let newProject = Project({
        "title": req.body.ptitle,
        "description": req.body.pdescription,
        "deadline": req.body.pdeadline
    });

    //insert data into the mongoDB
    Project.create(newProject, (err, Project) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/projects')
        }
    });
});

//Retrieve data from MongoDB and Open it in view (FORM)
router.get('/edit/:id', (req, res, next) => { //so that the url will be localhost:3000/project/edit/projectid
    let id = req.params.id;

    Project.findById(id, (err, projectToEdit) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            //write code to display data in view 
            res.render('project/edit', { title : 'Edit Project', project: projectToEdit})
        }
    });
}); 

//write code to store updated data into MongoDB
router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    let updatedProject = Project({
        "_id": id,
        "title": req.body.ptitle,
        "description": req.body.pdescription,
        "deadline": req.body.pdeadline
    });

    Project.updateOne({_id: id}, updatedProject, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/projects')
        }
    });
});

module.exports = router;