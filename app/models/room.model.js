module.exports = (sequelize, Sequelize) => {
  const Room = sequelize.define("room", {
    number: {
      type: Sequelize.STRING,
    },
    capacity: {
      type: Sequelize.INTEGER(11),
    },
  });

  return Room;
};
