/*
 * Copy this file to ./sscce.js
 * Add code from issue
 * npm run sscce-{dialect}
 */

var Sequelize = require('./index');
var sequelize = require('./test/support').createSequelizeInstance();
//The Students , Depts, StudentDepts Employee Models are in Individual files
//which are loaded by index.js through   app.set('models', require('./models'));

  var Students = sequelize.define('Students', {
        Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Students',
                key: 'Id'
            }
        },
        Name: {
            type: 'NCHAR',
            allowNull: true
        }
    },
        { timestamps: false },
        { tableName: 'Students' },
        {
            classMethods: {
                associate: function (models) {
                    Students.belongsToMany(models.Depts,
                        { foreignKey: 'StudentId', through: models.StudentDepts, unique: false });
                }
            }
        }
    );
   var Depts = sequelize.define('Depts', {
        Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            classMethods: {
                associate: function (models) {

                    Depts.hasMany(models.Employees, {
                        foreignKey: 'DeptId'
                    });
                    Depts.belongsToMany(models.Students, {
                        foreignKey: 'DeptId',
                        through: models.StudentDepts,
                        unique: false
                    });
                }

            },
            timestamps: false
        },
        {
            tableName: 'Depts'
        }

    );
    
    var StudentDepts =  sequelize.define('StudentDepts', {
		StudentId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Students',
				key: 'Id'
			}
		},
		DeptId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Depts',
				key: 'Id'
			}
		}
    },
        { timestamps: false },
        {
		tableName: 'StudentDepts'
        });
        
    var Employees = sequelize.define('Employees', {
        Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DeptId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    Employees.belongsTo(models.Depts);
                }
            },
            timestamps: false
        },

        {
            tableName: 'Employees'
        }
    );
    
    
  Depts.findAll({ raw: true, include: models.Students }).then(function (data) {
    console.log(data);
  
});

Students.findAll({ raw: true, include: models.Depts }).then(function (data) {
    console.log(data);
  
});
