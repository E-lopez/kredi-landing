import { useEffect, useRef } from "react";
import { useScroll } from "@/hooks/domEvents/useScroll";
import { startButton } from "@/animations/home/startbutton/startButton";
import icon from '@assets/whatsapp.png';
import { useMatchMedia } from "@/hooks/domEvents/useMatchMedia";
import WhatsAppTemplates from "@/constants/WhatsAppTemplates";


const StartButton = () => {  
  const targetRef: any = useRef();
  const { scrollTop, scrollDir, scrolledProp } = useScroll();
  const { query } = useMatchMedia();
  const number = WhatsAppTemplates.get('MAIN_NUMBER');
  const message = WhatsAppTemplates.get('MAIN_MESSAGE');

  useEffect(() => {
    startButton(targetRef, scrollDir, scrolledProp, query);
  }, [scrollTop]);

  return(
    <a
      aria-label="Chat on WhatsApp"
      className="start-button" 
      ref={targetRef}
      href={`https://wa.me/${number}?text=${message}`}
    >
      <img src={icon} alt='' />
      <p>Comienza aquí!</p>
    </a>
  )
}

export default StartButton;
