export const startButton = (...args: any): void => {
  const [ targetRef, scrollDir, scrolledProp, query ] = args;
  const button = targetRef.current;
  const paragraph = button.querySelector('p');
  const yLimit = query === 'sm' ? 0.6 : 0.3;
  const buttonTop = query === 'sm' ? '95%' : '90%'

  if(scrolledProp <= 0.003 && scrollDir) {
    paragraph.style.fontSize = '1.6rem';
    paragraph.style.margin = '0 1rem';
    paragraph.style.transition = 'all .5s';

    button.style.color = '#000';
    button.style.top = '60%';
    button.style.gap = '1rem';
    button.style.width = '23rem';
    button.style.transform = 'translate(-50%, 50%)';
    button.style.transition = 'all .5s ease-out allow-discrete';
  } 
  if(scrolledProp > 0.003 && !scrollDir) {
    paragraph.style.fontSize = '0';
    paragraph.style.margin = '0';
    paragraph.style.transition = 'all .15s';

    button.style.top = buttonTop;
    button.style.color = '#000';
    button.style.gap = '0';
    button.style.width = '10rem';
    button.style.transform = 'translate(-50%, -90%)';
    button.style.transition = 'all .5s, background-color 3s';
  }
  if(scrolledProp > yLimit && !scrollDir) {
    button.style.zIndex = -1;
  } else {
    button.style.zIndex = 10;
  }
};
