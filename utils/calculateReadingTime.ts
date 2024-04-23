const calculateReadingTime = (content: string) => {
  const words = content.split(/\s/g).length;
  const time = Math.ceil(words / 265);
  const formattedTime = `${time} мин за читање`;
  return formattedTime;
};

export default calculateReadingTime;
