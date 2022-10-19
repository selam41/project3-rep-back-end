module.exports = (sequelize, Sequelize) => {
  const Section_time = sequelize.define("section_time", {
    inst_methode: {
      type: Sequelize.STRING,
    },
    date_of_weak: {
      type: Sequelize.DATE,
    },
    startDate: {
      type: Sequelize.DATE,
    },
    endDate: {
      type: Sequelize.DATE,
    },
    startTime: {
      type: Sequelize.DATE,
    },
    endTime: {
      type: Sequelize.DATE,
    },
  });
  return Section_time;
};
