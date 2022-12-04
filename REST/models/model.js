import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";


const User = sequelize.define('user', {
id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey:true
},
name:{
    type: DataTypes.STRING,
    allowNull: false
},
surname:{
    type: DataTypes.STRING,
    allowNull: false
},
email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
        isEmail: true
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
        {timestamps: false,
            createdAt: false,
            updatedAt: false});

            
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
date:{
    type: DataTypes.DATE
},

},
{
    timestamps: false,
    createdAt: false,
    updatedAt: false
});



User.hasMany(Folder);
User.hasMany(Note);

Folder.belongsTo(User);
Folder.hasMany(Note);

Note.belongsTo(Folder);
Note.hasMany(User);

export { 
    User, Folder, Note 
}

