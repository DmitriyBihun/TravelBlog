export const authErrorMapper = {
    login: {
        'auth/user-not-found': 'User with this email not found.',
        'auth/wrong-password': 'Incorrect password.',
        'auth/invalid-email': 'Invalid email format.',
        default: 'Login error. Try again later.'
    },
    register: {
        'auth/email-already-in-use': 'User with this email already exists.',
        'auth/invalid-email': 'Invalid email format.',
        'auth/weak-password': 'Password must be at least 6 characters.',
        default: 'Registration error. Try again later.'
    }
};

export const mapAuthError = (type, code) => authErrorMapper[type][code] ?? authErrorMapper[type].default;