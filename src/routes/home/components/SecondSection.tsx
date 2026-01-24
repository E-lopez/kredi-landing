import { useEffect, useRef } from "react";
import { useScroll } from "@/hooks/domEvents/useScroll";
import secondaryBackground from "@/assets/woman.png";
import { cardsContent } from "../models/constants/SecondarySectionContent";
import { animationMethod } from "@/animations/home/sections/sections";
import { useMatchMedia } from "@/hooks/domEvents/useMatchMedia";


const SecondSection = () => {  
  const targetRef: any = useRef();
  const { scrollTop, scrollDir, scrolledProp } = useScroll();
  const { query } = useMatchMedia();

  useEffect(() => {
    animationMethod(query, 'second', targetRef, scrollDir, scrolledProp);
  }, [scrollTop]);

  return(
    <section id="test" className='section second-section' ref={targetRef}>
      <div className="second-section__content-box">
        {Object.keys(cardsContent).map((key, i) => {
            const cards = cardsContent[key as keyof typeof cardsContent]
            return (
              <div key={key} className='second-section__col'>
                {cards.map((card) => {
                    return (
                      <div 
                        key={card.pill+i} 
                        className="text-card"
                        style={{ height: `${card.height}`}}
                      >
                        <div className="text-card__content">
                          <p className="paragraph paragraph--md">{ card.content }</p>
                          <div className="text-card__pill">
                            <p className="paragraph">{ card.pill }</p>
                          </div>
                        </div>
                        <div className="text-card__icon">
                          <i className={`${card.icon}`}></i>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
      <div>
        <div className="second-section__image-box">
          <img src={secondaryBackground} alt="people trust" />
        </div>
        <div className="second-section__title">
          <h1 className="paragraph paragraph--lg u-center-text">Te ayudamos<br/>con lo que necesitas</h1>
        </div>
      </div>
    </section>
  )
}

export default SecondSection;
