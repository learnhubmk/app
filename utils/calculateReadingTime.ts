const calculateReadingTime = (content: string): string => {
  const words = content.split(/\s+/).length;
  const time = Math.ceil(words / 265);
  return `${time} мин за читање`;
};

export default calculateReadingTime;
