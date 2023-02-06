require('colors');

const { 
    inquirerMenu, 
    pause,
    readInput,
    listTaskToDelete,
    confirm,
    listTaskToChangeStatus
 } = require('./helpers/inquirer');
const { saveDb, readDb } = require('./helpers/saveFile');

const Tasks = require('./models/tasks');


// const { showMenu, pause } = require('./helpers/messages');

const main = async() => {
    console.clear();

    let opt = '';
    const tasks = new Tasks();

    const dataDb = readDb();

    if(dataDb){
        tasks.loadTasksFromArray(dataDb);
    }

    do{
        opt = await inquirerMenu();
                
        
        switch (opt) {
            case '1':
                // Crear task
                const desc = await readInput('Task description: ');
                tasks.createTask( desc );
            break;
            
            case '2': 
                tasks.listAllTasks();
            break;

            case '3':
                tasks.listPendingOrCompletedTasks(true);
            break;
            case '4':
                tasks.listPendingOrCompletedTasks(false);
            break;

            case '5':
                const ids = await listTaskToChangeStatus( tasks.listArr );

                tasks.toggleCompleted( ids );

            break;
            case '6':
                const id  = await listTaskToDelete( tasks.listArr )

                if( id !== '0' ){
                    const confirmDeletion = await confirm(`Confirm that you want to delete: ${ tasks._list[id].desc }  `);
    
                    if ( confirmDeletion ) {
                        tasks.deleteTask( id );
                        console.log('Tarea Borrada');
                    }
                }
            break;
        }

        saveDb( tasks.listArr );

        await pause();

    }while(opt != '0');


}


main();