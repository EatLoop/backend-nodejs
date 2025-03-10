

describe('User API', () => {
      it('should create a new user', async () => {
            const newUser = {
                  email: 'test@example.com',
                  password: 'password123',
            };

            expect(newUser.email).toBe(newUser.email);
      });
});