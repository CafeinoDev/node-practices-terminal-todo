const inquirer = require('inquirer');
require('colors');

const menuOpts = [
    {
        type: 'list',
        name: 'option',
        message: 'Select an option',
        choices: ['opt1', 'opt2', 'opt3']
    }
]


const inquirerMenu = async() => {
    
    console.clear()

    console.log( '=============='.green );
    console.log( '==== Menu ===='.green );
    console.log( '==============\n'.green );

    const opt = await inquirer.prompt(menuOpts);

    return opt;
}

module.exports = {
    inquirerMenu
}