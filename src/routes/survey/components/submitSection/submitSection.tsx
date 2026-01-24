import { useEffect, useState } from "react";
import { useSurvey } from '@/stores/survey/SurveyStore';
import { useNavigate } from "react-router-dom";
import { useComposerHandler } from "@/hooks/useComposerHandler";
import LoadingIndicator from "@/components/loaderComponent/LoaderComponent";
import Button from "@/components/button/Button";
import secondaryBackground from "@/assets/woman.png";
import { CreateUserRequest } from "@/models/dto/CreateUserRequest";
import { useToken } from "@/stores/tokens/TokenStore";


const SubmitSection = () => {
  const [status, setStatus] = useState<'loading'|'error'|'idle'>('idle');
  const [payload, setPayload] = useState<null | CreateUserRequest>(null);
  const survey: any = useSurvey();
  const navigate = useNavigate();
  const { createUser } = useComposerHandler();
  const token: any = useToken();

  const buildPayload = () => {
    const { consent, demographics, ...rest } = survey.answers;
    const { tokenData } = token;
    const payload: CreateUserRequest = {
      userData: {
        ...demographics,
        agreements: { ...consent },
      },
      scoringData: {
        demographics: { ...demographics },
        sections: { ...rest }
      },
      access_token: tokenData.access_token ?? '',
    };
    return setPayload(payload);
  }

  const saveScoreResult = async () => {
    if(!payload) return;
    setStatus('loading');
    const res: any = await createUser(payload);
    if(!res.success) {
      return setStatus('error');
    }
    navigate("/score");
  }

  useEffect(() => {
    buildPayload();
    if (window && window !== undefined) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);


  if(status === 'error') return (
    <div className="survey">
      <h1 className="u-center-text">Error, error!</h1>
    </div>
  )
  return (
    <div className={`survey ${status === 'loading' && 'survey--pink'}`}>
      {status === 'loading' 
      ? <>
          <LoadingIndicator />
          <h1 
            className="heading-primary u-mt-30 u-center-text"
          >
            ¡Estamos calculando <br/> tu score!
          </h1>
        </>
      : <>
          <div className="survey__image-box">
            <img src={secondaryBackground} alt="people trust" />
          </div>
          <h1 
            className="heading-primary u-mb-10 u-center-text"
          >
            ¡No más preguntas! <br/> Haz click para calcular tu score
          </h1>
          <Button method={saveScoreResult} label={'Calcular!'} />
        </> 
      }
    </div>
  )
};

export default SubmitSection;