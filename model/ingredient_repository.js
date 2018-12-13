class IngredientRepository {
	constructor(dao) {
		this.dao = dao;
	}

	createTable() {
		const sql = `
		CREATE TABLE IF NOT EXISTS ingredients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            item_id VARCHAR(255) NOT NULL,
            from_recipe_id INTEGER NOT NULL,
            amount INTEGER DEFAULT 1,
            ingredient_type VARCHAR(255) NOT NULL);`;

		return this.dao.run(sql);
	}

	deleteTable() {
		const sql = 'DROP TABLE IF EXISTS ingredients;';
		return this.dao.run(sql);
	}

	getById(id) {
		return this.dao.get(
			'SELECT * FROM ingredients WHERE id= ?',
			[id]
		);
	}

	create(ingredientData) {
		const { itemId, recipeId, amount, type } = ingredientData;
		return this.dao.run(`
			INSERT INTO ingredients VALUES (?,?,?,?,?)`,
		[null, itemId, recipeId, amount, type]);
	}

	delete(id) {
		return this.dao.run(
			'DELETE from ingredients WHERE id = ?',
			[id]
		);
	}
}

export default IngredientRepository;
