import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

/**
 * Shows tooltip for children based on specified content and placement (top, left, right or bottom).
 *
 * @param content text content to include in tooltip
 * @param placement placement of the tooltip
 * @param children element to show the tooltip for
 */
const GalleryTooltip: React.FC<{
  content: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  children: React.ReactElement;
}> = ({ content, placement = 'right', children }) => {
  const [open, setOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(hover: none)').matches);
  }, []);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleClick = () => {
    if (isTouchDevice) {
      setOpen((prevOpen) => !prevOpen);
    }
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      handleTooltipOpen();
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      handleTooltipClose();
    }
  };

  return (
    <Tooltip
      title={<Typography style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>{content}</Typography>}
      placement={placement}
      arrow
      open={open}
      onClose={handleTooltipClose}
      onOpen={handleTooltipOpen}
      disableFocusListener
      disableHoverListener={!isTouchDevice}
      disableTouchListener={isTouchDevice}
    >
      <span onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </span>
    </Tooltip>
  );
};

export default GalleryTooltip;
