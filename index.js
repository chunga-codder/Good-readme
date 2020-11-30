const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

// creating the array of questions

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "tittle",
      massage: "what is the name of this project"
    },
    {
      type: "input",
      massage: "Description of this project",
      name: "Description"
    },
    {
      type: "input",
      massage: "what where your motivations for this project",
      name: "motivations"
    },
    {
      type: "input",
      massage:"what are the installation instructions of this project? write N/A if none",
      name: "installation"
    },
    { type: "input", 
    massage: "how is this application used?",
    name: "usage"
},
    {
      type: "input",
      massage: "list the contibutors on this project, write N/A if non",
      name: "contributors"
    },
    { type: "input",
     massage: "what are the test instructions",
      name: "test"
     },
    {
      type: "checkbox",
      massage: "select a license",
      choices: [ 
          "Apache", 
          "MIT", 
          "ISC", 
          "GNU GPLv3"
        ],
      name: "license"
    },
    { type: "input", 
      massage: "whose credit is this work", 
      name: "credits"
    },
    {
      type: "input",
      massage: "what is your github user name",
      name: "username"
    },
    { type: "input",
     massage: "what is your email",
     name: "email" 
    }
  ])
};

function generateMarkdown(response) {
  return `

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

    for more Information concernibg the licences,click on the link bellow 

    [License](https://opensource.org/License-${response.license})
      
      
 ##Questions:
 
    for more questions about this applicationCache, visite my Github page at 

    [Github Profile](https://github.com/${response.username})

    for additional questions,you can reach me at my email at: ${response.email}`;
}

// initializinf function

async function init() {
  try {
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
