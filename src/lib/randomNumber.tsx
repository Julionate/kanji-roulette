export const randomNumber = (max: number = 25, min: number = 0) => {
  return Math.floor(Math.random() * max + min);
};
