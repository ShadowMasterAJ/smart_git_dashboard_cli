import chalk from 'chalk';
import simpleGit from 'simple-git';
import Table from 'cli-table';

export default async function listCommits() {
    const git = simpleGit();
    const commits = await git.log();

    if (commits.all) {
        

        console.log(chalk.bold('\nCommits:\n'));
        const table = new Table({
                    head: ['Date', 'Author', 'Message', 'Commit Hash'],
                    style: {
                        head: ['cyan'],
                        border: ['gray'],
                    },
                });

                commits.all.forEach((commit) => {
                    const formattedCommitHash = commit.hash;
                    const formattedDate = commit.date;
                    const formattedAuthor = commit.author_name;
                    const formattedMessage = commit.message;

                    // Add a row to the table
                    table.push([formattedDate, formattedAuthor, formattedMessage, formattedCommitHash]);
                });

                // Print the table
                console.log(table.toString());
    } else {
        console.log(chalk.yellow('No commits found in the repository.'));
    }
}
