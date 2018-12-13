// https://stackabuse.com/a-sqlite-tutorial-with-node-js/
import sqlite from 'sqlite3';

class AppDAO {
	constructor(dbFilePath) {
		this.db = new sqlite.Database(dbFilePath, (err) => {
			if (err) {
				console.log('Could not connect to database.');
			} else {
				console.log('DB Connected');
			}
		});
	}

	run(sql, params = []) {
		return new Promise((res, rej) => {
			this.db.run(sql, params, function (err) {
				if (err) {
					// console.log(`Error Running SQL ${s}`);
					// console.log(err);
					rej(err);
				} else {
					res({ id: this.lastID });
				}
			});
		});
	}


	get(sql, params = []) {
		return new Promise((resolve, reject) => {
			this.db.get(sql, params, (err, result) => {
				if (err) {
					// console.log(`Error running sql: ${sql}`);
					// console.log(err);
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	all(sql, params = []) {
		return new Promise((resolve, reject) => {
			this.db.all(sql, params, (err, result) => {
				if (err) {
					// console.log(`Error running sql: ${sql}`);
					// console.log(err);
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	transaction(commands) {
		this.db.run('BEGIN TRANSACTION;');
		const processedCmd = commands.map(cmd => this.run(cmd.sql, cmd.values));
		this.db.run('COMMIT;');
		return Promise.all(processedCmd);
	}
}

export default AppDAO;
