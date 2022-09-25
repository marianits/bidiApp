const { ApolloError } = require('apollo-server-errors');

const Usuario = require('../Models/Usuario');
const Categoria = require('../Models/Categoria');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config({path:'variables.env'});

const crearToken = (usuario, firma_secreta, expiresIn) => {
    const {id, email} = usuario;
    return jwt.sign({id, email}, firma_secreta, {expiresIn});
}
//resolvers
const resolvers = {
    Query: {
      obtenerUsuario: async (_,{ token } ) => {
        //returns all the object (user)
          const usuarioId = await jwt.verify(token, process.env.FIRMA_SECRETA);
          return usuarioId;
      },
      obtenerCategoria: async () => {
          try {
            const categorias = await Categoria.find({});
            return categorias;
          } catch (error){
            console.log(error);
          }
       }
    },
    Mutation: {
        nuevoUsuario: async (_,{ input } ) => {
            console.log(input);
            const { email, password } = input;
            //Revisar si el Usuario está registrado
            const existeUsuario = await Usuario.findOne({email});
            if(existeUsuario){
                throw new ApolloError(`El usuario con ese correo ${email} ya fue registrado`)
            }

            //Hashear Password
            const salt = await bcryptjs.genSaltSync(10);
            input.password = await bcryptjs.hash(password, salt);

            const usuario = new Usuario(input);
            console.log(usuario._id);
            //Crear token
            const token = crearToken({ id: usuario._id, email, }, process.env.FIRMA_SECRETA,300000)
            usuario.token = token

            //Guardarlo en la Base de Datos
            try {
                await usuario.save();
                return usuario;
            } catch (error){
                console.log(error);
            }
            return "Usuario Creado....";
        },
        autenticarUsuario: async (_,{input} ) => {
            const {email, password} = input;
            //Verificar si el usuario existe
            const existeUsuario = await Usuario.findOne({email});
            if (!existeUsuario){
                throw new ApolloError(`El usuario con ese email ${email} no existe.`);
            }
            //Revisar si el password es correcto
            const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);
            if (!passwordCorrecto){
                throw new ApolloError('El password es incorrecto!');
            }

           //Crear token
            existeUsuario.token = crearToken(existeUsuario, process.env.FIRMA_SECRETA,300000);

            return {
             id: existeUsuario.id,
             ...existeUsuario._doc
            }
        },
        nuevaCategoria: async (_, { input })=> {
            try {
                const categoria = new Categoria(input);
                //Grabar en la Base de Datos
                const  resultado = await categoria.save();
                return resultado;
            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = resolvers;
