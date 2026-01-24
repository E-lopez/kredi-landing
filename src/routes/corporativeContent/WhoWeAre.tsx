import WhatsAppTemplates from "@/constants/WhatsAppTemplates";

const WhoWeAre = () => {  
  const number = WhatsAppTemplates.get('MAIN_NUMBER');
  const message = WhatsAppTemplates.get('MAIN_MESSAGE');
   
  return(
    <div className="corporate-content corporate-content--gray">
      <div className="corporate-content__info">
        <h1 className='u-center-text heading-primary'>¿Quiénes somos?</h1>
        <h2 className="paragraph paragraph--sm u-justify-text u-mt-10 u-mb-20">
          Somos un pequeño grupo de inversionistas que busca entregar soluciones de crédito a personas con dificultades para acceder a la banca tradicional.
        </h2>
      </div>
        
      <div className="card-default card--yellow u-center-h">
        <p className="paragraph">Sabemos por experiencia que los contratos por prestación de servicios no son bien recibidos por los bancos.</p>
      </div>

      <div className="corporate-content__info">
        <p className="paragraph paragraph--sm u-justify-text u-mt-30 u-mb-30">Y conocemos bien los inconvenientes que enfrentan los contratistas.</p>
        
        <p className="paragraph paragraph--sm u-justify-text u-mt-30 u-mb-30">Muchos hemos caído en la trampa de las tarjetas de crédito o peor, préstamos deshonestos, imposibles de pagar y peligrosos...</p>

        <div className="card-default card--yellow u-mt-30">
          <p className="paragraph paragraph--sm u-center-text u-pr-20 u-pl-20">Por todo esto, <strong>empezamos kredi.</strong></p>
        </div>
        
        <p className="paragraph paragraph--sm u-center-text u-mt-20">Vamos 3 años ayudando a contratistas de varias entidades y nos hemos esforzado por <strong>ayudarlos a crecer.</strong></p>
      </div>
      <div className="base-button-wrap">
        <a 
          className="base-button base-button__button base-button__button--green u-mt-30 u-mb-30" 
          href={`https://wa.me/${number}?text=${message}`}
        >
          <p className="label">¡Empieza aquí!</p>
        </a>
      </div>
    </div>
  )
}

export default WhoWeAre;
