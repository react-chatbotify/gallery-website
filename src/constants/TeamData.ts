import { TeamMember } from '@/interfaces/TeamMember';
import { Endpoints } from '@/constants/Endpoints';

/**
 * Array of team members for the project.
 */
export const teamMembers: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Alex Doe',
    githubUrl: 'https://github.com/octocat',
    roles: ['Core Maintainer', 'Lead Developer'],
    avatarUrl: 'https://i.pravatar.cc/150?u=member-1',
  },
  {
    id: 'member-2',
    name: 'Jamie Lan',
    githubUrl: 'https://github.com/torvalds', // Linus Torvalds' GitHub for variety
    roles: ['Documentation Lead', 'Community Support'],
    // avatarUrl is intentionally left undefined to test fallback
  },
  {
    id: 'member-3',
    name: 'Sam Ray',
    githubUrl: 'https://github.com/gaearon', // Dan Abramov's GitHub for variety
    roles: ['UI/UX Designer', 'Frontend Specialist'],
    avatarUrl: 'https://i.pravatar.cc/150?u=member-3',
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
  /**
   * URL for the call-to-action button, typically linking to contribution guidelines.
   */
  ctaUrl: `${Endpoints.projectCoreRepoUrl}/blob/main/CONTRIBUTING.md`,
};
