const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';         // 개발용 환경 설정
const config = require('../config/config.json')[env];      // Sequelize 설정 파일
const db = {};

// Sequelize 인스턴스화
const sequelize = new Sequelize(config.database, config.username, config.password, config);  

db.Sequelize = Sequelize;  // db객체에 Sequelize 패키지 넣기
db.sequelize = sequelize;  // db객체에 Sequelize 인스턴스 넣기

db.User = require('./user')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);

db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id'});   // 사용자는 여러개의 댓글을 가질 수 있음
db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' }); // 작성자가 한명임

module.exports = db;  // 모듈화