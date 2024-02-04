#!/usr/bin/env node

import { program } from 'commander';
import { checkStatus, gitInfo, listCommits } from '../src/commands/index.js';
import createLogger from '../src/utils/logger.js';
import chalk from 'chalk';
import figlet from 'figlet';
const logger = createLogger('git-dashboard');

// Stylish header for the CLI tool
const header = chalk.blue
    .bold(figlet.textSync('Github Dashboard', {
        font: 'Poison',
        horizontalLayout: 'default',
        verticalLayout: 'default',
    }));
const header2 = chalk.blue
    .bold(figlet.textSync('By Arnav Jaiswal', {
        font: 'Thick',
        horizontalLayout: 'default',
        verticalLayout: 'default',
    }));

program
    .version('1.0.0')
    .description('A Git dashboard for managing repositories from the command line');

program
    .command('git-info')
    .description('Git Repo Info')
    .action(async () => {
        try {
            await gitInfo();
        } catch (error) {
            logger.warning('An error occurred:', error.message);
        }
    });

program
    .command('check-status')
    .description('Check the Git repository status')
    .action(async () => {
        try {
            await checkStatus();
        } catch (error) {
            logger.warning('An error occurred:', error.message);
        }
    });

program
    .command('list-commits')
    .description('List the latest commits')
    .action(async () => {
        try {
            await listCommits();
        } catch (error) {
            logger.warning('An error occurred:', error.message);
        }
    });

// Display the stylish header before parsing
console.log(header);
console.log(header2);

program.parse(process.argv);
