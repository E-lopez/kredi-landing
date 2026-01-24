import { useEffect, useRef, useState } from "react";
import { useScroll } from "@/hooks/domEvents/useScroll";
import { animationMethod } from "@/animations/home/sections/sections";
import { useMatchMedia } from "@/hooks/domEvents/useMatchMedia";

const labels = [
  {label: 'honestos', color: 'blue', bg: 'pink'},
  {label: 'rápidos', color: 'pink', bg: '#6d98cc'},
  {label: 'seguros', color: 'gray', bg: 'yellow'},
  {label: 'fáciles!', color: 'green', bg: 'gray'},
];

const Heading = () => {  
  const [header, setHeader] = useState(labels[0]);
  const targetRef: any = useRef();
  const { scrollTop, scrollDir } = useScroll();
  const { query } = useMatchMedia();

  useEffect(() => {
    setTimeout(() => {
      const currentIndex = labels.indexOf(header);
      const nextIndex = (currentIndex + 1) % labels.length;
      setHeader(labels[nextIndex]);
    }, 2000);
  }, [header]);

  useEffect(() => {
    animationMethod(query, 'main', targetRef, scrollTop, scrollDir);
  }, [scrollTop]);

  return(
    <div className="heading-container" ref={targetRef}>
      <h1
        className="brand"
      >
        k<span className="blue">r</span>edi
      </h1>
      <h2 className="heading-sub u-center-text">Préstamos <span className={`${header.color}`} style={{backgroundColor: header.bg, padding: '0 1rem 0.5rem 1rem', borderRadius: '5px'}}>{header.label}</span></h2>
      <h2 className="heading-sub u-center-text">para contratistas</h2>
    </div>
  )
}

export default Heading;
