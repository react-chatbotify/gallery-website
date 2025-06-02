import { HTMLMotionProps, motion } from 'framer-motion';
import { FC, ReactNode } from 'react';

// Define Props type that extends standard div attributes for ...otherProps
interface Props extends Omit<HTMLMotionProps<'div'>, 'children' | 'transition'> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  // yOffset and viewAmount are currently hardcoded in the component
  // If they need to be props, add them here.
}

/**
 * Wraps its children in a Framer Motion div that fades and slides in
 * when scrolled into view.
 *
 * @param children the React nodes to animate
 * @param delay time in seconds to wait before starting the animation (default: 0)
 * @param duration length of the fade/slide animation in seconds (default: 0.6)
 */
const FadeInOnView: FC<Props> = ({ children, delay = 0, duration = 0.6, ...otherProps }) => {
  // animate opacity and vertical offset when element enters viewport
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} // y: 16 is the hardcoded offset
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration }}
      viewport={{ amount: 0.3, once: true }} // amount: 0.3 is hardcoded
      {...otherProps} // Spread other props like className, style, etc.
    >
      {children}
    </motion.div>
  );
};

export default FadeInOnView;
