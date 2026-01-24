import { useEffect, useRef } from "react";
import { useScroll } from "@/hooks/domEvents/useScroll";
import { cardsContent } from "../models/constants/ThirdSectionContent";
import { animationMethod } from "@/animations/home/sections/sections";
import { useMatchMedia } from "@/hooks/domEvents/useMatchMedia";


const ThirdSection = () => {  
  const targetRef: any = useRef();
  const { scrollTop, scrollDir, scrolledProp } = useScroll();
  const { query } = useMatchMedia();


  useEffect(() => {
    animationMethod(query, 'third', targetRef, scrollDir, scrolledProp);
  }, [scrollTop]);

  return(
    <section className='section third-section' ref={targetRef}>
      <div className="third-section__box">
        <div className="third-section__header">
          <h2 
          className="heading-sub u-right-text">Queremos verte avanzar</h2>
          <h1
            className="heading-primary heading-primary--general u-right-text u-mb-20"
          >
            <span className="gray">k<span className="blue">r</span>edi</span> te ayuda:
          </h1>
        </div>
        <div className="third-section__cards u-mt-20">
          {cardsContent.map((card) => {
            return(
              <div 
                className="third-section__card" 
                key={card.key}
              >
                <div className="third-section__card-text paragraph paragraph--md">
                  {card.content}
                </div>
                <div className="third-section__card-icon">
                  <i className={`${card.icon}`} style={{fontSize: '8rem'}}></i>
                </div>
              </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default ThirdSection;
