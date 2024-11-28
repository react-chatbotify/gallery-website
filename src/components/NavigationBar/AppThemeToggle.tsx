import { useAppTheme } from "../../context/AppThemeContext";
import { useTranslation } from "react-i18next";
import ToggleButton from "./ToggleButton";


const AppThemeToggle = () => {
	// context for handling app theme
	const { appTheme, toggleAppTheme } = useAppTheme()

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const {t} = useTranslation();

	const handleClick = () => {
		toggleAppTheme()
	}
  
	return <ToggleButton onChange={handleClick} checked={appTheme === 'dark'} />

}

export default AppThemeToggle;
