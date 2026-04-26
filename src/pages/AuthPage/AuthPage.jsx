import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import googleIcon from '@/assets/google-icon.svg'
import { Box, TextField, Alert, Card, Button, Divider, Typography, Stack } from '@mui/material';
import { setUser } from '@/entities/user';
import { mapAuthError } from '@/shared/services/errorMapper';
import { authService } from '@/shared/services/authService';
import AppContainer from '@/shared/ui/AppContainer/AppContainer';

function AuthPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [isLogin, setIsLogin] = useState(true)
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState('');

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch('password');

    async function onSubmit(data) {
        setLoading(true);
        setAuthError('');

        try {
            const userCredential = isLogin
                ? await authService.login(data.email, data.password)
                : await authService.register(data.email, data.password, data.displayName);

            dispatch(setUser({
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: userCredential.user.displayName || data.displayName || userCredential.user.email?.split('@')[0]
            }));

            navigate('/');
        } catch (error) {
            setAuthError(mapAuthError(isLogin ? 'login' : 'register', error.code));
        } finally {
            setLoading(false);
        }
    }

    async function handleGoogleAuth() {
        setLoading(true);
        setAuthError('');

        try {
            const userCredential = await authService.loginWithGoogle(isLogin);

            dispatch(setUser({
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: userCredential.user.displayName || userCredential.user.email?.split('@')[0],
            }));

            navigate('/');
        } catch (error) {
            console.error('Google auth error:', error);
            setAuthError('Google authorization error. Try again later.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <AppContainer>
            <Box sx={(theme) => ({
                minHeight: `calc(100vh - ${theme.layout.header.height}px)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', py: 1
            })}>
                <Box sx={{ maxWidth: 450, width: '100%', mx: 'auto' }}>
                    <Card sx={{ p: 2, borderRadius: 2 }}>
                        <Typography variant="h5" textAlign="center" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' }, mb: 2 }}>
                            {isLogin ? 'Login to' : 'Creating an account on'}
                            <Box component="span" sx={{ color: 'primary.main' }}> Travel Blog</Box>
                        </Typography>

                        <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2.5}>
                            {!isLogin && (
                                <TextField label="Name" type="text" fullWidthdisabled={loading}

                                    {...register('displayName', {
                                        required: 'Name is required.',
                                        minLength: {
                                            value: 2,
                                            message: 'The name must be at least 2 characters.'
                                        }
                                    })}

                                    error={!!errors.displayName}
                                    helperText={errors.displayName?.message}
                                />
                            )}

                            <TextField label="Email" type="email" fullWidth disabled={loading}

                                {...register('email', {
                                    required: 'Email is required.',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email format.'
                                    }
                                })}

                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                            <TextField label='Password' type='password' fullWidth disabled={loading}

                                {...register('password', {
                                    required: 'Password is required.',
                                    minLength: {
                                        value: 6,
                                        message: 'The password must be at least 6 characters.'
                                    }
                                })}

                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />

                            {!isLogin && (
                                <TextField label='Confirm password' type='password' fullWidth disabled={loading}

                                    {...register('confirmPassword', {
                                        required: 'Password confirmation is required.',
                                        validate: (value) => {
                                            if (value !== password) {
                                                return 'The passwords do not match.';
                                            }
                                        }
                                    })}

                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword?.message}
                                />
                            )}

                            {authError && (
                                <Alert severity="error">
                                    {authError}
                                </Alert>
                            )}

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={loading}
                            >
                                {loading
                                    ? (isLogin ? 'Login...' : 'Registration...')
                                    : (isLogin ? 'Login' : 'Sign Up')
                                }
                            </Button>
                        </Stack>

                        <Box>
                            <Divider sx={{ my: 1 }}>or</Divider>

                            <Button
                                onClick={handleGoogleAuth}
                                variant="outlined"
                                fullWidth
                                disabled={loading}
                                startIcon={<img src={googleIcon} width={20} alt="Google" />}
                            >
                                {isLogin ? 'Login with Google' : 'Sign up with Google'}
                            </Button>
                        </Box>

                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5} mt={3}>
                            <Typography variant="body1" color="text.secondary">
                                {isLogin ? "Don't have an account?" : "Already have an account?"}
                            </Typography>
                            <Button
                                variant="text"
                                color="primary"
                                onClick={() => { setIsLogin(!isLogin); setAuthError(''); }}
                            >
                                {isLogin ? 'Sign up' : 'Login'}
                            </Button>
                        </Stack>
                    </Card>
                </Box>
            </Box>
        </AppContainer>
    );
}

export default AuthPage;