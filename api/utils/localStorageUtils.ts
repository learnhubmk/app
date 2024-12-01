export const saveToLocalStorage = (key: string, value: any): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    console.log(`Saved to localStorage: ${key}`, value);
  } catch (error) {
    console.error(`Error saving to localStorage: ${key}`, error);
  }
};

export const getFromLocalStorage = (key: string): any => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return null;
    }
    return JSON.parse(serializedValue);
  } catch (error) {
    console.error(`Error getting from localStorage: ${key}`, error);
    return null;
  }
};

export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
    console.log(`Removed from localStorage: ${key}`);
  } catch (error) {
    console.error(`Error removing from localStorage: ${key}`, error);
  }
};
