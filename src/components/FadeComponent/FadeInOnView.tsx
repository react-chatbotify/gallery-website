import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';

/**
 * Wraps its children in a Framer Motion div that fades and slides in
 * when scrolled into view.
 *
 * @param children the React nodes to animate
 * @param delay time in seconds to wait before starting the animation (default: 0)
 * @param duration length of the fade/slide animation in seconds (default: 0.6)
 */
const FadeInOnView: FC<{
  children: ReactNode;
  delay?: number;
  duration?: number;
}> = ({ children, delay = 0, duration = 0.6 }) => {
  // animate opacity and vertical offset when element enters viewport
  return (
    <motion.div
      style={{ display: 'contents' }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration }}
      viewport={{ amount: 0.3, once: true }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInOnView;
