/** @format */
import configure from './config';
import express from 'express'
const main = async () => {
	await configure();
	const app = express();
	const port = process.env.PORT ?? 3000;

	// Middleware
	app.use(express.json());

	app.get('/', (req, res) => {
		res.send('Hello, TypeScript with Express!');
	});

	// Start server
	app.listen(port, () => {
		console.log(`Server running on http://localhost:${port}`);
	});

};

main();
