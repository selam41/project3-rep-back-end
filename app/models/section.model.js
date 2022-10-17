module.exports = (sequelize, Sequelize) => {
  const Section = sequelize.define("section", {
    title: {
      type: Sequelize.STRING,
    },
    number: {
      type: Sequelize.STRING,
    },
  });
  return Section;
};
