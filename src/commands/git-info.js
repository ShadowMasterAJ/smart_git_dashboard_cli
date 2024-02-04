// import chalk from 'chalk';
// import simpleGit from 'simple-git';
// import figlet from 'figlet';

// export default async function gitInfo() {
//     const git = simpleGit();
//     const cyan = chalk.cyan;
//     const yellow = chalk.yellow;
//     const green = chalk.green;
//     const boldBlue = chalk.bold.blue;
//     const red = chalk.red;

//     try {
//         const status = await git.status();
//         const remote = await git.getRemotes(true);

//         // Create a stylish header using figlet
//         const header = boldBlue(figlet.textSync('Git Repo Information', {
//             font: 'Big',
//             horizontalLayout: 'default',
//             verticalLayout: 'default',
//         }));

//         // Branch Info
//         const branchName = cyan(`Branch: `) + yellow(`${status.current}\n`);

//         // Remote Info
//         const remoteCategory = cyan('Remote Info:');
//         const remoteUrl = remote.length > 0 ? yellow(`\nURL: ${remote[0]?.refs.fetch}\n`) : yellow('No remote repository configured.\n');
//         // Commit Info
//         const commitCategory = cyan('Commit Info:');
//         let commitText = '';
//         console.log(status)

//         if (status.ahead > 0 || status.behind > 0) {
//             const info = await git.raw(['show', '-s', '--format=%h%d %s', 'HEAD']);
//             commitText = green(`Last Commit: ${info.trim()}\n`);
//             commitText += yellow('To push your commits to the remote repository, you can use the following command:\n');
//             commitText += yellow('$ git push');
//         } else {
//             commitText = yellow('- No commits in the branch yet.\n');
//             commitText += green('To make your first commit, you can use the following commands:\n');
//             commitText += green('\t$ git add .\n');
//             commitText += green('\t$ git commit -m "Initial commit"\n');
//             commitText += green('\t$ git push -u origin <branch_name>');
//         }

//         console.log(header);
//         console.log(branchName);
//         console.log(`${remoteCategory} ${remoteUrl}`);
//         console.log(commitCategory);
//         console.log(commitText);
//     } catch (error) {
//         console.log(red('Error:', error.message));
//     }
// }

import chalk from 'chalk';
import simpleGit from 'simple-git';
import figlet from 'figlet';
import { checkStatus, listCommits } from './index.js';
import readline from 'readline';

export default async function gitInfo() {
    const git = simpleGit();
    const cyan = chalk.cyan;
    const yellow = chalk.yellow;
    const green = chalk.green;
    const boldBlue = chalk.bold.blue;
    const red = chalk.red;

    try {
        const status = await git.status();
        const remote = await git.getRemotes(true);

        // Create a stylish header using figlet
        const header = boldBlue(figlet.textSync('Git Repo Information', {
            font: 'Big',
            horizontalLayout: 'default',
            verticalLayout: 'default',
        }));

        // Branch Info
        const branchName = cyan(`Branch: `) + yellow(`${status.current}\n`);

        // Remote Info
        const remoteCategory = cyan('Remote Info:');
        const remoteUrl = remote.length > 0 ? yellow(`\nURL: ${remote[0]?.refs.fetch}\n`) : yellow('No remote repository configured.\n');

        // Commit Info
        const commitCategory = cyan('Commit Info:');
        let commitText = '';

        if (status.ahead > 0 || status.behind > 0) {
            const info = await git.raw(['show', '-s', '--format=%h%d %s', 'HEAD']);
            commitText = green(`Last Commit: ${info.trim()}\n`);
            commitText += yellow('To push your commits to the remote repository, you can use the following command:\n');
            commitText += yellow('$ git push');
        } else {
            commitText = yellow('- No commits in the branch yet.\n');
            commitText += green('To make your first commit, you can use the following commands:\n');
            commitText += green('\t$ git add .\n');
            commitText += green('\t$ git commit -m "Initial commit"\n');
            commitText += green('\t$ git push -u origin <branch_name>');
        }

        console.log(header);
        console.log(branchName);
        console.log(`${remoteCategory} ${remoteUrl}`);
        console.log(commitCategory);
        console.log(commitText);

        // Prompt user for more details
        console.log(yellow('\nDo you want to explore more information? (Type the option number):\n'));
        console.log('1. List Commits');
        console.log('2. Check Status');
        // Add more options here for additional features
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Select an option: ', async (option) => {
            if (option === '1') {
                // Call the function to list commits
                // Implement the listCommits function here
                await listCommits();
            } else if (option === '2') {
                // Call the function to check status
                // Implement the checkStatus function here
                await checkStatus();
            } else {
                console.log(red('Invalid option. Please select a valid option.'));
            }
            rl.close();
        });
    } catch (error) {
        console.log(red('Error:', error.message));
    }
}