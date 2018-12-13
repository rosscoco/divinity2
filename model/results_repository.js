class RecipeResultsRepository {
	constructor(dao) {
		this.dao = dao;
	}

	createTable() {
		const sql = `
		CREATE TABLE IF NOT EXISTS recipe_results (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            recipe_id VARCHAR(255) NOT NULL,
            result VARCHAR(255));`;

		return this.dao.run(sql);
	}

	deleteTable() {
		const sql = 'DROP TABLE IF EXISTS recipe_results;';
		return this.dao.run(sql);
	}

	getById(id) {
		return this.dao.get(
			'SELECT * FROM recipe_results WHERE id= ?',
			[id]
		);
	}

	create(recipeResultData) {
		const { result, recipeId } = recipeResultData;
		return this.dao.run(`
			INSERT INTO recipe_results VALUES (?,?,?)`,
		[null, result, recipeId]);
	}

	delete(id) {
		return this.dao.run(
			'DELETE from recipe_results WHERE id = ?',
			[id]
		);
	}
}

export default RecipeResultsRepository;
