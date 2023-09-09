#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

function getTimestamp() {
    const currentDate = new Date();
    return currentDate.toLocaleTimeString();
}

const introQuestions = [
    {
        type: 'list',
        name: 'process',
        message: 'Welcome to the QuantumSynergy Labs MGUI bot setup. What would you like to do today?',
        choices: [
            {
                name: 'Start discord bot',
                value: 'start'
            },
            {
                name: 'Install bot dependencies',
                value: 'install'
            },
            {
                name: 'Create a new bot',
                value: 'new'
            },
            {
                name: 'Delete current bot',
                value: 'delete'
            },
            {
                name: 'Exit',
                value: 'exit'
            }
        ]
    }
]

const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is your discord bot name?'
    },
    {
        type: 'input',
        name: 'token',
        message: 'What is your discord bot token?'
    },
    {
        type: 'input',
        name: 'clientID',
        message: 'What is your discord bot client ID?'
    },
    {
        type: 'input',
        name: 'devID',
        message: 'What is your discord bot developer user id?'
    },
    {
        type: 'input',
        name: 'mongoURI',
        message: 'What is your mongoDB URI (how to get in our docs)?'
    },
    {
        type: 'input',
        name: 'customerID',
        message: 'What is your customer role id?'
    },
    {
        type: 'input',
        name: 'testServer',
        message: 'What is your test server id?'
    },
    {
        type: 'confirm',
        name: 'confirm',
        message: 'Are the above configurations correct?',
        default: true
    }
];

const __dirname = path.resolve();

console.log(`----------------------------------------------------------------------------------------------------------------------------------------------`);
console.log(`
      ██████╗ ██╗   ██╗ █████╗ ███╗   ██╗████████╗██╗   ██╗███╗   ███╗███████╗██╗   ██╗███╗   ██╗███████╗██████╗  ██████╗██╗   ██╗
     ██╔═══██╗██║   ██║██╔══██╗████╗  ██║╚══██╔══╝██║   ██║████╗ ████║██╔════╝╚██╗ ██╔╝████╗  ██║██╔════╝██╔══██╗██╔════╝╚██╗ ██╔╝
     ██║   ██║██║   ██║███████║██╔██╗ ██║   ██║   ██║   ██║██╔████╔██║███████╗ ╚████╔╝ ██╔██╗ ██║█████╗  ██████╔╝██║  ███╗╚████╔╝ 
     ██║▄▄ ██║██║   ██║██╔══██║██║╚██╗██║   ██║   ██║   ██║██║╚██╔╝██║╚════██║  ╚██╔╝  ██║╚██╗██║██╔══╝  ██╔══██╗██║   ██║ ╚██╔╝  
     ╚██████╔╝╚██████╔╝██║  ██║██║ ╚████║   ██║   ╚██████╔╝██║ ╚═╝ ██║███████║   ██║   ██║ ╚████║███████╗██║  ██║╚██████╔╝  ██║   
      ╚══▀▀═╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝   ╚═╝   
                                                                                                                                  
                                             ██╗      █████╗ ██████╗ ███████╗                                                     
                                             ██║     ██╔══██╗██╔══██╗██╔════╝                                                     
                                             ██║     ███████║██████╔╝███████╗                                                     
                                             ██║     ██╔══██║██╔══██╗╚════██║                                                     
                                             ███████╗██║  ██║██████╔╝███████║                                                     
                                             ╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝                                        
[INFO]: This is the QuantumSynergy Labs MGUI bot setup. This will help you create a new bot, delete a bot, or start a bot.
[SUPPORT]: support@quantumsynergylabs.tech
[DOCS]: https://quantumsynergylabs.tech
[CREDITS]: All rights reserved. QuantumSynergy Labs 2023.
----------------------------------------------------------------------------------------------------------------------------------------------`);
inquirer.prompt(introQuestions).then(async (answers) => {
    if (answers.process === 'start') {
        exec('npm run start', (err, stdout, stderr) => {
            if (err) {
               console.error(`\x1b[31m[${getTimestamp()}][ERROR]:\x1b[0m Error starting the bot`)
            } else {
                console.log(`\x1b[32m[SUCCESS]:\x1b[0m Bot has started successfully.`)
            }
        });
    } else if (answers.process === 'install') {
        exec('npm install', (err, stdout, stderr) => {
            if (err) {
               console.error(`\x1b[31m[${getTimestamp()}][ERROR]:\x1b[0m Error installing dependencies.`)
            } else {
                console.log(`\x1b[32m[SUCCESS]:\x1b[0m Dependencies installed.`)
            }
        });
    } else if (answers.process === 'new') {
        if (fs.existsSync(path.join(__dirname, 'config.json'))) {
            console.log('Configurations already exist. You can start the bot.');
            process.exit(0);
        } else {
            inquirer.prompt(questions).then(answers => {
                if (answers.confirm) {
                    const newConfig = {
                        name: answers.name,
                        token: answers.token,
                        clientID: answers.clientID,
                        devs: answers.devID,
                        mongodb: answers.mongoURI,
                        footerText: "By: QuantumSynergy Labs",
                        footerImage: "https://github.com/QuantumSynergy-Labs.png",
                        customerId: answers.customerID,
                        testServer: answers.testServer
                    };
                    fs.writeFileSync(path.join(__dirname, 'config.json'), JSON.stringify(newConfig, null, 4));

                    // Git clone command
                    const command = `git clone https://github.com/QuantumSynergy-Labs/QuantumBot-MGUI.git`
                    exec(command, (error, stdout, stderr) => {
                        if (error) {
                            console.error(`\x1b[31m[${getTimestamp()}][ERROR]:\x1b[0m Error cloning the repo. Please try again.`);
                        } else {
                            console.log(`\x1b[32m[SUCCESS]:\x1b[0m Repository cloned successfully.`);
                        }
                    })
                    console.log('\x1b[32m[SUCCESS]:\x1b[0m Configurations saved. You can now run the bot.');
                } else {
                    console.log('\x1b[31m[${getTimestamp()}][FAILED]:\x1b[0m Configurations not saved.');
                }
            });
        }
    } else if (answers.process === 'delete') {
        if (fs.existsSync(path.join(__dirname, 'config.json'))) {
            fs.unlinkSync(path.join(__dirname, 'config.json'));
            console.log('\x1b[32m[SUCCESS]:\x1b[0m Configurations deleted. You can now create a new bot.');
        } else {
            console.log('\x1b[31m[${getTimestamp()}][FAILED]:\x1b[0m Configurations do not exist. You can create a new bot.');
        }
    } else if (answers.process === 'exit') {
        process.exit();
    }
});