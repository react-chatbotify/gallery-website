import member2Avatar from '@/assets/images/OurTeamPage/deksu.webp';
import member3Avatar from '@/assets/images/OurTeamPage/hunxjunedo.webp';
import member1Avatar from '@/assets/images/OurTeamPage/tjtanjin.webp';
import { TeamMember } from '@/interfaces/TeamMember';

/**
 * Array of team members for the project.
 */
export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Tan Jin',
    githubUrl: 'https://github.com/tjtanjin',
    roles: [
      { name: 'Core Maintainer', link: 'https://github.com/React-ChatBotify' },
      { name: 'Lead Developer', link: 'https://github.com/React-ChatBotify' },
    ],
    avatarUrl: member1Avatar,
  },
  {
    id: '2',
    name: 'Miikka Marin',
    githubUrl: 'https://github.com/Deksu',
    roles: [
      {
        name: 'Lead Designer',
        project: 'Gallery Website',
        link: 'https://github.com/React-ChatBotify/gallery-website',
      },
    ],
    avatarUrl: member2Avatar,
  },
  {
    id: '3',
    name: 'Hunain Ahmed',
    githubUrl: 'https://github.com/hunxjunedo',
    roles: [
      {
        name: 'Developer',
        project: 'Gallery Website',
        link: 'https://github.com/React-ChatBotify/gallery-website',
      },
    ],
    avatarUrl: member3Avatar,
  },
];

/**
 * Data for the "Maybe You!" call-to-action card on the team page.
 */
export const maybeYouCardData = {
  /**
   * Translation key for the title of the card.
   */
  titleKey: 'team_page.maybe_you_title',
  /**
   * Translation key for the descriptive text of the card.
   */
  textKey: 'team_page.maybe_you_text',
};
