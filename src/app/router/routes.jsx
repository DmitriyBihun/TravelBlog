import { lazy } from 'react';
import HomePage from '@/pages/HomePage/HomePage';
import ProtectedRoute from './ProtectedRoute';
import AuthRoute from './AuthRoute';

const CreatePostPage = lazy(() => import('@/pages/CreatePostPage/CreatePostPage'));
const AuthPage = lazy(() => import('@/pages/AuthPage/AuthPage'));
const PostPage = lazy(() => import('@/pages/PostPage/PostPage'));

export const routesConfig = [
    {
        index: true,
        element: <HomePage />,
    },
    {
        path: 'auth',
        element: <AuthRoute />,
        children: [
            {
                index: true,
                element: <AuthPage />,
            }
        ]
    },
    {
        path: 'create',
        element: <ProtectedRoute />,
        children: [
            {
                index: true,
                element: <CreatePostPage />,
            }
        ]
    },
    {
        path: 'posts/:id',
        element: <PostPage />,
    },
];