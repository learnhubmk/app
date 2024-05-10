const InfiniteCarouselData = [
  {
    text: 'UI/UX Design',
  },
  {
    text: 'Frontend Development',
  },
  {
    text: 'Backend Development',
  },
  {
    text: 'Quality Assurance',
  },
  {
    text: 'Marketing',
  },
  {
    text: 'DevOps',
  },
  {
    text: 'Product Management',
  },
];

const repeatCount = 4;

// Create a new array by concatenating the original array multiple times
const multipliedArray = Array.from({ length: repeatCount }, () => [...InfiniteCarouselData]).flat();

export default multipliedArray;
