import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import moment from 'moment'



const User = sequelize.define('user', {
id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey:true
},
firstName:{
    type: DataTypes.STRING,
    allowNull: false
},
lastName:{
    type: DataTypes.STRING,
    allowNull: false
},
university:{
    type: DataTypes.STRING,
    allowNull: false
},
year:{
    type: DataTypes.STRING,
    allowNull: false
},
email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
        isEmail:{
            msg: 'Invalid email adress'
        },
        isValidEmail(value){
            if(!value.endsWith('@stud.ase.ro')){
                throw Error('Only with institutional account!')
            }
        }
    }
},
password:{
    type: DataTypes.STRING,
    allowNull: false
},
},{timestamps: false,
    createdAt: false,
    updatedAt: false});



const Folder = sequelize.define('folder', {
    id:{
    type:DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey:true
    },
    title:{
    type: DataTypes.STRING,
    allowNull: false
    }},
    {
    timestamps: false,
    createdAt: false,
    updatedAt: false
    }
);

            
const Note = sequelize.define('note', {
id:{
    type:DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey:true
},
title:{
    type: DataTypes.STRING,
    allowNull: false
},
context:{
    type: DataTypes.STRING,
    allowNull: false
},
tag:{
    type: DataTypes.STRING,
    allowNull: false
},
},
{
    timestamps: false,
    createdAt: false,
    updatedAt: false
});


const UserFolder = sequelize.define('UserFolder',{
    tip_stare:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

User.hasMany(Note);
Folder.hasMany(Note);
User.belongsToMany(Folder, { through: 'UserFolder' });
Folder.belongsToMany(User, { through: 'UserFolder' });

export { 
    User, Folder, Note,UserFolder}
