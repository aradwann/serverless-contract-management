import { authService } from '../src/services'


describe('Auth service', () => {

    test('register new user', async () => {
        const user = {
            username: "testusername",
            password: "testpassword"
        }
        const userId = await authService.register(user.username, user.password)
        expect(userId).toBeTruthy()
    });

    test('register exisiting user', async () => {
        const user = {
            username: "user1",
            password: "password1"
        }
        try {
            await authService.register(user.username, user.password)
        } catch (e) {
            expect(e.message).toMatch('User with that username already exists');
        }


    });

    test('login existed user', async () => {
        const user = {
            username: "user1",
            password: "password1"
        }
        const jwt = await authService.login(user.username, user.password)
        expect(jwt).toBeTruthy()
    });

    test('login with invalid credentials', async () => {
        const user = {
            username: "user1",
            password: "wrongpassword"
        }
        try {
            await authService.login(user.username, user.password)
        } catch (e) {
            expect(e.message).toMatch('The credentials do not match.');
        }

    });

    test('login with non-existent user', async () => {
        const user = {
            username: "notauser",
            password: "wrongpassword"
        }
        try {
            await authService.login(user.username, user.password)
        } catch (e) {
            expect(e.message).toMatch('this user does not exsit');
        }

    });
});

