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
      message: "what is the name of this project"
    },
    {
      type: "input",
      message: "Give a brief description of this project",
      name: "Description"
    },
    {
      type: "input",
      message: "what where your motivations for this project",
      name: "motivations"
    },
    {
      type: "input",
      message:"what are the installation instructions of this project? write N/A if none and, some dependences used.",
      name: "installation"
    },
    { type: "input", 
    message: "how is this application used?",
    name: "usage"
},
    {
      type: "input",
      message: "list the contibutors on this project, write N/A if non",
      name: "contributors"
    },
    { type: "input",
     message: "what are the test instructions",
      name: "test"
     },
    {
      type: "checkbox",
      message: "select a license or write N/A if non is chosen",
      choices: [ 
          "BSD",
          "Apache", 
          "MIT", 
          "ISC", 
          "GNU GPLv3",
          "GPLv2"
        ],
      name: "license"
    },
    { type: "input", 
      message: "whose credit is this work", 
      name: "credits"
    },
    {
      type: "input",
      message: "what is your github user name",
      name: "username"
    },
    { type: "input",
     message: "what is your email",
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
- [Sample video](#sample video)
- [Questions](#questions)

## Description:

![License](https://img.shield.io/badge/License-${response.license}-blue.svg)

     ${response.description}

## Installation/dependences:

      the installation of this app most go along with the following dependencies, make sure all dependences are 
      properly installed
       
      
      ${response.installation}
      

## Usage:

      ${response.usage}

 ## Contributors:

      ${response.contributors}


## Test:

      ${response.test}

## Credits:

      ${response.credits}

## License:

      ${response.license}

    for more Information concerning the licences,click on the link bellow 

    [License](https://opensource.org/licenses/${response.license})
      
## sample video:
        
      [sample video](https://drive.google.com/file/d/1Hb4Q0FAgZCQk3EvjurTol8C64Ctc4w5x/view)

 ## Questions:

    if you are confuse about something on this application, you are free to contact me in person
    if not still satisfied,you can create an issue at github issues too.
    for more questions about this application, you can visite my Github page at 

    [Github Profile](https://github.com/${response.username}) or,

    for additional questions,you can reach me at: ${response.email}`;
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
