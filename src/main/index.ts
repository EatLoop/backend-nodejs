/** @format */
import configure from './config';
import express from 'express';

const main = async () => {
	await configure();
	const port=process.env.PORT ?? 3000
	const app=express();
	app.listen(port,()=>{
		console.log('App is running on port: ',port)
	})

};

main();
