import { animateCards } from "@/animations/helpers/animationHelpers";
import { mediaQuery } from "@/models/types/mediaQuerie";

const common = {
  main: (...args: any[]): void => {
    const { current: parent }: { current: HTMLElement; } = args[0];
    const scrollTop: number = args[1];
    
    const heading = parent.querySelector('h1') as HTMLElement;
    const secondary = parent.querySelector('h2') as HTMLElement;
    const factor = 1-(1/(1+ Math.exp(-(Math.log10(scrollTop)))));
    const opacityFactor = factor < 0.17 ? 0 : factor;
  
    heading.style.opacity = `${opacityFactor}`;
    heading.style.transform = `scale(${Math.max(0.9, factor)})`;
    heading.style.transition = 'all .5s ease-out allow-discrete';
  
    secondary.style.opacity = `${opacityFactor}`;
    secondary.style.transition = 'all .5s .25s ease-out allow-discrete';
  }
};

const animations_xl = {
  second: (...args: any[]): void => {
    const [ targetRef, scrollDir, scrolledProp ] = args;
    const parent = targetRef.current;

    if(scrolledProp <= 0.05 && scrollDir) {
      parent.style.transform = 'translateY(80%)';
      parent.style.position = 'unset';
      parent.style.backgroundColor = '#ecefec';
      parent.style.transition = 'all .5s ease-out allow-discrete';
    } 
    if(scrolledProp > 0.001 && !scrollDir) {
      parent.style.transform = 'translateY(0%)';
      parent.style.position = 'fixed';
      parent.style.backgroundColor = '#FFF5F0';
      parent.style.transition = 'all .5s, background-color 3s';
    }
      
    parent.addEventListener("transitionend", (e: TransitionEvent) => { 
      e.stopImmediatePropagation() 
      if (e.elapsedTime === 0.5 && e.propertyName === 'transform') {
        const cards = parent.querySelectorAll('.text-card');  
        animateCards(cards, scrollDir)  
      }
    })
  },
  third: (...args: any[]): void => {
    const [ targetRef, scrollDir, scrolledProp ] = args;
    const parent = targetRef.current;

    if((scrolledProp >= 0.1 && scrolledProp < 0.2) && scrollDir) {
      parent.style.transform = 'translateY(120%)';
      parent.style.backgroundColor = '#ecefec';
      parent.style.transition = 'all .5s ease-out allow-discrete';
    } 
    if(scrolledProp > 0.1 && !scrollDir) {
      parent.style.transform = 'translateY(0%)';
      parent.style.backgroundColor = '#fff';
      parent.style.transition = 'all .5s, background-color 3s';
    }
  }
};


const animations_lg = {
  second: (...args: any[]): void => {
    const [ targetRef, scrollDir, scrolledProp ] = args;
    const parent = targetRef.current;

    if(scrolledProp <= 0.003 && scrollDir) {
      parent.style.transform = 'translateY(80%)';
      parent.style.position = 'unset';
      parent.style.backgroundColor = '#ecefec';
      parent.style.transition = 'all .5s ease-out allow-discrete';
    } 
    if(scrolledProp > 0.003 && !scrollDir) {
      parent.style.transform = 'translateY(0%)';
      parent.style.position = 'fixed';
      parent.style.backgroundColor = '#FFF5F0';
      parent.style.transition = 'all .5s, background-color 3s';
    }
      
    parent.addEventListener("transitionend", (e: TransitionEvent) => { 
      e.stopImmediatePropagation() 
      if (e.elapsedTime === 0.5 && e.propertyName === 'transform') {
        const cards = parent.querySelectorAll('.text-card');  
        animateCards(cards, scrollDir)  
      }
    })
  },
  third: (...args: any[]): void => {
    const [ targetRef, scrollDir, scrolledProp ] = args;
    const parent = targetRef.current;

    if((scrolledProp >= 0.155 && scrolledProp < 0.2) && scrollDir) {
      parent.style.transform = 'translateY(120%)';
      parent.style.backgroundColor = '#ecefec';
      parent.style.transition = 'all .5s ease-out allow-discrete';
    } 
    if(scrolledProp > 0.155 && !scrollDir) {
      parent.style.transform = 'translateY(0%)';
      parent.style.backgroundColor = '#fff';
      parent.style.transition = 'all .5s, background-color 3s';
    }
  }
};


const animations_sm = {
  second: (...args: any[]): void => {
    const [ targetRef, scrollDir, scrolledProp ] = args;
    const parent = targetRef.current;

    if(scrolledProp <= 0.003 && scrollDir) {
      parent.style.transform = 'translateY(25%)';
      parent.style.transition = 'all .5s ease-out allow-discrete';
    } 
    if(scrolledProp > 0.003 && !scrollDir) {
      parent.style.transform = 'translateY(-35%)';
      parent.style.transition = 'all .5s, background-color 3s';
    }
      
    parent.addEventListener("transitionend", (e: TransitionEvent) => { 
      e.stopImmediatePropagation() 
      if (e.elapsedTime === 0.5 && e.propertyName === 'transform') {
        const cards = parent.querySelectorAll('.text-card');  
        animateCards(cards, scrollDir)  
      }
    })
  },
  third: (...args: any[]): void => {
    const [ targetRef, scrollDir, scrolledProp ] = args;
    const parent = targetRef.current;
    
    if((scrolledProp >= 0.155 && scrolledProp < 0.2) && scrollDir) {
      parent.style.transform = 'translateY(0%)';
      parent.style.transition = 'all .5s ease-out allow-discrete';
    } 
    if(scrolledProp > 0.155 && !scrollDir) {
      parent.style.transform = 'translateY(-25%)';

      parent.style.transition = 'all .5s, background-color 3s';
    }
  }
};

const animations: {[key in mediaQuery]?: any} = {
  xl: animations_xl,
  lg: animations_lg,
  md: animations_sm,
  sm: animations_sm,
};

export const getAnimation = (query: keyof typeof animations) => {
  return {...common, ...animations[query]};
};