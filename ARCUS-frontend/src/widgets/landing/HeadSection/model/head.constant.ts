import HeadImage from "../assets/dashboard-preview.webp";

export const HEAD_CONSTANT = {
  badge: "Beta Version",
  title: "Welcome to ARCUS",
  description: "All your data, actions, and insights unified in a single dashboard.",
  trustNote: "No credit card required · Cancel anytime",
  visual: {
    imageSrc: HeadImage,
    alt: "Product preview",
  },
} as const;
