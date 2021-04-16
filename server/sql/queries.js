const selectAllWines = `
    SELECT *
    FROM wines
`
const selectWineByVarietal = (varietal) => {
  return `
        SELECT *
        FROM wines
        WHERE varietal = '${varietal}'
    `
}

const selectWineByVintage = (vintage) => {
  return `
        SELECT *
        FROM wines
        WHERE vintage = '${vintage}'
    `
}

const createWineTable = `
    CREATE TABLE wines (
        id SERIAL,
        name varchar,
        winery varchar,
        vintage varchar,
        price varchar,
        varietal varchar,
        description text,
        image varchar,
        notes text
    );
`
// Used for development purposes
const alterTable = `
    ALTER TABLE wines 
    DROP COLUMN notes;

`
const insertWine = (name, winery, vintage, varietal, price, description, image) => {
  return `
        INSERT INTO wines (name, winery, vintage, varietal, price, description, image)
        VALUES ('${name}', '${winery}', '${vintage}', '${varietal}', '${price}', '${description}', '${image}')
    `
}

const deleteWine = (id) => {
  return `
        DELETE FROM wines WHERE id = ${id}
    `
}

module.exports = {
  selectAllWines,
  createWineTable,
  insertWine,
  alterTable,
  deleteWine,
  selectWineByVarietal,
  selectWineByVintage,
}
