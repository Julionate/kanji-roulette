export const localStorageNotExists = () => {
  if (typeof window === "undefined") return true;
  try {
    localStorage.getItem("test");
    return false;
  } catch {
    return true;
  }
};
