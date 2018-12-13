class RecipeRepository {
	constructor(dao) {
		this.dao = dao;
	}

	createTable() {
		const sql = `
		CREATE TABLE IF NOT EXISTS recipes (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            result VARCHAR(255));`;

		return this.dao.run(sql);
	}

	deleteTable() {
		const sql = 'DROP TABLE IF EXISTS recipes;';
		return this.dao.run(sql);
	}

	getById(id) {
		return this.dao.get(
			'SELECT * FROM recipes WHERE id= ?',
			[id]
		);
	}

	create(recipeData) {
		const { name } = recipeData;
		return this.dao.run(`
			INSERT INTO recipes VALUES (?,?)`,
		[null, name]);
	}

	delete(id) {
		return this.dao.run(
			'DELETE from tasks WHERE id = ?',
			[id]
		);
	}
}

export default RecipeRepository;
