const Usuario = require('../Models/Usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config({path:'variables.env'});

const crearToken = (usuario, firma_secreta, expiresIn) => {
    const {id, email, nombre, apellido} = usuario;
    return jwt.sign({id, email, nombre, apellido}, firma_secreta, {expiresIn});
}
//resolvers
const resolvers = {
    Query: {
      obtenerUsuario: async (_,{ token } ) => {
        //returns all the object (user)
          const usuarioId = await jwt.verify(token, process.env.FIRMA_SECRETA);
          return usuarioId;
        }
    },
    Mutation: {
        nuevoUsuario: async (_,{ input } ) => {
            console.log(input);
            const { email, password } = input;

            //Revisar si el Usuario está registrado
            const existeUsuario = await Usuario.findOne({email});
            if(existeUsuario){
                throw new Error(`El usuario con ese correo ${email} ya fue registrado`)
            }

            //Hashear Password
            const salt = await bcryptjs.genSaltSync(10);
            input.password = await bcryptjs.hash(password, salt);

            //Guardarlo en la Base de Datos
            try {
                const usuario = new Usuario(input);
                await usuario.save();
                return usuario;
            } catch (error){
                console.log(error);
            }
            return "Usuario Creado....";
        },
        autenticarUsuario: async (_,{input} ) => {
            console.log(input);
            const {email, password} = input;
            //Verificar si el usuario existe
            const existeUsuario = await Usuario.findOne({email});
            console.log("Existe el Usuario sus datos: ", existeUsuario);
            if (!existeUsuario){
                throw new Error(`El usuario con ese email ${email} no existe.`);
            }
            //Revisar si el password es correcto
            const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);
            if (!passwordCorrecto){
                throw new Error('El password es incorrecto!');
            }
            //Crear el Token
            return {
                token:crearToken(existeUsuario, process.env.FIRMA_SECRETA,300000)
            }
        }
    }

}
module.exports = resolvers;