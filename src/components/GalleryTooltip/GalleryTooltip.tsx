import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

/**
 * Shows tooltip for children based on specified content and placement (top, left, right or bottom).
 * 
 * @param content text content to include in tooltip
 * @param placement placement of the tooltip
 * @param children element to show the tooltip for
 */
const GalleryTooltip: React.FC<{
  content: string;
  placement?: "top" | "right" | "bottom" | "left";
  children: React.ReactElement;
}> = ({
  content,
  placement = "right",
  children
}) => {
  return (
    <Tooltip
      title={
        <Typography style={{ fontSize: "0.9rem", lineHeight: 1.5 }}>
          {content}
        </Typography>
      }
      placement={placement}
      arrow
    >
      {children}
    </Tooltip>
  );
};

export default GalleryTooltip;
