type Styles = { [key: string]: string };

const setClass = (classes: string[], style: Styles) => {
  return classes.map((className) => style[className]).join(' ');
};

export default setClass;
