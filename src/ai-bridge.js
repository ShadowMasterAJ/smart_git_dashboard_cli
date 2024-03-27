// src/ai_bridge.js

import { spawn } from 'child_process';
import chalk from 'chalk';

const pythonProcess = spawn('python', ['git_dashboard_cli/ai/langchain_handler.py'], { stdio: ['pipe', 'pipe', process.stderr] });

if (!pythonProcess.pid) {
    console.error(chalk.red('Failed to start the Python subprocess. Please check your Python environment and the script path.'));
    process.exit(1);
}

pythonProcess.stdout.on('data', (data) => {
    console.log(`AI: ${data}`);
});

function sendToPython(input) {
    pythonProcess.stdin.write(`${input}\n`);
}

function closePythonProcess() {
    pythonProcess.stdin.end();  // This will end the input stream and allow the Python script to exit
}

export { sendToPython, closePythonProcess };
