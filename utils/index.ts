import { ChangeEvent } from "react";

export const inputFilter = (e: ChangeEvent<HTMLInputElement>) => {
  const target = e.target as HTMLInputElement;
  target.value = target.value
    .replace(/[^0-9.]/g, "")
    .replace(/(\..*?)\..*/g, "$1")
    .replace(/^0[^.]/, "0");
  return target.value;
};
