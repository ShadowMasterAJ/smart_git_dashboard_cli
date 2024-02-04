
import chalk from 'chalk';
import simpleGit from 'simple-git';

export default async function checkStatus() {
    const git = simpleGit();
    const status = await git.status();

    console.log(chalk.bold('Repository Status:\n'));

    if (status.isClean()) {
        console.log(chalk.green('✓ Your working directory is clean.'));
    } else {
        console.log(chalk.red('✗ Your working directory has uncommitted changes.'));
    }

    console.log(chalk.yellow(`Branch: ${status.current}`));
    console.log(chalk.cyan(`Ahead: ${status.ahead}`));
    console.log(chalk.magenta(`Behind: ${status.behind}`));
    console.log(chalk.blue(`Created: ${status.created}`));
}
