import { useScroll } from "@/hooks/domEvents/useScroll";
import { mainBar } from "@/animations/mainbar/mainBar";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuComponent from "../menuComponent/MenuComponent";

import img from '@assets/logo_1.png';
import WhatsAppTemplates from "@/constants/WhatsAppTemplates";

const MainBar = () => {
  const [ showMenu, setShowMenu ] = useState(false);
  const targetRef: any = useRef();
  const { scrollTop, scrollDir } = useScroll();
  let location = useLocation();

  const number = WhatsAppTemplates.get('MAIN_NUMBER');
  const message = WhatsAppTemplates.get('MAIN_MESSAGE');

  const toggleMenu = () => {
    setShowMenu((prevState: boolean) => !prevState);
  }

  useEffect(() => {
    mainBar(targetRef, scrollTop, scrollDir);
  }, [scrollTop]);
  
  return(
    <>
      <nav className="main-bar" ref={targetRef}>
        <div className="main-bar__container">
          <div className="main-bar__home-icon">
          <Link to="/" className="main-bar__home-icon">
            <img src={img} alt={'kredit logo'} />
          </Link>
          </div>

          <div className="main-bar__center-buttons u-resp u-lg u-xl u-xxl">
            <Link to="que-es-kredi" className="u-mr-2">Qué es kredi</Link>
            <p>|</p>
            <Link to="faq" className="u-ml-2">Preguntas frecuentes</Link>
            <p>|</p>
            <Link to="contacto" className="u-ml-2">Ayuda</Link>
          </div>

          <div className="main-bar__user-buttons u-resp u-lg u-xl u-xxl">
            <a 
              aria-label="Chat on WhatsApp"
              href={`https://wa.me/${number}?text=${message}`}
              className={`main-bar__cta-button ${location.pathname !== '/' && 'main-bar__cta-button--hidden'}`}
            >
              Comienza!
            </a>
          </div>          

          <div className="main-bar__responsive-buttons u-resp u-xxs u-xs u-md">
            {location.pathname === '/' && 
              <a 
                aria-label="Chat on WhatsApp"
                href={`https://wa.me/${number}?text=${message}`}
                className="main-bar__cta-button"
              >
                Comienza!
              </a>
            }
            <button onClick={toggleMenu} className="main-bar__hamburguer-button">
              <i className='bi-list'></i>
            </button>
          </div>
        </div>
      </nav>
      <MenuComponent showModal={showMenu} toggleMenu={toggleMenu} />
    </>
  )
};

export default MainBar;