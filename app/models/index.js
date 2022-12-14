const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sections = require("./section.model.js")(sequelize, Sequelize);
db.courses = require("./course.model.js")(sequelize, Sequelize);
db.semesters = require("./semester.model.js")(sequelize, Sequelize);
db.faculitys = require("./faculity.model")(sequelize, Sequelize);
db.rooms = require("./room.model.js")(sequelize, Sequelize);
db.section_times = require("./section_time.model")(sequelize, Sequelize);


//One to Many course and section
db.courses.hasMany(db.sections, { as: "sections" });
db.sections.belongsTo(db.courses, {
  foreignKey: "courseId",
  as: "course",
});
//One to Many semester ands section
db.semesters.hasMany(db.sections, { as: "sections" });
db.sections.belongsTo(db.semesters, {
  foreignKey: "semesterId",
  as: "semester",
});

//One to Many section and faculity
db.sections.hasMany(db.faculitys, { as: "faculitys" });
db.faculitys.belongsTo(db.sections, {
  foreignKey: "sectionId",
  as: "section",
});

db.sections.hasMany(db.section_times, { as: "section_times" });
db.section_times.belongsTo(db.sections, {
  foreignKey: "sectionId",
  as: "section",
});

db.rooms.hasMany(db.section_times, { as: "section_time" });
db.section_times.belongsTo(db.rooms, {
  foreignKey: "roomId",
  as: "room",
});

module.exports = db;
