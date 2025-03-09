export type Testimonial = {
  avatar: string;
  name: string;
  username: string;
  text: string;
}

export type TestimonialCardProps = {
  avatar: string;
  name: string;
  username: string;
  text: string;
}

export interface PrimaryFeature  {
  icon: JSX.Element;
  heading: string;
  description: string;
  actionText: string;
}

export type FeatureItemProps = {
  onClick: () => void;
  selected: boolean;
} & PrimaryFeature

export interface SecondaryFeature  {
  Icon: React.ElementType;
  title: string;
  description: string;
}