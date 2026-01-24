import { mediaQuery } from "@/models/types/mediaQuerie";
import { getAnimation } from "./sectionAnimation";


export function animationMethod(query: mediaQuery, section: string, ...rest: any[]) {
  const animations = getAnimation(query);
  return animations[section] ? animations[section](...rest) : null;
}