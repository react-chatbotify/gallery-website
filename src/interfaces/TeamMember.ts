// file: interfaces/TeamMember.ts

/**
 * Represents a specific role held by a team member,
 * optionally associated with a project.
 */
export interface Role {
  /**
   * The name of the role (e.g., "Lead Developer", "UI/UX Designer").
   */
  name: string;
  /**
   * Links to direct the user to when this role is clicked.
   */
  link: string;
  /**
   * The name of the project this role is associated with.
   * Optional, for global roles like "Core Maintainer".
   */
  project?: string;
}

/**
 * Represents a team member in the project.
 */
export interface TeamMember {
  /**
   * Unique identifier for the team member.
   */
  id: string;
  /**
   * Full name of the team member.
   */
  name: string;
  /**
   * URL to the team member's GitHub profile.
   */
  githubUrl: string;
  /**
   * Array of roles held by the team member.
   */
  roles: Role[];
  /**
   * URL to the team member's avatar image. Optional.
   */
  avatarUrl?: string;
}
