/** @format */

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateUserDetails(name: string, email: string, password: string) {
	if (!name || !email || !password) throw new Error('Missing required fields');
	if (name.trim().length < 2) throw new Error('Name must be at least 2 characters long');

	if (!EMAIL_REGEX.test(email)) throw new Error('Invalid email format');

	// Password validation
	if (password.length < 8) throw new Error('Password must be at least 8 characters long');

	if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) throw new Error('Password must contain at least one uppercase letter, one lowercase letter, and one number');
}

export default validateUserDetails;
