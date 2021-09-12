const supertest = require("supertest");
const request = supertest("https://supervillain.herokuapp.com")
const expect = require('chai').expect
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJjaGlyYWdtYWRhYW4yIiwiaWF0IjoxNjMxNDI5MTExLCJleHAiOjE2MzE2ODgzMTF9.HVUT2LqSSJQmp-T1dX-OXKp853JTBjYGhUiIA6hqMFU"

describe("GET /v1/user", () => {
	
	it('should respond with 200 for correct token', async () => {
		const res = await request.get("/v1/user")
			.set('Accept', 'application/json')
			.set('Authorization', `${TOKEN}`);
		
		expect(res.statusCode).to.be.equal(200);
		expect(res.body.length).to.be.at.least(0);
		expect(res.body.error).to.be.an('undefined');
		expect(res.body[0].user_id).to.not.be.an('undefined');
		expect(res.body[0].user_id).to.be.a('number');
		expect(res.body[0].username).to.not.be.an('undefined');
		expect(res.body[0].username).to.be.a('string');
		expect(res.body[0].score).to.not.be.an('undefined');
		expect(res.body[0].score).to.be.a('number');
		
	}, 10000);

	it('should respond with 403 for missing token', async () => {
		const res = await request.get("/v1/user")
			.set('Accept', 'application/json');
		
		expect(res.statusCode).to.be.equal(403);
		expect(res.body.error).to.be.equal("Token Authentication failed ::: JsonWebTokenError: jwt must be provided");
		
	}, 10000);

	it('should respond with 403 for invalid token', async () => {
		const res = await request.get("/v1/user")
			.set('Accept', 'application/json')
			.set('Authorization', 'invalid.token.x');
		
		expect(res.statusCode).to.be.equal(403);
		expect(res.body.error).to.be.equal("Token Authentication failed ::: JsonWebTokenError: invalid token");
		
	}, 10000);

	it('should respond with 403 for malformed token', async () => {
		const res = await request.get("/v1/user")
			.set('Accept', 'application/json')
			.set('Authorization', 'malformed.token');
		
		expect(res.statusCode).to.be.equal(403);
		expect(res.body.error).to.be.equal("Token Authentication failed ::: JsonWebTokenError: jwt malformed");
		
	}, 10000);

});

describe("POST /v1/user", () => {

	it('should respond with 201 for successful user creation', async () => {
		const data = {
			username: "user" + Math.floor(Math.random() * 1000000),
			score: 100
		}
		const res = await request.post("/v1/user")
			.set('Accept', '*/*')
			.set('Content-Type', 'application/json')
			.set('Authorization', `${TOKEN}`).send(data);

		expect(res.statusCode).to.be.equal(201);
		expect(res.body.status).to.be.equal('success');
		expect(res.body.message).to.be.equal('User added.');
		expect(res.body.error).to.be.an('undefined');

		const get_response = await request.get("/v1/user")
			.set('Accept', 'application/json')
			.set('Authorization', `${TOKEN}`);

		const filtered = get_response.body.filter(user => user.username == data.username)
		expect(filtered.length).to.be.equal(1);
		expect(filtered[0].score).to.be.equal(data.score);
	}, 10000);

	it('should respond with 403 for missing token', async () => {
		
		const data = {
			username: "user" + Math.floor(Math.random() * 1000000),
			score: 100
		}

		const res = await request.post("/v1/user")
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.send(data);
		
		expect(res.statusCode).to.be.equal(403);
		expect(res.body.error).to.be.equal("Token Authentication failed ::: JsonWebTokenError: jwt must be provided");
		
	}, 10000);

	it('should respond with 403 for invalid token', async () => {
		
		const data = {
			username: "user" + Math.floor(Math.random() * 1000000),
			score: 100
		}

		const res = await request.post("/v1/user")
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.set('Authorization', 'invalid.token.x').send(data);
		
		expect(res.statusCode).to.be.equal(403);
		expect(res.body.error).to.be.equal("Token Authentication failed ::: JsonWebTokenError: invalid token");
		
	}, 10000);

	it('should respond with 403 for malformed token', async () => {
		
		const data = {
			username: "user" + Math.floor(Math.random() * 1000000),
			score: 100
		}
		
		const res = await request.post("/v1/user")
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.set('Authorization', 'malformed.token').send(data);
		
		expect(res.statusCode).to.be.equal(403);
		expect(res.body.error).to.be.equal("Token Authentication failed ::: JsonWebTokenError: jwt malformed");
		
	}, 10000);

	it('should respond with 400 for missing data', async () => {
		
		const res = await request.post("/v1/user")
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.set('Authorization', `${TOKEN}`);
		
		expect(res.statusCode).to.be.equal(400);
		expect(res.body.error).to.not.be.an('undefined');
		expect(res.body.error).to.include('null value in column');
		
	}, 10000);

	it('should respond with 400 for duplicate data', async () => {
		
		const data = {
			username: "user1",
			score: 100
		}

		const res = await request.post("/v1/user")
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.set('Authorization', `${TOKEN}`).send(data);
		
		expect(res.statusCode).to.be.equal(400);
		expect(res.body.error).to.not.be.an('undefined');
		expect(res.body.error).to.include('duplicate key value violates unique constraint');
		
	}, 10000);

});

