class TaskRepository {
	constructor(dao) {
		this.dao = dao;
	}

	getById(id) {
		return this.dao.get(
			'SELECT * FROM projects WHERE id= ?',
			[id]
		);
	}

	create(name, description, isComplete, projectId) {
		return this.dao.run(`
			INSERT INTO tasks (name,description,isComplete,projectId) VALUES (?,?,?,?)`,
		[name, description, isComplete, projectId]);
	}

	update(task) {
		const { id, name, description, isComplete, projectId } = task;
		return this.dao.run(
			'UPDATE tasks SET name = ? description = ? isComplete = ? projectId = ? WHERE id = ?',
			[name, description, isComplete, projectId, id]
		);
	}

	createTable() {
		const sql = `
			CREATE TABLE IF NOT EXISTS tasks (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				name TEXT,
				description TEXT,
				isComplete INTEGER DEFAULT 0,
				projectId INTEGER,
				CONSTRAINT tasks_fk_projectId FOREIGN KEY (projectId)
					REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE)`;

		return this.dao.run(sql);
	}

	delete(id) {
		return this.dao.run(
			'DELETE from tasks WHERE id = ?',
			[id]
		);
	}
}

export default TaskRepository;
