import LoadingIndicator from "@/components/loaderComponent/LoaderComponent";
import { userTokenVerifier } from "@/hooks/useTokenVerify";
import { TokenService } from "@/services/tokenService/tokenService";
import { useToken, useTokenDispatch } from "@/stores/tokens/TokenStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const content = {
  title: '¿Cómo funciona?',
  description: 'El proceso tiene 3 pasos.',
  steps: [
    'Lee y acepta los acuerdos de confidencialidad y tratamiento de datos',
    'Cuéntanos algunos datos básicos sobre tí',
    'Responde las preguntas de nuestra evaluación de personalidad',
    'Sube algunos documentos para terminar'
  ]
}

const getToken = async () => await TokenService.fetchToken();

const SurveyGuide = () => {
  const [status, setStatus] = useState('idle');
  const token: any = useToken();
  const dispatch = useTokenDispatch();
  const { validateToken } = userTokenVerifier();

  const handleToken = () => {
    setStatus('loading');
    getToken()
    .then((newToken) => {
      dispatch({
        type: 'SAVE_TOKEN',
        tokenData: { ...newToken },
      });
      setStatus('idle');
    })
    .catch((error) => {
      console.error('Error fetching token:', error);
      setStatus('error');
    });
  };

  useEffect(() => {
    const { tokenData } = token;
    if (!tokenData?.access_token) {
      handleToken();
      return;
    }
    
    const isTokenValid = validateToken(tokenData.access_token);    
    if (!isTokenValid && status !== 'loading') {
      handleToken();
    }
  }, [token]);

  if(status === 'error') return <div className='survey'><h1>Error, error!</h1></div>;
  return(
    <div className="base-layout base-layout--light-gray base-layout--fixed u-pr-20 u-pl-20 u-pb-20">
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
          <p className="paragraph paragraph--sm u-center-text u-mt-20">Sabemos que son varios pasos :( pero todo el proceso toma 5 minutos!</p>
        </div>
        {status === 'loading' 
          ? <div className="u-mt-30"><LoadingIndicator type="circles"/></div>
          : <div className="base-button-wrap">
              <Link 
                className="base-button base-button__button u-mt-30 u-mb-30" 
                to="/survey"
              >
                <p className="label">¡Empecemos!</p>
              </Link>
            </div>
        }
        
    </div>
  )
}

export default SurveyGuide;
