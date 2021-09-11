const supertest = require("supertest");
const request = supertest("https://supervillain.herokuapp.com")

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJjaGlyYWdtYWRhYW4iLCJpYXQiOjE2MzEzMjE4OTYsImV4cCI6MTYzMTU4MTA5Nn0.rUFBld02fzGRGKE9IlG5wqvw45TTqlfAh8IVA2Zy_eY"

describe("GET /v1/user", () => {
	
	test('should respond with 200 for correct token', async () => {
		const res = await request.get("/v1/user")
			.set('Accept', 'application/json')
			.set('Authorization', `${TOKEN}`);
		
		expect(res.statusCode).toBe(200);
		expect(res.body.length).toBeGreaterThanOrEqual(0);
		expect(res.body.error).toBeUndefined();
		expect(res.body[0].user_id).not.toBeUndefined();
		expect(typeof res.body[0].user_id).toBe('number');
		expect(res.body[0].username).not.toBeUndefined();
		expect(typeof res.body[0].username).toBe('string');
		expect(res.body[0].score).not.toBeUndefined();
		expect(typeof res.body[0].score).toBe('number');
		
	}, 10000);

	test('should respond with 403 for missing token', async () => {
		const res = await request.get("/v1/user")
			.set('Accept', 'application/json');
		
		expect(res.statusCode).toBe(403);
		expect(res.body.error).toBe("Token Authentication failed ::: JsonWebTokenError: jwt must be provided");
		
	}, 10000);

	test('should respond with 403 for invalid token', async () => {
		const res = await request.get("/v1/user")
			.set('Accept', 'application/json')
			.set('Authorization', 'invalid.token.x');
		
		expect(res.statusCode).toBe(403);
		expect(res.body.error).toBe("Token Authentication failed ::: JsonWebTokenError: invalid token");
		
	}, 10000);

	test('should respond with 403 for malformed token', async () => {
		const res = await request.get("/v1/user")
			.set('Accept', 'application/json')
			.set('Authorization', 'malformed.token');
		
		expect(res.statusCode).toBe(403);
		expect(res.body.error).toBe("Token Authentication failed ::: JsonWebTokenError: jwt malformed");
		
	}, 10000);

});
describe("POST /v1/user", () => {

	test('should respond with 201 for successful user creation', async () => {
		const data = {
			username: "user" + Math.floor(Math.random() * 1000000),
			score: 100
		}
		const res = await request.post("/v1/user")
			.set('Accept', '*/*')
			.set('Content-Type', 'application/json')
			.set('Authorization', `${TOKEN}`).send(data);

		expect(res.statusCode).toBe(201);
		expect(res.body.status).toBe('success');
		expect(res.body.message).toBe('User added.');
		expect(res.body.error).toBeUndefined();

		const get_response = await request.get("/v1/user")
			.set('Accept', 'application/json')
			.set('Authorization', `${TOKEN}`);

		const filtered = get_response.body.filter(user => user.username == data.username)
		expect(filtered.length).toBe(1);
		expect(filtered[0].score).toBe(data.score);
	}, 10000);

	test('should respond with 403 for missing token', async () => {
		
		const data = {
			username: "user" + Math.floor(Math.random() * 1000000),
			score: 100
		}

		const res = await request.post("/v1/user")
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.send(data);
		
		expect(res.statusCode).toBe(403);
		expect(res.body.error).toBe("Token Authentication failed ::: JsonWebTokenError: jwt must be provided");
		
	}, 10000);

	test('should respond with 403 for invalid token', async () => {
		
		const data = {
			username: "user" + Math.floor(Math.random() * 1000000),
			score: 100
		}

		const res = await request.post("/v1/user")
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.set('Authorization', 'invalid.token.x').send(data);
		
		expect(res.statusCode).toBe(403);
		expect(res.body.error).toBe("Token Authentication failed ::: JsonWebTokenError: invalid token");
		
	}, 10000);

	test('should respond with 403 for malformed token', async () => {
		
		const data = {
			username: "user" + Math.floor(Math.random() * 1000000),
			score: 100
		}
		
		const res = await request.post("/v1/user")
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.set('Authorization', 'malformed.token').send(data);
		
		expect(res.statusCode).toBe(403);
		expect(res.body.error).toBe("Token Authentication failed ::: JsonWebTokenError: jwt malformed");
		
	}, 10000);

	test('should respond with 400 for missing data', async () => {
		
		const res = await request.post("/v1/user")
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.set('Authorization', `${TOKEN}`);
		
		expect(res.statusCode).toBe(400);
		expect(res.body.error).not.toBeUndefined();
		expect(res.body.error).toContain('null value in column');
		
	}, 10000);

	test('should respond with 400 for duplicate data', async () => {
		
		const data = {
			username: "user1",
			score: 100
		}

		const res = await request.post("/v1/user")
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.set('Authorization', `${TOKEN}`).send(data);
		
		expect(res.statusCode).toBe(400);
		expect(res.body.error).not.toBeUndefined();
		expect(res.body.error).toContain('duplicate key value violates unique constraint');
		
	}, 10000);

});
describe("PUT /v1/user", () => {

	test('should respond with 200 or 204 for correct user updation', async () => {
		const data = {
			username: "user1",
			score: 100
		}
		const res = await request.put("/v1/user")
			.set('Accept', '*/*')
			.set('Content-Type', 'application/json')
			.set('Authorization', `${TOKEN}`).send(data);

		expect(res.statusCode).toBe(204);
		expect(res.body.error).toBeUndefined();

		const get_response = await request.get("/v1/user")
			.set('Accept', 'application/json')
			.set('Authorization', `${TOKEN}`);

		const filtered = get_response.body.filter(user => user.username == data.username)
		expect(filtered.length).toBe(1);
		expect(filtered[0].score).toBe(data.score);

		data.score = 1500;
		await request.put("/v1/user")
			.set('Accept', '*/*')
			.set('Content-Type', 'application/json')
			.set('Authorization', `${TOKEN}`).send(data);
	}, 10000);

	test('should respond with 403 for missing token', async () => {
		
		const data = {
			username: "user1",
			score: 100
		}

		const res = await request.put("/v1/user")
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.send(data);
		
		expect(res.statusCode).toBe(403);
		expect(res.body.error).toBe("Token Authentication failed ::: JsonWebTokenError: jwt must be provided");
		
	}, 10000);

	test('should respond with 403 for invalid token', async () => {
		
		const data = {
			username: "user1",
			score: 100
		}

		const res = await request.put("/v1/user")
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.set('Authorization', 'invalid.token.x').send(data);
		
		expect(res.statusCode).toBe(403);
		expect(res.body.error).toBe("Token Authentication failed ::: JsonWebTokenError: invalid token");
		
	}, 10000);

	test('should respond with 403 for malformed token', async () => {
		
		const data = {
			username: "user1",
			score: 100
		}

		const res = await request.put("/v1/user")
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.set('Authorization', 'malformed.token').send(data);
		
		expect(res.statusCode).toBe(403);
		expect(res.body.error).toBe("Token Authentication failed ::: JsonWebTokenError: jwt malformed");
		
	}, 10000);

	test('should respond with 400 for missing data', async () => {
		
		const res = await request.put("/v1/user")
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.set('Authorization', `${TOKEN}`);
		
		expect(res.statusCode).toBe(400);
		// expect(res.body.status).toBe("success");
		// expect(res.body.message).toBe("User added with updated score");
		
	}, 10000);

});