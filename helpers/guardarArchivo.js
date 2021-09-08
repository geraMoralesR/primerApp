const fs = require('fs');

//guardar archivo
const archivo = './db/data.json';

const guardarDb = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data));
}
//leer archivo
const leerDB = () => {
    if (!fs.existsSync(archivo)) {
        return null;
    }

    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    const data = JSON.parse(info);
    console.log(data);

    return data;
}

module.exports = {
    guardarDb,
    leerDB
}