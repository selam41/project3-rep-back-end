module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define("room", {
      
      number: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.INTEGER(11)
      }
    });
  
    return Room;
  };