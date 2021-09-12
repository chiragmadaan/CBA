// import supertest from "supertest"
const supertest = require("supertest");
const request = supertest("https://supervillain.herokuapp.com")
const expect = require('chai').expect
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJjaGlyYWdtYWRhYW4yIiwiaWF0IjoxNjMxNDI5MTExLCJleHAiOjE2MzE2ODgzMTF9.HVUT2LqSSJQmp-T1dX-OXKp853JTBjYGhUiIA6hqMFU"


describe("GET /auth/verifytoken", () => {

	it('should respond with 200 for correct token', async () => {
		const res = await request.get("/auth/verifytoken")
			.set('Accept', 'application/json')
			.set('Authorization', `${TOKEN}`);
		expect(res.statusCode).to.be.equal(200);
		expect(res.body.length).to.be.equal(1);
		expect(res.body.error).to.be.an('undefined');
		expect(res.body[0].app_id).to.not.be.an('undefined');
		expect(res.body[0].app_id).to.be.a('number');
		expect(res.body[0].app).to.be.equal("chiragmadaan2");
	}, 10000);

	it('should respond with 403 for malformed token', async () => {
		const res = await request.get("/auth/verifytoken")
			.set('Accept', 'application/json')
			.set('Authorization', 'malformed.token');

		expect(res.statusCode).to.be.equal(403);
		expect(res.body.error).to.be.equal("Token Authentication failed ::: JsonWebTokenError: jwt malformed");
	}, 10000);


	it('should respond with 403 for invalid token', async () => {
		const res = await request.get("/auth/verifytoken")
			.set('Accept', 'application/json')
			.set('Authorization', 'invalid.token.x');

		expect(res.statusCode).to.be.equal(403);
		expect(res.body.error).to.be.equal("Token Authentication failed ::: JsonWebTokenError: invalid token");
	}, 10000);

	it('should respond with 403 for missing token', async () => {
		const res = await request.get("/auth/verifytoken")
			.set('Accept', 'application/json');

		expect(res.statusCode).to.be.equal(403);
		expect(res.body.error).to.be.equal("Token Authentication failed ::: JsonWebTokenError: jwt must be provided");
	}, 10000);


});

