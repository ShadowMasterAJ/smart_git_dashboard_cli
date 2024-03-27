// src/commands/start_chatbot.js

import readline from 'readline';
import chalk from 'chalk';
import { sendToPython, closePythonProcess } from './../ai-bridge.js';

// Define the main function that starts the chatbot session
export default function startChatbot() {
    // Greet the user and provide instructions
    console.log(chalk.bold.cyan('AI Chatbot Session'));
    console.log(chalk.yellow('Type your questions about the Git repository and get AI-powered answers.'));
    console.log(chalk.yellow('Type "exit" to end the session.\n'));

    // Set up the readline interface
    const rl = readline.createInterface({
        input: process.stdin,  // Use standard input to read from the command line
        output: process.stdout,  // Use standard output to write to the command line
        prompt: chalk.bold.blue('You> ')  // Set the prompt format
    });

    // Display the prompt to the user
    rl.prompt();

    // Event listener for the 'line' event, which is triggered when the user inputs a line
    rl.on('line', (line) => {
        // Check if the user wants to exit the chatbot
        if (line.trim().toLowerCase() === 'exit') {
            // If so, close the Python process and the readline interface
            console.log(line.trim())
            closePythonProcess();
            rl.close();
        } else {
            console.log(line.trim())
            // Otherwise, send the user's input to the Python subprocess
            sendToPython(line.trim());
            // Prompt the user for more input
            rl.prompt();
        }
    }).on('close', () => {
        // When the readline interface is closed, notify the user
        console.log(chalk.bold('Exiting chatbot...'));
    });
}
