// import supertest from "supertest"
const supertest = require("supertest");
const request = supertest("https://supervillain.herokuapp.com")

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJjaGlyYWdtYWRhYW4iLCJpYXQiOjE2MzEzMjE4OTYsImV4cCI6MTYzMTU4MTA5Nn0.rUFBld02fzGRGKE9IlG5wqvw45TTqlfAh8IVA2Zy_eY"


describe("GET /auth/verifytoken", () => {

	test('should respond with 200 for correct token', async () => {
		const res = await request.get("/auth/verifytoken")
			.set('Accept', 'application/json')
			.set('Authorization', `${TOKEN}`);
		expect(res.statusCode).toBe(200);
		expect(res.body.length).toBe(1);
		expect(res.body.error).toBeUndefined();
		expect(res.body[0].app_id).not.toBeUndefined();
		expect(typeof res.body[0].app_id).toBe('number');
		expect(res.body[0].app).toEqual("chiragmadaan");
	}, 10000);

	test('should respond with 403 for malformed token', async () => {
		const res = await request.get("/auth/verifytoken")
			.set('Accept', 'application/json')
			.set('Authorization', 'malformed.token');

		expect(res.statusCode).toBe(403);
		expect(res.body.error).toBe("Token Authentication failed ::: JsonWebTokenError: jwt malformed");
	}, 10000);


	test('should respond with 403 for invalid token', async () => {
		const res = await request.get("/auth/verifytoken")
			.set('Accept', 'application/json')
			.set('Authorization', 'invalid.token.x');

		expect(res.statusCode).toBe(403);
		expect(res.body.error).toBe("Token Authentication failed ::: JsonWebTokenError: invalid token");
	}, 10000);

	test('should respond with 403 for missing token', async () => {
		const res = await request.get("/auth/verifytoken")
			.set('Accept', 'application/json');

		expect(res.statusCode).toBe(403);
		expect(res.body.error).toBe("Token Authentication failed ::: JsonWebTokenError: jwt must be provided");
	}, 10000);


});

