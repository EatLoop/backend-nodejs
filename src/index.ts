/** @format */
import configure from './config';
import express from 'express';
import authRouter from './auth/routers/AuthRouter'
import userRouter from './auth/routers/UserRouter';
const main = async () => {
	await configure();
	const port=process.env.PORT ?? 3000
	const app=express();
	app.use('/auth', authRouter);
	app.use('/user', userRouter);
	app.listen(port,()=>{
		console.log('App is running on port: ',port)
	})

};

main();
