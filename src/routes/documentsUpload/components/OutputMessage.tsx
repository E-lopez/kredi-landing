import { useAmortizationDispatch } from "@/stores/amortization/AmortizationStore";
import { useSurveyDispatch } from "@/stores/survey/SurveyStore";
import { useEffect } from "react";

const OutputMessage = () => {
  const dispatch = useSurveyDispatch();
  const amortizationDispatch = useAmortizationDispatch();

  useEffect(() => {
    dispatch({ type: 'RESET_STORE'});
    amortizationDispatch({ type: 'RESET_DATA' });
  }, []);

  return(
    <div className="u-p-30" style={{maxWidth: '700px', margin: '0 auto'}}>
      <h1 className='u-left-text u-mt-20 heading-primary'>¡Revisa tu correo!</h1>
      <p className="paragraph u-mt-20">
        Vamos a revisar tus documentos y si todo está en orden, en unas horas enviaremos al correo que registraste un <strong>pagaré para que leas y regreses firmado.</strong> Una vez lo hagas, recibirás la transferencia en la cuenta que indicaste por el monto solicitado.
      </p>
      <p className="paragraph u-mt-20">
        Recuerda que nos basamos en tu honestidad para aprobar tu crédito, así que si detectamos inconsistencias entre lo que nos contaste y los documentos que enviaste, no podremos continuar con el proceso.
      </p>
      <p className="paragraph u-mt-20"><strong>¡Gracias por tu confianza!</strong> <i className="bi-heart-fill"></i></p>

    </div>
  )
}

export default OutputMessage; 
