import fs from 'fs';
import AppDAO from './dao';
import ItemRepository from './model/item_repository';

const path = require('path');

const db = new AppDAO('./db.sqlite');

const itemRepo = new ItemRepository(db);


function createItems() {
	const allItems = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'ItemStatsMerged.json')), 'utf-8');
	itemRepo.createTable()
		.then(() => {
			allItems.forEach((item) => {
				itemRepo.create(item);
			});
		});
}

createItems();
