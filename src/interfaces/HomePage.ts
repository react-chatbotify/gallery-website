import React from 'react';

export type Testimonial = {
  avatar: string;
  name: string;
  username: string;
  text: string;
};

export type TestimonialCardProps = {
  avatar: string;
  name: string;
  username: string;
  text: string;
};

export type PrimaryFeature = {
  Icon: React.ElementType;
  heading: string;
  description: string;
  actionText: string;
};

export type FeatureItemProps = {
  onClick: () => void;
  selected: boolean;
} & PrimaryFeature;

export type SecondaryFeature = {
  Icon: React.ElementType;
  title: string;
  description: string;
};
