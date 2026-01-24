import { randomColor } from "./functions/colorFunctions";
import { getRandomInt } from "./functions/mathFunctions";

export const animateCards = (cards: any[], scrollDir: any, iter = 0
) => {
  if(cards.length === iter) return;

  const card = cards[iter];  
  const randomizedDuration = getRandomInt(1, 3)
  card.style.transform = scrollDir ? 'translateY(200%)' : 'translateY(0%)';
  card.style.opacity = scrollDir ? 0 : 1;
  card.style.backgroundColor = randomColor();
  card.style.transition = `all ${randomizedDuration}s`;   
  iter += 1;

  animateCards(cards, scrollDir, iter);  
};