export function verifyUser(credentials) {
    if (credentials.username === 'admin' && credentials.password === 'password') {
      return { id: 1, name: 'Admin' };
    }
    return null;
  }
  