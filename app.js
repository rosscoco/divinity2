import DAO from './dao';

const db = new DAO('./db.sqlite');

const createItemStats = `CREATE TABLE IF NOT EXISTS ItemStats (
    id VARCHAR(255) PRIMARY KEY NOT NULL, 
    name VARCHAR(255) NOT NULL, 
    displayName VARCHAR(255) NOT NULL, 
    parent VARCHAR(255) NULL, 
    rootTemplate VARCHAR(255) NULL, 
    value INTEGER NULL, 
    weight INTEGER NULL, 
    comboCategory VARCHAR(255) NULL,
    isConsumable VARCHAR(255) NULL,
    itemGroup VARCHAR(255) NULL,
    previewIcon VARCHAR(255) NULL,
    previewTooltip VARCHAR(255));`;


db.run(createItemStats)
	.then((result) => {
		console.log(result);
	});
// .error((err) => {
// 	console.log(err);
// });
