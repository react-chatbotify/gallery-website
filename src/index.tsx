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
import AboutPage from './pages/About';
import NavigationBar from './components/NavigationBar/NavigationBar'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'
import LoginProcessPage from './pages/LoginProcess'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { Provider } from './components/ui/provider';

// eslint-disable-next-line
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css" />

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
			{
				path: '/about',
				element: <AboutPage />
			},
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
		<I18nextProvider i18n={i18n}>
			<AuthProvider>
				<Provider >
					<RouterProvider router={router} />
				</Provider>
			</AuthProvider>
		</I18nextProvider>
	</React.StrictMode>
)
reportWebVitals()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
