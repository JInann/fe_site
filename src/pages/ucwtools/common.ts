import api from "./api";

export const imgs = (imgName: string) => {
  return import.meta.globEager("./img/*.png")["./img/" + imgName + ".png"]
    .default;
};
export { api };
