import * as SQLite from 'expo-sqlite'; // npx expo install expo-sqlite
// para instalar:  
//npx expo install expo-sqlite
//https://docs.expo.dev/versions/latest/sdk/sqlite-next/

export async function getDbConnection() {
    const cx = await SQLite.openDatabaseAsync('dbUsuarios.db');
    return cx;
}

export async function createTable() {    
    const query = `CREATE TABLE IF NOT EXISTS tbContatos
        (
            id text not null primary key,
            nome text not null,
            email text not null,
            senha text not null       
        )`;
    var cx = await getDbConnection();
    await cx.execAsync(query);   
    await cx.closeAsync() ;
};

export async function obtemTodosContatos() {

    var retorno = []
    var dbCx = await getDbConnection();
    const registros = await dbCx.getAllAsync('SELECT * FROM tbContatos');
    await dbCx.closeAsync() ;

    for (const registro of registros) {        
        let obj = {
            codigo: registro.id,
            nome: registro.nome,
            email: registro.email,
            senha: registro.senha          
        }
        retorno.push(obj);
    }

    return retorno;
}

export async function adicionaContato(contato) {    
    let dbCx = await getDbConnection();    
    let query = 'insert into tbContatos (id, nome, email, senha) values (?,?,?,?)';
    const result = await dbCx.runAsync(query, [contato.codigo, contato.nome, contato.email, contato.senha]);    
    await dbCx.closeAsync() ;    
    return result.changes == 1;    
}

export async function alteraContato(contato) {
    let dbCx = await getDbConnection();
    let query = 'update tbContatos set nome=?, email=?, senha=? where id=?';
    const result = await dbCx.runAsync(query, [contato.nome, contato.email, contato.senha, contato.codigo]);
    await dbCx.closeAsync() ;
    return result.changes == 1;
}

export async function excluiContato(id) {
    let dbCx = await getDbConnection();
    let query = 'delete from tbContatos where id=?';
    const result = await dbCx.runAsync(query, id);
    await dbCx.closeAsync() ;
    return result.changes == 1;    
}

export async function excluiTodosContatos() {
    let dbCx = await getDbConnection();
    let query = 'delete from tbContatos ';    
    await dbCx.execAsync(query);    
    await dbCx.closeAsync() ;
}