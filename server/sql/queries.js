const selectAllWines = `
    SELECT *
    FROM wines
`

const createWineTable = `
    CREATE TABLE wines (
        id SERIAL,
        name varchar,
        winery varchar,
        vintage varchar
    );
`
const insertWine = (name, winery, vintage) => {
    return`
        INSERT INTO wines (${name}, ${winery}, ${vintage})
        VALUES ('Dummy Wine 4', 'Dummy Winery 4', '2016')
    `
}
module.exports = {
    selectAllWines,
    createWineTable,
    insertWine
}