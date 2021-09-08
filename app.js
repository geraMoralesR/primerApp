require('colors');

const { guardarDb, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput,
    listadoBorrarTarea, comfirmar,
listadoPendientes } = require('./helpers/inquirer');
const Tareas = require('./model/tareas');

console.clear();

const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const TareasDB = leerDB();
    //cargar tareas
    if (TareasDB) {
        tareas.cargarTareasFromArray(TareasDB);
    }



    do {
        //imprimir el menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;
            //lista el menu de tareas desde tareas
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientes();
                break;
            case '4':
                tareas.listarPendientes(false);
                break;
            case '5':
                const ids = await listadoPendientes(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;

            case '6':
                //TODO: Preguntar si esta seguro

                const id = await listadoBorrarTarea(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await comfirmar('Estas seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                    }
                    break;
                }

        }

        //guardar las tareas que se van generando
        guardarDb(tareas.listadoArr);

        await pausa();


    } while (opt !== '0');

}

main();