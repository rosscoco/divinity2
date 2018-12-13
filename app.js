import fs from 'fs';
import AppDAO from './dao';
import ItemRepository from './model/item_repository';
import RecipeRepository from './model/recipe_repository';
import IngredientRepository from './model/ingredient_repository';
import ResultRepository from './model/results_repository';
import Logger from './logs/logger';

const path = require('path');

const db = new AppDAO('./db.sqlite');

const itemRepo = new ItemRepository(db);
const recipeRepo = new RecipeRepository(db);
const ingredientRepo = new IngredientRepository(db);
const resultRepo = new ResultRepository(db);
const logger = new Logger();

function dropTables() {
	return itemRepo.deleteTable()
		.then(() => recipeRepo.deleteTable())
		.then(() => ingredientRepo.deleteTable())
		.then(() => resultRepo.deleteTable())
		.catch((err) => {
			logger.error(`Error creating tables ${err}`);
		});
}


function createTables() {
	return dropTables().then(() => itemRepo.createTable())
		.then(() => recipeRepo.createTable())
		.then(() => ingredientRepo.createTable())
		.then(() => resultRepo.createTable())
		.catch((err) => {
			logger.error(`Error creating tables ${err}`);
		});
}


function createItems() {
	const allItems = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'ItemStatsMerged.json')), 'utf-8');
	return itemRepo.bulkCreate(allItems)
		.catch((err) => {
			logger.error(`Could not create all items:${err}`);
		});
}


function createIngredients(recipeId, recipeData) {
	const commands = recipeData.ingredients.map((element, index) => ingredientRepo.create({ itemId: element,
		recipeId,
		amount: 1,
		type: recipeData.ingredientTypes[index] })
		.catch((err) => {
			logger.error(`Error creating ingredient ${element}: ${err}`);
		}));
	return Promise.all(commands);
}

function createRecipeResults(recipeId, recipeData) {
	const commands = recipeData.results.map(element => resultRepo.create({ result: element,
		recipeId })
		.catch((err) => {
			logger.error(`Error creating Recipe result  ${element}:${err}`);
		}));
	return Promise.all(commands);
}

function createRecipes() {
	const allRecipes = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'ItemCombos.json')), 'utf-8');
	// const allRecipes = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'SingleItemCombo.json')), 'utf-8');

	db.run('BEGIN TRANSACTION;')
		.then(() => Promise.all(allRecipes.map((recipe) => {
			const recipeData = recipe;
			return recipeRepo.create(recipe)
				.catch((err) => {
					logger.error(`Could not create recipe ${recipeData.name}. ${err}`);
				})
				.then(results => Promise.all([createIngredients(results.id, recipeData),
					createRecipeResults(results.id, recipeData)]));
		})))
		.then(() => db.run('COMMIT;'));
}

createTables()
	.then(() => createItems())
	.then(() => createRecipes());

// createRecipes();
