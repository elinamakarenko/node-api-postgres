const Pool = require("pg").Pool;

const pool = new Pool({
	user: "elina",
	host: "localhost",
	database: "api",
	password: "elina",
	port: 5432,
});

const getCandidates = (request, response) => {
	pool.query("SELECT * FROM candidates", (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

const getCandidateById = (request, response) => {
	const { id } = request.params;

	pool.query(
		"SELECT * FROM candidates WHERE id = $1",
		[id],
		(error, results) => {
			if (error) {
				throw error;
			}
			response.status(200).json(results.rows);
		}
	);
};

const createCandidate = (request, response) => {
	const {
		id,
		name,
		surname,
		department_id,
		level_id,
		experience,
		stack_ids,
		salary,
		work_type_id,
		location,
	} = request.body;

	pool.query(
		"INSERT INTO candidates (id,name,surname,department_id,level_id,experience,stack_ids,salary,work_type_id,location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
		[
			id,
			name,
			surname,
			department_id,
			level_id,
			experience,
			stack_ids,
			salary,
			work_type_id,
			location,
		],
		(error, results) => {
			if (error) {
				throw error;
			}
			response.status(201).send(`Candidate added with ID: ${id}`);
		}
	);
};

const updateCandidate = (request, response) => {
	const { id } = request.params;
	const {
		name,
		surname,
		department_id,
		level_id,
		experience,
		stack_ids,
		salary,
		work_type_id,
		location,
	} = request.body;

	pool.query(
		"UPDATE candidates SET name = $2, surname = $3, department_id = $4, level_id = $5, experience = $6, stack_ids = $7, salary = $8, work_type_id = $9,location = $10 WHERE id = $1",
		[
			id,
			name,
			surname,
			department_id,
			level_id,
			experience,
			stack_ids,
			salary,
			work_type_id,
			location,
		],
		(error, results) => {
			if (error) {
				throw error;
			}
			response.status(200).send(`Candidate modified with ID: ${id}`);
		}
	);
};

const deleteCandidate = (request, response) => {
	const { id } = request.params;

	pool.query("DELETE FROM candidates WHERE id = $1", [id], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).send(`Candidate deleted with ID: ${id}`);
	});
};

module.exports = {
	getCandidates,
	getCandidateById,
	createCandidate,
	updateCandidate,
	deleteCandidate,
};
