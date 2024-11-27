import { useAppTheme } from "../../context/AppThemeContext";
import { useTranslation } from "react-i18next";


const AppThemeToggle = () => {
	// context for handling app theme
	const { appTheme, toggleAppTheme } = useAppTheme()

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const {t} = useTranslation();

	const handleClick = () => {
		toggleAppTheme()
	}

	console.log(appTheme)

	return <div>
		<button onClick={handleClick}>{appTheme}</button>
	</div>
}

export default AppThemeToggle;