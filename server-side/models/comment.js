module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define('comment', {
      comment: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('now()')
      },
    }, {
      timestamps: false,  // 생성일을 Sequelize가 자동으로 생성하지 말라는 옵션 
      underscored: true,   // Snake Case를 권장한다는 옵션
    });
  }