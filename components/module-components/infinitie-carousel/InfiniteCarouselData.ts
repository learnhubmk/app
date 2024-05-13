const InfiniteCarouselData = [
  'UI/UX Design',
  'Frontend Development',
  'Backend Development',
  'Quality Assurance',
  'Marketing',
  'DevOps',
  'Product Management',
];

const repeatCount = 4;

// Create a new array by concatenating the original array multiple times
const multipliedArray = Array.from({ length: repeatCount }, () => InfiniteCarouselData).flat();

export default multipliedArray;
