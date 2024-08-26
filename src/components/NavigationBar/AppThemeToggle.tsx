import { useAppTheme } from "../../context/AppThemeContext";

const AppThemeToggle = () => {
	// context for handling app theme
	const { appTheme, toggleAppTheme } = useAppTheme()

	const handleClick = () => {
		toggleAppTheme()
	}

	console.log(appTheme)

	return <div>
		<button onClick={handleClick}>{appTheme}</button>
	</div>
}

export default AppThemeToggle;