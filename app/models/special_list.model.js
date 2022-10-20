module.exports = (sequelize, Sequelize) => {
    const SpecialList = sequelize.define("special_list", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true
      },
    },
    {
      timestamps: false
    });
  
    return SpecialList;
  };