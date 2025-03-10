<<<<<<< HEAD
/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
};
=======
/** @format */

module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>/tests'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
};
>>>>>>> recovery-branch
