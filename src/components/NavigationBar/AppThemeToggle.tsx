import { useAppTheme } from "../../context/AppThemeContext";
import { useTranslation } from "react-i18next";
import { DarkModeSwitch } from "react-toggle-dark-mode"

const AppThemeToggle = () => {
	// context for handling app theme
	const { appTheme, toggleAppTheme } = useAppTheme()

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const {t} = useTranslation();

	const handleClick = () => {
		toggleAppTheme()
	}
  
	const isDark = appTheme === 'dark';
	return <DarkModeSwitch
		checked={isDark}
		onChange={handleClick}
		size={20}
		moonColor="hsl(198,90%,15%)"
		sunColor="hsl(48,90%,55%)"

	/>

}

export default AppThemeToggle;
