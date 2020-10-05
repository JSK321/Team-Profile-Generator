var Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, gitHubUsername)
    {
        super(name, id, email);
        this.role = "Engineer";
        this.github = gitHubUsername;
    }
    getGithub() {
        return this.github;
    }
}

module.exports = Engineer;