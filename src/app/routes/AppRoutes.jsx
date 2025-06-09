import {suspense, lazy} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import ProtectedRoute from '@routes/ProtectedRoute';

const LoginPage = lazy(() => import('@pages/LoginPage'));
const ErrorPage = lazy(() => import('@pages/ErrorPage'));

const AppRoutes = () => {
    return (
        <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
            path="/login"
            element={suspense(<LoginPage />)}
        />
        <Route
            path="/error"
            element={suspense(<ErrorPage />)}
        />
        <Route
            path="*"
            element={
            <ProtectedRoute>
                <Navigate to="/error" replace />
            </ProtectedRoute>
            }
        />
        </Routes>
    );
}