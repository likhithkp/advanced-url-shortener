module.exports = (sequelize, DataTypes) => {
    const Urls = sequelize.define('urls', {
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
        },
        url: {
            type: DataTypes.STRING,
            validate: { isUrl: true },
            allowNull: false,
        }
    }, {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [
            { fields: ['url_code'] },
        ],
    });
    return Urls;
};