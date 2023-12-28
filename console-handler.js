import chalk from "chalk";

export const errorHandler = (error) => {
  console.log(chalk.bgRed.black.bold('Error: ') + chalk.bgBlack.red(error))
}
export const successHandler = (info) => {
  console.log(chalk.green.italic(info))
}
export const infoHandler = (info) => {
  console.log(chalk.bgYellow.black.bold(info))
}
export const logHandler = (info) => {
  console.log(chalk.blueBright.italic(info))
}