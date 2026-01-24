export const footer = (...args: any): void => {
  const [ targetRef, scrollDir, scrolledProp, query ] = args;
  const parent = targetRef.current;
  const yLimit = query === 'sm' ? 0.6 : 0.3

  if(scrollDir) {
    parent.style.transform = 'translateY(100%)';
    parent.style.backgroundColor = 'rgba(251,231,78,1)';
    parent.style.transition = 'all .5s ease-out allow-discrete';

  } 
  if(scrolledProp > yLimit && !scrollDir) {
    parent.style.transform = 'translateY(0%)';

    parent.style.transition = 'all .5s';
  }
};