const { gql } = require('apollo-server');

const typeDefs = gql `
    type Usuario {
        id: ID
        nombre: String
        apellido: String
        email: String
        creado: String
        token: String
    }
    type Categoria {
        id: ID
        nombre: String
        descripcion: String
    },
    type Autor {
        id: ID
        nombre: String
        apellidos: String
        email: String
        biografia: String
    },
    type Token {
        token: String
    },
    input inputAutor {
        nombre: String
        apellidos: String
        email: String
        biografia: String
    }
    input inputCategoria {
        nombre: String!
        descripcion: String
    }
    input inputUsuario {
        nombre: String
        apellido: String
        email: String
        password: String
        confirmPassword: String
    }
    input inputAutenticar {
        email: String,
        password: String
    }
    type Query {
        obtenerUsuario(token: String): Usuario
        #Productos
        obtenerCategoria: [Categoria]
        obtenerAutor: [Autor]
    }    
    type Mutation {
        #usuarios
        nuevoUsuario(input: inputUsuario): Usuario
        autenticarUsuario(input: inputAutenticar): Usuario
        #categorias
        nuevaCategoria(input: inputCategoria): Categoria
        #autores
        nuevoAutor(input: inputAutor): Autor
    }
`;

module.exports = typeDefs;
