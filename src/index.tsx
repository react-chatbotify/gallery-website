import React from 'react';
import ReactDOM from "react-dom/client";
import './styles/index.css';
import HomePage from './pages/Home'
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/Error'
import PluginsPage from './pages/Plugins';
import ThemesPage from './pages/Themes'
import ThemeBuilderPage from './pages/ThemeBuilder';
import UserProfilePage from './pages/UserProfile'
import NavigationBar from './components/NavigationBar/NavigationBar'
import { AuthProvider } from './context/AuthContext'
import { AppThemeProvider } from './context/AppThemeContext';
import ProtectedRoute from './routes/ProtectedRoute'
import LoginProcessPage from './pages/LoginProcess'

const NavbarWrapper = () => (
	<div>
		<NavigationBar />
		<Outlet />
	</div>
)

const routes = [
	{
		path: '/',
		element: <HomePage />,
		errorElement: <ErrorPage />
	},
	{
		path: '/login/process',
		element: <LoginProcessPage />
	},
	{
		path: '/',
		element: <NavbarWrapper />,
		children: [
			// {
			//   path: '/about',
			//   element: <AboutPage />
			// },
			{
				path: '/plugins',
				element: <PluginsPage />
			},
			{
				path: '/themes',
				element: <ThemesPage />
			},
			{
				path: '/theme-builder',
				element: <ThemeBuilderPage />
			},
			// {
			//   path: '/terms-of-service',
			//   element: <TermsOfService />
			// },
			{
				path: '/profile',
				element: <ProtectedRoute element={<UserProfilePage />} />
			}
		]
	}
]

const router = createBrowserRouter(routes)
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<AuthProvider>
			<AppThemeProvider>
				<RouterProvider router={router} />
			</AppThemeProvider>
		</AuthProvider>
	</React.StrictMode>
)
reportWebVitals()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
