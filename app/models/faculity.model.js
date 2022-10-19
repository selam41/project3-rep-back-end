module.exports = (sequelize, Sequelize) => {
  const Faculity = sequelize.define("faculity", {
    name: {
      type: Sequelize.STRING,
    },
  });
  return Faculity;
};
