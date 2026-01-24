import { Link } from "react-router-dom";

const content = {
  title: '¿Cómo funciona?',
  description: 'El proceso tiene 3 pasos.',
  steps: [
    'Lee y acepta los acuerdos de confidencialidad y tratamiento de datos',
    'Cuéntanos algunos datos básicos sobre tí',
    'Responde las preguntas de nuestra evaluación de honestidad',
  ]
}

const ContactUs = () => {   
  return(
    <div className="corporate-content corporate-content--green u-mt-30">
      <div className="corporate-content__info">
        <h1 className='u-center-text heading-primary'>¿Necesitas ayuda adicional?</h1>
        <h2 className="paragraph paragraph--sm u-center-text u-mt-10 u-mb-20">
          Encuentra nuestros canales habilitados hasta el momento. Pronto añadiremos más opciones para tu comodidad.
        </h2>
      </div>
      <div>
          <p className="paragraph paragraph--md">Nuestro correo oficial:</p>
          <a className="paragraph paragraph--sm" href="mailto:ayuda@kredi.com">ayuda@kredi.com</a>
      </div>
    </div>
  )
}

export default ContactUs;
