import chalk from 'chalk';

export default function createLogger(name) {
    return {
        log: (...args) => console.log(chalk.bgBlueBright(...args)),
        warning: (...args) => console.log(chalk.yellow(...args)),
        highlight: (...args) => console.log(chalk.bgCyanBright(...args)),
        debug: console.log,
    };
}
