import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TemplateProvider } from './context/TemplateContext';
import { ProjectProvider } from './context/ProjectContext';
import { ToastProvider } from './context/ToastContext';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ForgotPassword } from './pages/ForgotPassword';
import { Home } from './pages/Home';
import { Categories } from './pages/Categories';
import { CategoryPage } from './pages/CategoryPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { TemplatePreview } from './pages/TemplatePreview';
import { Projects } from './pages/Projects';
import { ProjectCustomize } from './pages/ProjectCustomize';
import { Favorites } from './pages/Favorites';
import { RecentlyViewed } from './pages/RecentlyViewed';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <AuthProvider>
      <TemplateProvider>
        <ProjectProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                {/* PUBLIC ROUTES */}
                <Route path="/" element={<Landing />} />
                <Route
                  path="/login"
                  element={
                    <ProtectedRoute publicOnly={true}>
                      <Login />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <ProtectedRoute publicOnly={true}>
                      <Signup />
                    </ProtectedRoute>
                  }
                />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* AUTHENTICATED ROUTES */}
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/categories"
                  element={
                    <ProtectedRoute>
                      <Categories />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/category/:categorySlug"
                  element={
                    <ProtectedRoute>
                      <CategoryPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/templates"
                  element={
                    <ProtectedRoute>
                      <TemplatesPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/template/:templateId"
                  element={
                    <ProtectedRoute>
                      <TemplatePreview />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/template/:templateId/preview"
                  element={
                    <ProtectedRoute>
                      <TemplatePreview />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <ProtectedRoute>
                      <Projects />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/projects/:projectId"
                  element={
                    <ProtectedRoute>
                      <ProjectCustomize />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/projects/:projectId/customize"
                  element={
                    <ProtectedRoute>
                      <ProjectCustomize />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <ProtectedRoute>
                      <Favorites />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/recently-viewed"
                  element={
                    <ProtectedRoute>
                      <RecentlyViewed />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />

                {/* CATCH ALL 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ToastProvider>
        </ProjectProvider>
      </TemplateProvider>
    </AuthProvider>
  );
}
