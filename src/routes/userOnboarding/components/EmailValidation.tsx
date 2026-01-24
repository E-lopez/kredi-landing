import Button from "@/components/button/Button";
import { SecondsToMinutesSeconds } from "@/utils/functions/dataTime";
import { useEffect, useState } from "react";


const EmailValidation = () => {
  const [resendStatus, setResendStatus] = useState<'idle'|'sending'|'sent'>('idle');
  const [count, setCount] = useState(180);

  const counter = () => {
    if (count > 0) {
      setTimeout(() => setCount(count - 1), 1000);
    } else {
      setResendStatus('sent');
      setCount(180);
    }
  };

  const sendEmail = () => {
    const queryString = globalThis.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = atob(urlParams.get('data') || '');
    setResendStatus('sending');
    console.log("EMAIL, urlParams:", email);
    // Placeholder for actual email sending logic
  };

  useEffect(() => {
    if (resendStatus === 'sending') {
      counter();
    }
  }, [resendStatus, count]);

  return(
    <>
      <h1 className='u-left-text heading-primary'>Verificación de Identidad</h1>
      <div className="container u-center-v">
        <i className="bi-envelope-paper-heart-fill paragraph paragraph--xxl green u-mt-30"></i>
        <p className="paragraph paragraph--sm u-center-text u-mt-30">Haz click en el botón para verificar tu identidad.</p>
        <p className="paragraph paragraph--sm u-center-text u-mt-20"> Te enviaremos un link al correo que registraste. <br/> Visítalo y <strong>¡comienza tu proceso!</strong></p>
      </div>
      
      {
        resendStatus === 'sending' ?
        <div className="card-default u-center-v u-mt-30">
          <p className="paragraph paragraph--sm gray bold u-center-text">Reenviar email en  {SecondsToMinutesSeconds(count).minutes}:{SecondsToMinutesSeconds(count).seconds}</p>
        </div>
        :
        <div className="base-button-wrap u-mt-30">
          <Button label="Enviar Email" method={sendEmail} />
        </div>
      }
    </>
  )
}

export default EmailValidation;
