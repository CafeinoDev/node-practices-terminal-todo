const inquirer = require('inquirer');
require('colors');

const menuOpts = [
    {
        type: 'list',
        name: 'option',
        message: 'Select an option',
        choices: [
            {
                value: '1',
                name: `${ '1.'.green } Create task`
            },
            {
                value: '2',
                name: `${ '2.'.green } List tasks`
            },
            {
                value: '3',
                name: `${ '3.'.green } List completed tasks`
            },
            {
                value: '4',
                name: `${ '4.'.green } List pending tasks`
            },
            {
                value: '5',
                name: `${ '5.'.green } Complete task`
            },
            {
                value: '6',
                name: `${ '6.'.green } Delete dask`
            },
            {
                value: '0',
                name: `${ '0.'.green } Exit`
            },
        ]
    }
]


const inquirerMenu = async() => {
    
    console.clear()

    console.log( '=============='.green );
    console.log( '==== Menu ===='.green );
    console.log( '==============\n'.green );

    const { option } = await inquirer.prompt(menuOpts);

    return option;
}

const pause = async() => {
    return await inquirer.prompt([
        {
            type: 'input',
            name: 'pause',
            message: `Press ${ 'ENTER'.green } to continue`
        }
    ])
}

const readInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Por favor ingrese un valor';
                }

                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question)
    return desc;
}


const listTaskToDelete = async(tasks = []) => {

    const choices = tasks.map( (task, i) => {
        const idx = `${ i + 1}`.green;

        return {
            value: task.id,
            name: `${ idx } ${ task.desc }`
        }
    } )

    choices.unshift({
        value: '0',
        name: '0'.green + ' Cancelar'
    })

    const deleteOpts = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete',
            choices
        }
    ]

    const { id } = await inquirer.prompt(deleteOpts);

    return id;
    
}

const listTaskToChangeStatus = async(tasks = []) => {

    const choices = tasks.map( (task, i) => {
        const idx = `${ i + 1}`.green;

        return {
            value: task.id,
            name: `${ idx } ${ task.desc }`,
            checked: ( task.dtCompleted ) ? true : false
        }
    } )

    const deleteOpts = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(deleteOpts);

    return ids;
    
}

const confirm = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question);

    return ok;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listTaskToDelete,
    listTaskToChangeStatus,
    confirm,
}