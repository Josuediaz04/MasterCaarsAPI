const bcrypt = require('bcrypt');

const password = "admin2023";

bcrypt.hash(password, 10)
    .then(hash => {
        console.log("Contraseña original:", password);
        console.log("Hash de la contraseña:", hash);
    })
    .catch(error => {
        console.error("Error al generar el hash:", error);
    });