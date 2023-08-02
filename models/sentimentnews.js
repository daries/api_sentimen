'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sentimentnews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Sentimentnews.init({
    url: {
      type:DataTypes.STRING,
      unique : true
    },
    isi: DataTypes.STRING,
    tanggal: DataTypes.DATE,
    sentimen: DataTypes.STRING,
    skor: DataTypes.NUMBER,
    sumber: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sentimentnews',
  });
  return Sentimentnews;
};