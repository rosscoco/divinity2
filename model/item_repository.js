class TaskRepository {
	constructor(dao) {
		this.dao = dao;
		this.rows = ['id', 'name', 'displayName', 'parent', 'rootTemplate', 'value', 'weight', 'comboCategory', 'isConsumable', 'itemGroup', 'previewIcon', 'previewTooltip'];
	}

	createTable() {
		const sql = `
		CREATE TABLE IF NOT EXISTS items (
			id VARCHAR(255) PRIMARY KEY NOT NULL, 
			displayName VARCHAR(255) DEFAULT "Unknown", 
			parent VARCHAR(255) DEFAULT NULL, 
			rootTemplate VARCHAR(255) DEFAULT NULL, 
			value INTEGER DEFAULT 0, 
			weight INTEGER DEFAULT 0, 
			comboCategory VARCHAR(255) DEFAULT NULL,
			isConsumable VARCHAR(255) DEFAULT NULL,
			itemGroup VARCHAR(255) DEFAULT NULL,
			previewIcon VARCHAR(255) DEFAULT "default.png",
			previewTooltip VARCHAR(255) DEFAULT NULL );`;

		return this.dao.run(sql);
	}

	deleteTable() {
		const sql = 'DROP TABLE items;';
		return this.dao.run(sql);
	}

	getById(id) {
		return this.dao.get(
			'SELECT * FROM items WHERE id= ?',
			[id]
		);
	}

	bulkCreate(itemDataArr) {
		const cmds = itemDataArr.map((itemData) => {
			const { id, displayName, parent, rootTemplate, value, weight, comboCategory, isConsumable, itemGroup, previewIcon, previewTooltip } = itemData;
			const sql = `INSERT INTO items (
				id, displayName, parent, rootTemplate, value, weight, comboCategory, isConsumable, itemGroup, previewIcon, previewTooltip ) 
				VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
			const values = [id, displayName, parent, rootTemplate, value, weight, comboCategory, isConsumable, itemGroup, previewIcon, previewTooltip];
			return { sql, values };
		});

		return this.dao.transaction(cmds);
	}

	create(itemData) {
		const { name, displayName, parent, rootTemplate, value, weight, comboCategory, isConsumable, itemGroup, previewIcon, previewTooltip } = itemData;
		return this.dao.run(`
			INSERT INTO items (id, displayName, parent, rootTemplate, value, weight, comboCategory, isConsumable, itemGroup, previewIcon, previewTooltip ) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
		[name, displayName, parent, rootTemplate, value, weight, comboCategory, isConsumable, itemGroup, previewIcon, previewTooltip]);
	}

	update(task) {
		const { id, name, description, isComplete, projectId } = task;
		return this.dao.run(
			'UPDATE tasks SET name = ? description = ? isComplete = ? projectId = ? WHERE id = ?',
			[name, description, isComplete, projectId, id]
		);
	}


	delete(id) {
		return this.dao.run(
			'DELETE from tasks WHERE id = ?',
			[id]
		);
	}
}

export default TaskRepository;
