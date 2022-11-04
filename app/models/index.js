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

//db.roles = require("../models/role.model.js")(sequelize, Sequelize);
db.sections = require("./section.model")(sequelize, Sequelize);
db.courses = require("./course.model")(sequelize, Sequelize);
db.semesters = require("./semester.model.js")(sequelize, Sequelize);
db.faculitys = require("./faculity.model")(sequelize, Sequelize);
db.rooms = require("./room.model.js")(sequelize, Sequelize);
db.section_times = require("./section_time.model")(sequelize, Sequelize);
db.users = require("./user.model")(sequelize, Sequelize);
db.sessions = require("./session.model.js")(sequelize, Sequelize);

db.special_lists = require("./special_list.model")(sequelize, Sequelize);
// one to many user and role 
// db.roles.hasMany(db.users, { as: "users" });
// db.users.belongsTo(db.roles, {
//   foreignKey: "roleId",
//   as: "role",
// });
//One to Many course and section
db.users.hasMany(db.sessions, { as: 'sessions'}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.sessions.belongsTo(db.users, { as: 'users'}, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.users.hasMany(db.special_lists , { as: "special_lists" });
db.special_lists.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});
db.courses.hasMany(db.special_lists , { as: "special_lists" });
db.special_lists.belongsTo(db.courses, {
  foreignKey: "courseId",
  as: "course",
});


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

//Many to Many 
db.courses.belongsToMany(db.users, {
  through: "special_list",
  as: "course",
  foreignKey: "coursesId",
});

db.users.belongsToMany(db.courses, {
  through: "special_list",
  as: "user",
  foreignKey: "userId",
});


db.semesters.belongsToMany(db.users, {
  through: "office_hours",
  as: "semester",
  foreignKey: "semesterId",
});

db.users.belongsToMany(db.semesters, {
  through: "office_hours",
  as: "users",
  foreignKey: "userId",
});
db.ROLES = ["user", "admin"];
module.exports = db;
