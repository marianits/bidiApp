const Usuario = require('../Models/Usuario');

//resolvers
const resolvers = {
    Query: {
        obtenerCurso: () => 'Algún valor que quieras!'
    },
    Mutation: {
        nuevoUsuario: async (_,{ input } ) => {
            console.log(input);
            const { email } = input;
            //Revisar si el Usuario está registrado
            const existeUsuario = await Usuario.findOne({email});
            if(existeUsuario){
                throw new Error(`El usuario con ese correo ${email} ya fue registrado`)
            }
            //Guardarlo en la Base de Datos
            try {
                const usuario = new Usuario(input);
                await usuario.save();
                return usuario;
            } catch (error){
                console.log(error);
            }
            return "Creando usuario....";
        }
    }

}

module.exports = resolvers;