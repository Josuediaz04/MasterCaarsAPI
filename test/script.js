const fs = require('fs');

// Lee el contenido del archivo CSV
const archivo_csv = 'data.csv';
const contenido = fs.readFileSync(archivo_csv, 'utf-8');

// Divide el contenido en líneas y obtiene los correos electrónicos
const lineas = contenido.split('\n');
const correos = lineas.map(linea => linea.split(',')[3]);

// Elimina duplicados y genera correos únicos para los duplicados
const correosUnicos = [...new Set(correos)];
const correosDuplicados = correos.filter((correo, index) => correos.indexOf(correo) !== index);

correosDuplicados.forEach((correoDuplicado, index) => {
    let nuevoCorreo = correoDuplicado;
    let count = index;
    
        nuevoCorreo = nuevoCorreo.split('@')
        nuevoCorreo = `${nuevoCorreo[0]}_${count}@gmail.com`;
    
    correosUnicos.push(nuevoCorreo);
    
});

// Reemplaza los correos duplicados en las líneas originales
lineas.forEach((linea, index) => {
    const correo = linea.split(',')[3];
    if (correosDuplicados.includes(correo)) {
        lineas[index] = linea.replace(correo, correosUnicos.shift());
    }
});

console.log(lineas.join('\n'));
// Crea un nuevo archivo CSV con correos únicos
const nuevoArchivoCsv = 'users.csv';
fs.writeFileSync(nuevoArchivoCsv, lineas.join('\n'), 'utf-8');

console.log('Correos duplicados eliminados y nuevos correos generados para duplicados.');
