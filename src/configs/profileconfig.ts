import { ThemeCard } from "../components/profile/Themecard";
import { Config } from "../interfaces/profile";

export  const config: Config = {
  themes: {
    allUrl: '/themes',
    mainHeading: 'Themes',
    emptyState: {
      subHeading: {
        1: 'No favourite themes yet',
        0: 'No personal themes yet'
      },
      subtext: 'Browse theme selection or create your own',
      buttons: {
        primary: 'Build your own theme',
        secondary: 'Browse Themes'
      }
    },
    elements: {
      ItemCard: ThemeCard
    }
  },
  plugins: {

  }
}