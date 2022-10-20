module.exports = (sequelize, Sequelize) => {
    const Special_list = sequelize.define("special_list", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true
      },
    },
    {
      timestamps: false
    });
  
    return Special_list;
  };