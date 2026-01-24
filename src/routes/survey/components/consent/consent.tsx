import { useModalDispatch } from "@/stores/modals/ModalStore";
import { ConsentModal } from "./consentModalContent";
import { useEffect, useState } from "react";
import { SurveyService } from "@/services/surveyService/surveyService";
import LoadingIndicator from "@/components/loaderComponent/LoaderComponent";
import sortAgreements from "@/utils/sortAgreements";
import { useToken } from "@/stores/tokens/TokenStore";

const getDocuments = async (access_token: string) => await SurveyService.fetchAgreements({version: '0.0.1', access_token});

type ContentType = {
    summary: Record<string, string>;
    agreement: Record<string, string>;
    termsConditions: Record<string, string>;
  };
const Consent = () => {
  const [status, setStatus] = useState<'loading'|'idle'|'error'>('loading');
  const [content, setContent] = useState<ContentType>({
    summary: {},
    agreement: {},
    termsConditions: {},
  });
  const modalDispatch = useModalDispatch();
  const token: any = useToken();

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

  useEffect(() => {
    const { tokenData } = token;
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
  if(status === 'error') return <div className='base-layout u-mt-30'><h1>Error, error!</h1></div>;
  return(
    <div className="survey__consent-box">
      <div className="survey__consent-content">
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
          <button className="link-button link-button--dark u-mb-10" onClick={showTermsConditions}>Términos y condiciones.</button>
          <br/>
          <button className="link-button link-button--dark u-mb-30" onClick={showDataAgreement}>Política de protección de datos.</button>
        </div>
      </div>
    </div>
  )
};

export default Consent;