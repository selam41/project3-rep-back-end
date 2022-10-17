module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define("course", {
   
    courseNumber: {
      type: Sequelize.STRING
    },
    
    houre: {
      type: Sequelize.INTEGER
    },
    level: {
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.TEXT
    },
    description: {
      type: Sequelize.TEXT
    },

  });
  return Course;
};
