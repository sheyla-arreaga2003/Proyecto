const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

//Creación de Usuario
exports.createUsuario = async (req, res) => {
    try {
        const {
            USU_Correo_Electronico,
            USU_Primer_Nombre,
            USU_Segundo_Nombre,
            USU_Primer_Apellido,
            USU_Password,
            USU_Telefono,
            USU_Fecha_Nacimiento,
            ROL_Rol,
            EST_Estado
        } = req.body;

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(USU_Password, 10);

        // Obtener la fecha actual para USU_Fecha_Creacion
        const USU_Fecha_Creacion = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Ejecutar el procedimiento almacenado usando Sequelize
        await sequelize.query(`
            EXEC INSERTAR_USUARIO 
                @USU_Correo_Electronico = :USU_Correo_Electronico, 
                @USU_Primer_Nombre = :USU_Primer_Nombre, 
                @USU_Segundo_Nombre = :USU_Segundo_Nombre, 
                @USU_Primer_Apellido = :USU_Primer_Apellido, 
                @USU_Password = :USU_Password, 
                @USU_Telefono = :USU_Telefono, 
                @USU_Fecha_Nacimiento = :USU_Fecha_Nacimiento, 
                @USU_Fecha_Creacion = :USU_Fecha_Creacion, 
                @ROL_Rol = :ROL_Rol, 
                @EST_Estado = :EST_Estado
        `, {
            replacements: {
                USU_Correo_Electronico,
                USU_Primer_Nombre,
                USU_Segundo_Nombre,
                USU_Primer_Apellido,
                USU_Password: hashedPassword, // Enviamos la contraseña encriptada
                USU_Telefono,
                USU_Fecha_Nacimiento,
                USU_Fecha_Creacion,
                ROL_Rol,
                EST_Estado
            },
            type: sequelize.QueryTypes.INSERT
        });

        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Obtener todos los usuarios
exports.getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

// Actualizar un usuario existente
exports.updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            USU_Correo_Electronico,
            USU_Primer_Nombre,
            USU_Segundo_Nombre,
            USU_Primer_Apellido,
            USU_Password,
            USU_Telefono,
            USU_Fecha_Nacimiento,
            ROL_Rol,
            EST_Estado
        } = req.body;

        // Encriptar la contraseña si se proporciona
        const hashedPassword = USU_Password ? await bcrypt.hash(USU_Password, 10) : undefined;

        // Ejecutar el procedimiento almacenado usando Sequelize
        const result = await sequelize.query(`
            EXEC ACTUALIZAR_USUARIO 
                @USU_Usuario = :USU_Usuario,
                @USU_Correo_Electronico = :USU_Correo_Electronico,
                @USU_Primer_Nombre = :USU_Primer_Nombre,
                @USU_Segundo_Nombre = :USU_Segundo_Nombre,
                @USU_Primer_Apellido = :USU_Primer_Apellido,
 @USU_Password = :USU_Password,
                @USU_Telefono = :USU_Telefono,
                @USU_Fecha_Nacimiento = :USU_Fecha_Nacimiento,
                @ROL_Rol = :ROL_Rol,
                @EST_Estado = :EST_Estado
        `, {
            replacements: {
                USU_Usuario: id, // ID del usuario que se va a actualizar
                USU_Correo_Electronico,
                USU_Primer_Nombre,
                USU_Segundo_Nombre,
                USU_Primer_Apellido,
                USU_Password: hashedPassword, // Enviamos la contraseña encriptada
                USU_Telefono,
                USU_Fecha_Nacimiento,
                ROL_Rol,
                EST_Estado
            },
            type: sequelize.QueryTypes.UPDATE
        });

        // Comprobar si el procedimiento almacenado afectó alguna fila
        if (result) {
            res.json({ message: 'Usuario actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' + result });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};