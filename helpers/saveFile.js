const fs = require('fs');

const filename = './db/data.json'

const saveDb = ( data ) => {


    fs.writeFileSync( filename, JSON.stringify(data) );

}


const readDb = () => {
    if( !fs.existsSync(filename) ){
        return null;
    }

    const data = fs.readFileSync( filename, { encoding: 'utf-8' } ) ;

    return JSON.parse(data);
}

module.exports = {
    saveDb,
    readDb
}