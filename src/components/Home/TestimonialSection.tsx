import useIsDesktop from "@/hooks/useIsDesktop";
import { Testimonial, TestimonialCardProps } from "@/interfaces/HomePage";
import { Avatar, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { HeadingAndDescription } from "./FeaturesAndBenefitsSection";


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
   
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 40
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 40
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ avatar, name, username, text }) => (
  <Box
    sx={{
      maxWidth: 320,
      width: "100%",
      p: 3,
      borderRadius: "12px",
      border: "1px solid",
      borderColor: "background.muted",
    }}
  >
    <Typography variant="body1" sx={{ mb: 2 }}>
      {text}
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Avatar src={avatar} alt={name} sx={{ width: 40, height: 40 }} />
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
  <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center" }}>
    {items.slice(0, 5).map((item, index) => (
      <TestimonialCard key={index} {...item} />
    ))}
  </Box>
);

const TestimonialSection: React.FC = () => {
  const isDesktop: boolean = useIsDesktop();
  const {t} = useTranslation("components/home");
  const items: Testimonial[] = [
    {
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      name: "Steve Wozniak",
      username: "steviak",
      text: "The theme gallery was sooo massive, I legit had trouble picking out the perfect one for my needs but I found one and boom, good to go!",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      name: "Sarah Connor",
      username: "sarahc",
      text: "The attention to detail in these templates is just insane. I love it!",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      name: "Elon Tusk",
      username: "eltusk",
      text: "Super intuitive and well-designed. A must-have for any project!",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      name: "Ada Lovelace",
      username: "adalove",
      text: "The best investment I’ve made this year. Highly recommended!",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      name: "Linus Torvalds",
      username: "linust",
      text: "I don’t usually leave reviews, but this deserves it. Fantastic work!",
    },
  ];

  return (
    <Box sx={{ position: "relative", display: "grid", gap: 10, py: 5 }}>
      <HeadingAndDescription
        heading={t("testimonials_section.title")}
        description={t("testimonials_section.heading.1")}
      />

      {isDesktop ? (
        <Carousel
          responsive={responsive}
          swipeable
          draggable
          showDots={false}
          infinite={false}
          partialVisible
          keyBoardControl
        >
          {items.map((item, index) => (
            <TestimonialCard key={index} {...item} />
          ))}
        </Carousel>
      ) : (
        <MobileTestimonials items={items} />
      )}
    </Box>
  );
};

export default TestimonialSection;
