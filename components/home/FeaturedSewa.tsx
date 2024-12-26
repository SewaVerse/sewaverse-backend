import SewaSection from "./SewaSection";

const categoryNames = [
  { id: 0, name: "All Services" },
  { id: 1, name: "Plumbing" },
  { id: 2, name: "Counselling" },
  { id: 3, name: "Cleaning" },
  { id: 4, name: "Mechanic" },
  { id: 5, name: "Hair Stylist" },
];

const details = [
  {
    title: "Painting | Exterior | Interior",
    description: "All kind of painting work",
    image: "/images/image1.webp",
    price: "10,000",
    originalPrice: "20,000",
    discount: "30%",
    name: "Emma Clark",
    rating: 4.5,
  },
  {
    title: "Beautician | Bridal | Event",
    description: "Book professional for the event",
    image: "/images/image2.webp",
    price: "5,000",
    originalPrice: "7,000",
    discount: null,
    name: "Emily Wilson",
    rating: 4.0,
  },
  {
    title: "Child care | Night | Day",
    description: "Guider for your child development",
    image: "/images/image3.webp",
    price: "10,000",
    originalPrice: "12,000",
    discount: null,
    name: "Isabella Adams",
    rating: 4.8,
  },
  {
    title: "Mechanics | Repair | Replace",
    description: "Inspect your home for problem solving",
    image: "/images/image4.webp",
    price: "15,000",
    originalPrice: "18,000",
    discount: "20%",
    name: "John Ward",
    rating: 4.5,
  },
];

const FeaturedSewa = () => {
  return (
    <SewaSection
      name="Featured Sewas"
      cateogryNames={categoryNames}
      details={details}
    />
  );
};

export default FeaturedSewa;
