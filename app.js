const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
let employees = [];

//Set the initial prompts equal to a function so I could use recursion should the user wish to add a new employee
const newEmployee = function() { inquirer.prompt([
    {
        type: "input",
        message: "What is your name?",
        name: "name"
    },
    {
        type: "list",
        choices: ["Manager", "Intern", "Engineer"],
        message: "What type of employee are you?",
        name: "employee"
    },
    {
        type: "input",
        message: "What is your id number?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your email?",
        name: "email"
    }
]).then(function(response){
    if (response.employee === "Manager")
    {
        inquirer.prompt([
            {
                type: "input",
                message: "What is your office number?",
                name: "officeNumber"
            }
        ]).then(function(response2){
            //Makes a new manager object with the previous answers
            const manager = new Manager(response.name, response.id, response.email, response2.officeNumber);
            //Adds the manager object to the employees array
            employees.push(manager);
            inquirer.prompt([
                {
                    type: "list",
                    message: "Do you want to add another employee?",
                    choices: ["Yes", "No"],
                    name: "another"
                }
            ]).then(function(response3){
                if (response3.another === "Yes")
                {
                    //Send back to first question.
                    newEmployee();
                }
                else
                {
                    //Writes the end-result index.html file with the full set of employees.
                    fs.writeFile("index.html", render(employees), function(err){
                        if (err) {
                                return console.log(err);
                                  }
                    });
                }
            })
        })
    }
    if (response.employee === "Intern")
    {
        inquirer.prompt([
            {
                type: "input",
                message: "What school do you go to?",
                name: "school"
            }
        ]).then(function(response2){
            const intern = new Intern(response.name, response.id, response.email, response2.school);
            employees.push(intern);
            inquirer.prompt([
                {
                    type: "list",
                    message: "Do you want to add another employee?",
                    choices: ["Yes", "No"],
                    name: "another"
                }
            ]).then(function(response3){
                if (response3.another === "Yes")
                {
                    newEmployee();
                }
                else
                {
                    fs.writeFile("index.html", render(employees), function(err){
                            if (err) {
                            return console.log(err);
                            }
                    });
                }
            })
        })
    }
    if (response.employee === "Engineer")
    {
        inquirer.prompt([
            {
                type: "input",
                message: "What is the URL of your GitHub account?",
                name: "github"
            }
        ]).then(function(response2){
            const engineer = new Engineer(response.name, response.id, response.email, response2.github);
            employees.push(engineer);
            inquirer.prompt([
                {
                    type: "list",
                    message: "Do you want to add another employee?",
                    choices: ["Yes", "No"],
                    name: "another"
                }
            ]).then(function(response3){
                    if (response3.another === "Yes")
                {
                    newEmployee();
                }
                else
                {
                    fs.writeFile("index.html", render(employees), function(err){
                        if (err) {
                                return console.log(err);
                                }
                    });
                }
            })
        })
    }
})
}

newEmployee();