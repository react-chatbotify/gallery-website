import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect
} from 'react'

type AppThemeType = 'light' | 'dark'

type AppThemeContextType = {
	appTheme: 'light' | 'dark'
	toggleAppTheme: () => void
}

const AppThemeContext = createContext<AppThemeContextType>({
	appTheme: 'dark',
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	toggleAppTheme: () => {}
})

type AppThemeProviderProps = {
	children: ReactNode
}

const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {
	const [appTheme, setAppTheme] = useState<AppThemeType>(
		() => window.matchMedia("(prefers-color-theme: dark)").matches ? 'dark' : 'light'
	)

	useEffect(() => {
		document.documentElement.setAttribute('app-theme', appTheme)
	},[])

	const toggleAppTheme = () => {
		setAppTheme((prevAppTheme) => {
			const isDarkTheme = prevAppTheme === 'dark'
			document.documentElement.setAttribute('app-theme', isDarkTheme ? 'light' : 'dark')
			return isDarkTheme ? 'light' : 'dark'
		})
	}

	return (
		<AppThemeContext.Provider
			value={{ appTheme, toggleAppTheme }}
		>
			{children}
		</AppThemeContext.Provider>
	)
}

const useAppTheme = (): AppThemeContextType => {
	const context = useContext(AppThemeContext)
	if (!context) {
		throw new Error('useTheme must be used within an AppThemeProvider')
	}
	return context
}

export {
	AppThemeProvider,
	useAppTheme
}
