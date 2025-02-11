module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('urls', {
      url_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      url_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isUrl: true }
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    })
    await queryInterface.addIndex('urls', {
      name: 'urls_url_code',
      fields: ['url_code'],
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('urls');
    await queryInterface.removeIndex('urls', 'urls_url_code');
  },
};