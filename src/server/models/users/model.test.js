const { verify } = require('./model');

describe('verify', () => {
  test('isVerified - true', async () => {
    const email = 'test';
    const password = 'test';

    const { isVerified, user } = await verify({ email, password });
    expect(isVerified).toEqual(true);
    expect(user.email).toEqual(email);
    expect(user.password).toEqual(password);
  });
  test('isVerified - false', async () => {
    const email = 'test';
    const password = 'aaa';

    const { isVerified, user } = await verify({ email, password });
    expect(isVerified).toEqual(false);
    expect(user).toEqual(undefined);
  });
});
