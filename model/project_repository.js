
class ProjectRepository {
	constructor(dao) {
		this.dao = dao;
	}

	getById(id) {
		return this.dao.get(
			'SELECT * FROM projects WHERE id= ?',
			[id]
		);
	}

	create(name) {
		return this.dao.run(`
			INSERT INTO projects (name) VALUES (?)`,
		[name]);
	}

	update(project) {
		const { id, name } = project;
		return this.dao.run(
			'UPDATE project SET name = ? WHERE id = ?',
			[name, id]
		);
	}

	createTable() {
		const sql = `
		CREATE TABLE IF NOT EXISTS project (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT)`;
		return this.dao.run(sql);
	}

	delete(id) {
		return this.dao.run(
			'DELETE from projects WHERE id = ?',
			[id]
		);
	}
}

export default ProjectRepository;
