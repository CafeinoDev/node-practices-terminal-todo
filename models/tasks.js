const Task = require('./task');

require('colors');

class Tasks {

    _list = {};

    get listArr() {
        const list = [];

        Object.keys(this._list).forEach( key => {
            list.push( this._list[key] );
        } )

        return list;
    }


    constructor() {
        this._list = {};
    }


    loadTasksFromArray( tasks = [] ) {
        
        tasks.forEach( task => {
            this._list[ task.id ] = task;
        } )

    }

    filterTasks(completed) {
        return this.listArr.filter(task => (completed ? task.dtCompleted : !task.dtCompleted));
    }

    printTask(task, i) {
        console.log(`${(i + 1 + ':').green} ${task.desc} :: ${task.dtCompleted ? 'Completed'.green : 'Pending'.red}`);
    }

    listAllTasks() {
        this.listArr.forEach((task, i) => {
            this.printTask(task, i);
        });
    }

    listPendingOrCompletedTasks(completed = true) {
        this.filterTasks(completed).forEach((task, i) => {
            this.printTask(task, i);
        });
    }


    createTask( desc = '' ) {
        const task = new Task( desc );
        this._list[task.id] = task;
    }


    deleteTask( id = '' ) {
        if( this._list[id] ){
            delete this._list[id]
        }
    }

    toggleCompleted( ids = [] ){
        ids.forEach( id => {
            const task = this._list[id];

            if( !task.dtCompleted ){
                task.dtCompleted = new Date().toISOString();
            }
        } )

        this.listArr.forEach( task => {
            if( !ids.includes(task.id) ){
                this._list[task.id].dtCompleted = null;
            }
        })
    }

}

module.exports = Tasks;