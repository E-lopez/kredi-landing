import Button from "@/components/button/Button";
import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

const content = {
  title: '¿Cómo funciona?',
  description: 'El proceso tiene 3 pasos.',
  steps: [
    'Lee y acepta los acuerdos de confidencialidad y tratamiento de datos',
    'Cuéntanos algunos datos básicos sobre tí',
    'Responde las preguntas de nuestra evaluación de personalidad',
    'Sube algunos documentos para terminar'
  ],
  errorMessage: 'Hubo un error con el token de acceso. Por favor intenta de nuevo con el enlace proporcionado o contacta a la persona que te invitó.'
}

const ProcessInfo = ({ setStep }: { setStep: Dispatch<SetStateAction<"validation" | "info">> }) => {
  return(
    <>
      <h1 className='u-left-text heading-primary'>¿Cómo funciona?</h1>
      <h2 className="paragraph paragraph--sm u-mt-10">
        El proceso tiene {content.steps.length} pasos.
      </h2>

      {content.steps.map((step, index) => (
        <div className="card-default" key={step+index}>
          <div className="card-default__index">
            <h1 className="heading-primary">{index+1}</h1>
          </div>
          <p className="paragraph">{step}</p>
        </div>
      ))}

      <div className="container">
        <p className="paragraph paragraph--sm u-center-text u-mt-30">Al final podrás ver tus resultados.</p>
        <p className="paragraph paragraph--sm u-center-text u-mt-20">Le avisaremos a la persona interesada <br/> cuando hayas finalizado y <strong>¡listo!</strong></p>
        <p className="paragraph paragraph--sm u-center-text u-mt-20">Sabemos que son varios pasos :( pero ¡todo el proceso toma 5 minutos!</p>
      </div>
      <div className="base-button-wrap u-mt-30">
        <Button label="¡Empecemos!" method={() => setStep('validation')} />
      </div>
    </>
  )
}

export default ProcessInfo;
