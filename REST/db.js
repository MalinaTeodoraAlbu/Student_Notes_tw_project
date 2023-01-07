import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./sqlite/notite.db"
});


// sincronizare baza cu models
sequelize.sync({ force: false }).then(() => {
  console.log("All the models have been synchronized");
}); 

export { sequelize };