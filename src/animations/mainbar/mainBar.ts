import { sigmoid } from "../helpers/functions/mathFunctions";

export const mainBar = (...args: any[]): void => {
  const [ targetRef, scrollTop, scrollDir ] = args;
  const parent = targetRef.current;
  const factor = Math.floor(sigmoid(Math.min(38, scrollTop)-100/5)*80);
  const scrollFactor = scrollDir ? Math.max(0, factor *-1): factor;

  parent.style.transform = `translateY(${-scrollFactor}px)`;
  parent.style.transition = 'all .5s ease-out allow-discrete';
};