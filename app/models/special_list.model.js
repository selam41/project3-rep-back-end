module.exports = (sequelize, Sequelize) => {
    const Special_list = sequelize.define("special_list", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    });

    return Special_list;
  };