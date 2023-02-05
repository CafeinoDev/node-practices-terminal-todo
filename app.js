require('colors');

const { inquirerMenu } = require('./helpers/inquirer');


// const { showMenu, pause } = require('./helpers/messages');

const main = async() => {
    console.clear();

    let opt = '';

    do{
        opt = await inquirerMenu();
        console.log({ opt });
    }while(opt != '0');


}


main();