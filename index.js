const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);


// creating the array of questions

function promptUser(){
    return inquirer.prompt([
        {   type: "input",
             massage: "tittle",
            name: "what is the name of this project"
            
        },
        {   type: "input",
            name: "Description of this project",
            massage: "Description"
        },
        {   type: "input",
            name: "what are the installation instructions of this project? write N/A if none",
            massage: "installation"
        },
        {   type: "input",
            name: "how is this application used?",
            massage: "usage"
        },
        {   type: "input",
            name: "list the contibutors on this project, write N/A if non",
            massage: "contributors"
        },
        {   type: "input",
            name: "what are the test instructions",
            massage: "test"
        },
        {   type: "checkbox",
            name: "select a license",
            choices: [
                "Apache",
                "MIT",
                "ISC",
                "GNU GPLv3"
            ],
            massage: "license"
        },
        {   type: "input",
            massage: "whose credit is this work",
            name: "credits"
        },
        {   type: "input",
            name: "what is your github user name",
            massage: "username"
        },
        {   type: "input",
            name: "what is your email",
            massage: "email"
        }
    ]);
}

function generateMarkdown(response){
    return`

# ${response.tittle}

# Table of Content

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributors](#contributors)
- [Test](#test)
- [Credits](#credits)
- [License](#license)
- [Questions](#questions)

## Description:
![License](https://img.shield.io/badge/License-${response.license}-blue.svg)

     ${response.description}

## Installation:
      
      ${response.installation}

##Usage:
      ${response.usage}

 ##Contributors:
      ${response.contributors}


##Test:
      ${response.test}

##Credits:
      ${response.credits}

##License:
      ${response.license}

    for more clientInformation,click on the link bellow to find out more 

    [License](https://opensource.org/License-${response.license})
      
      
 ##Questions:
 
    for more questions about this applicationCache, visite my Github page at 

    [Github Profile](https://github.com/${response.username})

    for additional questions,you can reach me at my email at: ${response.email}`
      
}

// initializinf function

async function init(){

    try{
        const response = await promptUser();

        const readme = generateMarkdown(response);

        await writeFileAsync("README.md", readme);
        console.log("success");

    } catch (err) {
        console.log(err);
    }

}

// call to initialize program

init();