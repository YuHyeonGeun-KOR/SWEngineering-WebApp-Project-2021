module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define('user', {
      email: {
        type: DataTypes.STRING(40),    // type : 자료형
        allowNull: false,              // allowNull: NULL이어도 되니?
        unique: true,                  // 고유값 여부 
      },
      nickname: {
        type: DataTypes.STRING(20),    // type : 자료형
        allowNull: false,              // allowNull: NULL이어도 되니?
      },
      password: {
        type: DataTypes.STRING(512),    // type : 자료형
        allowNull: false,              // allowNull: NULL이어도 되니?
      },
      create_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('now()') // 회원이 생길 때 자동으로 날짜가 등록이 됨
      },
    }, {
      timestamps: false,  // 생성일을 Sequelize가 자동으로 생성하지 말라는 옵션 
      underscored: true,   // Snake Case를 권장한다는 옵션
    })
  }
  