import { Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import useFetchContributorsAvatars from '../../hooks/useFetchContributorsAvatar';
import Avatar from './Avatar';

const TOTAL_AVATARS = 8;

/**
 * Holds groups of avatars representing contributors to a project (repository).
 * 
 * @param repoUrl url to the project repository
 * @param repoName name of the project repository (matches github repo)
 * @param repoTitle title of the project repository (descriptive name)
 */
const AvatarsGroup: React.FC<{
  repoUrl: string;
  repoName: string;
  repoTitle: string
}> = ({
  repoUrl,
  repoName,
  repoTitle
}) => {
  // fetch contributors of a given project repository
  const { contributors, totalCount, loading, error } = useFetchContributorsAvatars(repoName);

  // if error fetching contributors for whatever reason, then simply do not show avatars
  // todo: consider caching contributors in local storage as a fallback mechanism
  if (error) {
    return <></>
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: { xs: 'center', lg: 'flex-start' },
        gap: 2,
      }}
    >
      {/* Repository Title Link */}
      <Link
        to={repoUrl}
        target="_blank"
        style={{
          fontWeight: 500,
          fontSize: '1.125rem',
          color: 'text.secondary',
          textDecoration: 'underline',
        }}
      >
        {repoTitle}
      </Link>

      {/* Avatars Container */}
      {loading ?
        <CircularProgress /> :
        <Box
          sx={{
            display: 'flex',
            overflow: 'hidden',
            padding: 1,
          }}
        >
          {contributors.slice(0, TOTAL_AVATARS).map((contributor, index) => (
            <Box
              key={contributor.login}
              sx={{
                position: 'relative',
                marginLeft: index > 0 ? -2.5 : 0,
              }}
            >
              <Avatar
                src={contributor.avatar_url}
                alt={contributor.login}
                href={contributor.html_url}
              />
            </Box>
          ))}

          {/* Counter Avatar */}
          {!(totalCount < TOTAL_AVATARS) && (
            <Box
              sx={{
                position: 'relative',
                marginLeft: -1.5,
              }}
            >
              <Avatar totalCount={`${totalCount}`} href={repoUrl} />
            </Box>
          )}
        </Box>
      }
    </Box>
  );
};

export default AvatarsGroup;
