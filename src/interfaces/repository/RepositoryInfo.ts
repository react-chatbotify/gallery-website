import { ProjectContributor } from './ProjectContributor';

// repository information
type RepositoryInfo = {
  name: string;
  description: string;
  repoUrl: string;
  contributors: ProjectContributor[];
  totalCount: number;
  stars: number;
  forks: number;
  loading: boolean;
  error?: Error | null;
};

export type { RepositoryInfo };
