import ErrorComponent from "@/components/ErrorComponent/ErrorComponent";
import { userTokenVerifier } from "@/hooks/useTokenVerify";
import { useToken, useTokenDispatch } from "@/stores/tokens/TokenStore";
import { useEffect, useState } from "react";
import ProcessInfo from "./components/ProcessInfo";
import EmailValidation from "./components/EmailValidation";

const content = {
  errorMessage: 'Hubo un error con el token de acceso. Por favor intenta de nuevo con el enlace proporcionado o contacta a la persona que te invitó.'
}

const UserOnboarding = () => {
  const [step, setStep] = useState<'info'|'validation'>('info');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return(
    <div className={`base-layout ${step === 'info' ? 'base-layout--yellow' : 'base-layout--blue'} u-pb-20`}>
        {step === 'info' && <ProcessInfo setStep={setStep} />}
        {step === 'validation' && <EmailValidation />}
    </div>
  )
}

export default UserOnboarding;
