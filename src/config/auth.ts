const authDetails:{
      bcryptSaltRounds:number|null
}={
      bcryptSaltRounds:null
}
export const configureAuth = () => {
	const {BCRYPT_SALT_ROUNDS} = process.env;
	if (!BCRYPT_SALT_ROUNDS) throw new Error('BCRYPT_SALT_ROUNDS is not set');
	authDetails.bcryptSaltRounds = parseInt(BCRYPT_SALT_ROUNDS);
};


export default authDetails;
