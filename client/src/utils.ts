export const qs = <T extends HTMLElement>(selector: string) => {
  const el: T | null = document.querySelector(selector);
  if (!el) throw new Error(`${selector}가 없습니다.`);
  return el;
};
export const qsa = <T extends HTMLElement>(selector: string) => {
  const elArr: NodeListOf<T> = document.querySelectorAll(selector);
  return [...elArr] as T[];
};
