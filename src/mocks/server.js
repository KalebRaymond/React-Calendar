import { rest } from "msw";
import { setupServer } from "msw/node";

const handlers = [
	rest.get("http://localhost:8080/events", (req, res, ctx) => {
		return res(
			ctx.status(500),
			ctx.json([{ message: "Default test error for GET" }])
		);
	}),
	rest.post("http://localhost:8080/events", (req, res, ctx) => {
		return res(
			ctx.status(500),
			ctx.json([{ message: "Default test error for POST" }])
		);
	}),
	rest.put("http://localhost:8080/events", (req, res, ctx) => {
		return res(
			ctx.status(500),
			ctx.json([{ message: "Default test error for PUT" }])
		);
	}),
	rest.delete("http://localhost:8080/events", (req, res, ctx) => {
		return res(
			ctx.status(500),
			ctx.json([{ message: "Default test error for DELETE" }])
		);
	}),
];

// This configures a request mocking server with the given request handlers.
const server = setupServer(...handlers);

export { server, rest };