describe("PUT /v1/user", () => {

	it('should respond with 200 or 204 for correct user updation', async () => {
		const data = {
			username: "user1",
			score: 100
		}
		const res = await request.put("/v1/user")
			.set('Accept', '*/*')
			.set('Content-Type', 'application/json')
			.set('Authorization', `${TOKEN}`).send(data);

		expect(res.statusCode).to.be.equal(204);
		expect(res.body.error).to.be.an('undefined');

		const get_response = await request.get("/v1/user")
			.set('Accept', 'application/json')
			.set('Authorization', `${TOKEN}`);

		const filtered = get_response.body.filter(user => user.username == data.username)
		expect(filtered.length).to.be.equal(1);
		expect(filtered[0].score).to.be.equal(data.score);

		data.score = 1500;
		await request.put("/v1/user")
			.set('Accept', '*/*')
			.set('Content-Type', 'application/json')
			.set('Authorization', `${TOKEN}`).send(data);
	}, 10000);

	it('should respond with 403 for missing token', async () => {
		
		const data = {
			username: "user1",
			score: 100
		}

		const res = await request.put("/v1/user")
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.send(data);
		
		expect(res.statusCode).to.be.equal(403);
		expect(res.body.error).to.be.equal("Token Authentication failed ::: JsonWebTokenError: jwt must be provided");
		
	}, 10000);

	it('should respond with 403 for invalid token', async () => {
		
		const data = {
			username: "user1",
			score: 100
		}

		const res = await request.put("/v1/user")
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.set('Authorization', 'invalid.token.x').send(data);
		
		expect(res.statusCode).to.be.equal(403);
		expect(res.body.error).to.be.equal("Token Authentication failed ::: JsonWebTokenError: invalid token");
		
	}, 10000);

	it('should respond with 403 for malformed token', async () => {
		
		const data = {
			username: "user1",
			score: 100
		}

		const res = await request.put("/v1/user")
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.set('Authorization', 'malformed.token').send(data);
		
		expect(res.statusCode).to.be.equal(403);
		expect(res.body.error).to.be.equal("Token Authentication failed ::: JsonWebTokenError: jwt malformed");
		
	}, 10000);

	it('should respond with 400 for missing data', async () => {
		
		const res = await request.put("/v1/user")
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.set('Authorization', `${TOKEN}`);
		
		expect(res.statusCode).to.be.equal(400);
		// expect(res.body.status).to.be.equal("success");
		// expect(res.body.message).to.be.equal("User added with updated score");
		
	}, 10000);

});