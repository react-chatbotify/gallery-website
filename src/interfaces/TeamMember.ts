/**
 * Represents a team member.
 */
export interface TeamMember {
  /**
   * The unique identifier for the team member.
   */
  id: string;

  /**
   * The name of the team member.
   */
  name: string;

  /**
   * The GitHub profile URL of the team member.
   */
  githubUrl: string;

  /**
   * An array of roles the team member has.
   */
  roles: string[];

  /**
   * The URL of the team member's avatar image (optional).
   */
  avatarUrl?: string;
}
