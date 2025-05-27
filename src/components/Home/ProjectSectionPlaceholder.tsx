import { Box, useTheme } from '@mui/material';

const SkeletonCard = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: '540px',
        height: '490px', // Approximate height: CardMedia (200) + CardContent (padding, title, description, contributors)
        backgroundColor: theme.palette.action.hover,
        borderRadius: theme.shape.borderRadius * 3, // Matches ProjectCard (12px)
      }}
    />
  );
};

const ProjectSectionPlaceholder = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        gap: theme.spacing(3), // Matches ProjectSection's card gap
        overflow: 'hidden', // Prevent scrollbars for the placeholder itself
        // padding to roughly align with where ProjectSection content might start, considering section padding
        // ProjectSection has <Box sx={{ display: 'grid', gap: 6 }}> and then the scrolling container.
        // The placeholder will replace the scrolling container part.
        // No explicit padding needed here as the parent ProjectSection's padding will apply.
      }}
    >
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </Box>
  );
};

export default ProjectSectionPlaceholder;
