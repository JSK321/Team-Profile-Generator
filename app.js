const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
inquirer.prompt([
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
            const manager = new Manager(response.name, response.id, response.email, response2.officeNumber);
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
        })
    }
})

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```