const { ApolloError } = require('apollo-server-errors');

const Autor = require('../Models/Autor');
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
      obtenerAutor: async () => {
        try {
          const autores = await Autor.find({});
          return autores;
        } catch (error){
          console.log(error);
        }
      },
      obtenerCategorias: async () => {
          try {
            const categorias = await Categoria.find({});
            return categorias;
          } catch (error){
            console.log(error);
          }
      },
      obtenerCategoriaPorID: async (_, { id })=>{
        //Verificar que la categoria existe
        const categoria = await Categoria.findById(id);
        if(!categoria){
            throw new Error(`La categoria con ese ID: ${id},  no existe.`);
        }
        return categoria;
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
            usuario.token = token;

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
        nuevoAutor: async (_, { input })=> {
            try {
                const autor = new Autor(input);
                //Grabar en la Base de Datos
                const  resultado = await autor.save();
                return resultado;
            } catch (error) {
                console.log(error);
            }
        },
        //Categorias
        nuevaCategoria: async (_, { input })=> {
            try {
                const categoria = new Categoria(input);
                //Grabar en la Base de Datos
                const  resultado = await categoria.save();
                return resultado;
            } catch (error) {
                console.log(error);
            }
        },
        editarCategoria: async (_, { id, input }) => {
            //Verificar que la categoria existe.
            let categoria = await Categoria.findById(id);
            if(!categoria){
                throw new Error(`La categoria con ese ID: ${id}, no existe.`);
            }
            //Guardarlo en la Base de Datos
            categoria = await Categoria.findOneAndUpdate({_id: id},input,{new: true});

            return categoria;
        },
        eliminarCategoria: async (_, { id } ) => {
            //Verificar que el categoria existe
            let categoria = await Categoria.findById(id);
            if(!categoria){
                throw new Error(`El categoria con ese ID: ${id},  no existe.`);
            }
            //Eliminarlo de la Base de Datos
            await  Categoria.findOneAndDelete({_id: id});
            return 'Categoria eliminada!!!'
        }

    }
}

module.exports = resolvers;
