'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('markdown', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            contenHTML: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },
            contenMardown: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },
            desscription: {
                allowNull: true,
                type: Sequelize.TEXT('long')
            },
            doctorId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            specialtyId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            clinicId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('markdown');
    }
};