import { useModalDispatch } from "@/stores/modals/ModalStore";
import { ConsentModal } from "./components/consent/consentModalContent";
import { useEffect, useState } from "react";
import { SurveyService } from "@/services/surveyService/surveyService";
import LoadingIndicator from "@/components/loaderComponent/LoaderComponent";
import sortAgreements from "@/utils/sortAgreements";
import { useToken } from "@/stores/tokens/TokenStore";
import FormFactory from "@/components/formComponent/formFactory";
import ErrorComponent from "@/components/ErrorComponent/ErrorComponent";
import { useNavigate } from "react-router";


const getDocuments = async (access_token: string) => await SurveyService.fetchAgreements({version: '0.0.1', access_token});

type ContentType = {
    summary: Record<string, string>;
    agreement: Record<string, string>;
    termsConditions: Record<string, string>;
  };

const model = {
  "dataTreatment": {
      "type": "CHECKBOX",
      "required": true,
      "label": "Acepto haber leído y entendido el tratamiento de datos personales.",
      "options": null,
      "helperLeft": null,
      "helperRight": null,
      "multipleOptions": [
          "acepto"
      ],
      "multiple": false
  }  
}

const Consent = () => {
  const [status, setStatus] = useState<'loading'|'idle'|'error'>('loading');
  const [content, setContent] = useState<ContentType>({
    summary: {},
    agreement: {},
    termsConditions: {},
  });
  const [formVersion, setFormVersion] = useState(0);
  const modalDispatch = useModalDispatch();
  const token: any = useToken();
  const navigate = useNavigate();

  const showTermsConditions = () => {
    modalDispatch({
      type: 'SHOW_MODAL',
      content: <ConsentModal content={content.termsConditions} />,
    });
  };
  
  const showDataAgreement = () => {
    modalDispatch({
      type: 'SHOW_MODAL',
      content: <ConsentModal content={content.agreement} />,
    });
  };

  const saveAndLaunchSurvey = () => {
    setFormVersion(formVersion + 1);
    setStatus('loading');
    // Holder for actual consent saving implementation
    setTimeout(() => {
      setStatus('idle');
      navigate('/survey');
    }, 1000);
  }

  useEffect(() => {
    const { tokenData } = token;
    window.scrollTo(0, 0);
    getDocuments(tokenData.access_token)
    .then(({ data }) => {
      return sortAgreements(data);
    })
    .then(({...data}) => {
      setContent(prevState => ({...prevState, ...data}));
      setStatus('idle');
    })
    .catch((e: Error) => {
      setStatus('error');
    })
  }, [token]);

  if(status === 'loading') return <LoadingIndicator />;
  if(status === 'error') return <ErrorComponent />;
  return(
    <div className="survey survey--orange">
      <div className="survey__consent-content u-mt-20">
        <h1 className="heading-primary u-center-text u-mb-20">Consentimiento informado</h1>
        <p className="paragraph u-justify-text">
          {Object.keys(content.summary).map((key, i) => {
            return (
              <span key={i+key}>
                {i !== 0 && <span>{i}.</span>} {content.summary[key]}
                {i === 0 && <br/>}
                {i < Object.keys(content.summary).length - 1 && <br />}
              </span>
            );
          })}
        </p>
        <div className="u-center-v u-mt-30">
          <button
            className="link-button link-button--dark u-mb-10" 
            onClick={showTermsConditions}
          >
            Términos y condiciones.
          </button>
          <br/>
          <button
            className="link-button link-button--dark u-mb-30"
            onClick={showDataAgreement}
          >
            Política de protección de datos.
          </button>
        </div>
      </div>
      <FormFactory
        key={formVersion}
        base={model}
        formMethod={saveAndLaunchSurvey} 
        rootCss="survey-form"
        submitLabel="Siguiente"
      />
    </div>
  )
};

export default Consent;