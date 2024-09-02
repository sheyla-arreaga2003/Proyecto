const sequelize = require("../config/db")

//Crear un Estado
  exports.createEstado = async (req, res) => {
    try {
        const { EST_Nombre } = req.body;

        // Ejecutar el procedimiento almacenado usando Sequelize
        const result = await sequelize.query(`
            EXEC INSERTAR_ESTADO @EST_Nombre = :EST_Nombre
        `, {
            replacements: { EST_Nombre },
            type: sequelize.QueryTypes.INSERT
        });

        res.json({ message: 'Estado creada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  

  //obtener estado
  exports.getEstados = async (req, res) => {
    try {
      const estados = await Estado.findAll();
      res.status(200).json(estados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.getEstadoById = async (req, res) => {
    try {
      const estado = await Estado.findByPk(req.params.id);
      if (estado) {
        res.status(200).json(estado);
      } else {
        res.status(404).json({ message: 'Estado no encontrado' });
    }
} catch (error) {
  res.status(500).json({ error: error.message });
}
};

//actualizar estado
//exports.updateEstado = async (req, res) => {
//try {
  //const estado = await Estado.update(req.body, {
    //where: { EST_Estado: req.params.id }
  //});
  //res.status(200).json(estado);
//} catch (error) {
  //res.status(400).json({ error: error.message });
//}
//};

exports.updateEstado = async (req, res) => {
  try {
      const { id } = req.params;
      const { EST_Nombre } = req.body;

      // Ejecutar el procedimiento almacenado usando Sequelize
      await sequelize.query(`
          EXEC ACTUALIZAR_ESTADO @EST_Estado = :EST_Estado, @EST_Nombre = :EST_Nombre
      `, {
          replacements: { EST_Estado: id, EST_Nombre },
          type: sequelize.QueryTypes.UPDATE
      });

      res.status(200).json({ message: 'Estado actualizado exitosamente' });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

