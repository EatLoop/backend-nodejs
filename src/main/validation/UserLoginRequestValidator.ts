/** @format */

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateUserDetails(email: string, password: string) {
	if (!email || !password) throw new Error('Missing required fields');

	if (!EMAIL_REGEX.test(email)) throw new Error('Invalid email format');

}

export default validateUserDetails;
