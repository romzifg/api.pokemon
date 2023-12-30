'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MyPokemon extends Model {
        static associate(models) {
        }
    }
    MyPokemon.init({
        my_pokemon_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        pokemon_id: {
            type: DataTypes.INTEGER,
        },
        my_pokemon_name: {
            type: DataTypes.STRING,
        },
        total_rename: {
            type: DataTypes.INTEGER,
        },
        user_id: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    }, {
        sequelize,
        modelName: 'MyPokemon',
        tableName: 'my_pokemon'
    });
    return MyPokemon;
};