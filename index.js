const app = require('./src/app')

app.listen(app.get('port'), ()=>{
    try {
        console.log('el servidor esta corriendo en el puerto ' + app.get('port'));
    } catch (error) {
        console.log('se ha producido un error ' + error);
        
    }
})