import { Box } from "@mui/material";
import { Link } from "react-router-dom";

/**
 * Displays an avatar image for a contributor of the project.
 * 
 * @param src src image for the avatar
 * @param alt text to show if image is not available
 * @param totalCount if specified, avatar will show a total number count instead of an image
 * @param href link that user is brought to if the avatar is clicked
 */
const Avatar: React.FC<{
  src?: string;
  alt?: string;
  totalCount?: string;
  href?: string;
}> = ({
  src,
  alt,
  totalCount,
  href = ""
}) => {
  if (totalCount)
    return (
      <Link
        to={href}
        target="_blank"
        style={{ textDecoration: "none" }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "accent.800",
            border: "1px solid",
            borderColor: "accent.50",
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: "secondary.500",
            },
          }}
        >
          +{totalCount}
        </Box>
      </Link>
    );

  return (
    <Link
      to={href}
      target="_blank"
      style={{ textDecoration: "none" }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          display: "inline-block",
          border: "1px solid",
          borderColor: "accent.50",
          transition: "all 0.3s ease",
          "&:hover": {
            border: "2px solid",
            borderColor: "secondary.500",
          },
        }}
      />
    </Link>
  );
};

export default Avatar;
