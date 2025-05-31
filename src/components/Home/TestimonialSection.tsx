import { Avatar, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import useIsDesktop from '@/hooks/useIsDesktop';
import { Testimonial, TestimonialCardProps } from '@/interfaces/HomePage';

import { HeadingAndDescription } from './FeaturesAndBenefitsSection';

// const responsive = {
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 3,
//     partialVisibilityGutter: 40,
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//   },
//   superLargeDesktop: {
//     // the naming can be any, depends on you.
//     breakpoint: { max: 4000, min: 3000 },
//     items: 5,
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 2,
//     partialVisibilityGutter: 40,
//   },
// };

const TestimonialCard: React.FC<TestimonialCardProps> = ({ avatar, name, username, text }) => (
  <Box
    sx={{
      border: '1px solid',
      borderColor: 'background.muted',
      borderRadius: '12px',
      maxWidth: 320,
      p: 3,
      width: '100%',
    }}
  >
    <Typography variant="body1" sx={{ mb: 2 }}>
      {text}
    </Typography>
    <Box sx={{ alignItems: 'center', display: 'flex', gap: 2 }}>
      <Avatar src={avatar} alt={name} sx={{ height: 40, width: 40 }} />
      <Box>
        <Typography variant="body2" fontWeight={600}>
          {name}
        </Typography>
        <Typography variant="caption" color="gray">
          {username}
        </Typography>
      </Box>
    </Box>
  </Box>
);

const MobileTestimonials: React.FC<{ items: Testimonial[] }> = ({ items }) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
    {items.slice(0, 5).map((item, index) => (
      <TestimonialCard key={index} {...item} />
    ))}
  </Box>
);

const TestimonialSection: React.FC = () => {
  const isDesktop: boolean = useIsDesktop();
  const { t } = useTranslation('components/home');
  const items: Testimonial[] = [
    {
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      name: 'Steve Wozniak',
      text: 'The theme gallery was sooo massive, I legit had trouble picking out the perfect one for my needs but I found one and boom, good to go!',
      username: 'steviak',
    },
    {
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      name: 'Sarah Connor',
      text: 'The attention to detail in these templates is just insane. I love it!',
      username: 'sarahc',
    },
    {
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      name: 'Elon Tusk',
      text: 'Super intuitive and well-designed. A must-have for any project!',
      username: 'eltusk',
    },
    {
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      name: 'Ada Lovelace',
      text: 'The best investment I’ve made this year. Highly recommended!',
      username: 'adalove',
    },
    {
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      name: 'Linus Torvalds',
      text: 'I don’t usually leave reviews, but this deserves it. Fantastic work!',
      username: 'linust',
    },
  ];

  return (
    <Box sx={{ display: 'grid', gap: 10, position: 'relative', py: 5 }}>
      <HeadingAndDescription
        heading={t('testimonials_section.title')}
        description={t('testimonials_section.heading.1')}
      />

      {isDesktop ? (
        <></>
      ) : (
        // <Carousel
        //   responsive={responsive}
        //   swipeable
        //   draggable
        //   showDots={false}
        //   infinite={false}
        //   partialVisible
        //   keyBoardControl
        // >
        //   {items.map((item, index) => (
        //     <TestimonialCard key={index} {...item} />
        //   ))}
        // </Carousel>
        <MobileTestimonials items={items} />
      )}
    </Box>
  );
};

export default TestimonialSection;
