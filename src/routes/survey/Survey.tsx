import { useEffect, useState } from 'react';
import { useSurvey, useSurveyDispatch } from '@/stores/survey/SurveyStore';
import Sections from './components/sections/sections';
import { SurveyService } from '@/services/surveyService/surveyService';
import LoadingIndicator from '@/components/loaderComponent/LoaderComponent';
import useScrollToTop from '@/hooks/domEvents/useScrollToTop';
import { useToken, useTokenDispatch } from '@/stores/tokens/TokenStore';
import ErrorComponent from '@/components/ErrorComponent/ErrorComponent';
import { userTokenVerifier } from '@/hooks/useTokenVerify';


const getModels = async (access_token: string) => await SurveyService.fetchSurvey({type: 'SCORING', version: '0.1.2', access_token});
const Survey = () => {
  const [status, setStatus] = useState<'loading'|'idle'|'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const token: any = useToken();
  const survey: any = useSurvey();
  const dispatch = useSurveyDispatch();
  const tokenDispatch = useTokenDispatch();
  const { validateToken } = userTokenVerifier();
  
  
  const initializeModel = (model: any) => {
    const { sections } = model;
    const sectionsNames = Object.keys(sections)
    const idx_consent = sectionsNames.indexOf('consent');
    const idx_demographics = sectionsNames.indexOf('demographics');
    const sortedSectionsNames = [...sectionsNames.splice(idx_consent, 1), ...sectionsNames.splice(idx_demographics - 1, 1), ...sectionsNames];

    dispatch({
      type: 'INITIALIZE_MODEL',
      data: sections,
      sections: sortedSectionsNames,
      section: sortedSectionsNames[0], 
    })
  };

  const getToken = () => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('token');
    if (token) {
      return Promise.resolve({
        tokenData: {
          access_token: token,
        },
      });
    }
    return Promise.reject(new Error('No token found'));
  };

  const handleToken = () => {
    setStatus('loading');
    getToken()
    .then((newToken) => {
      const validationResult = validateToken(newToken.tokenData.access_token);
      console.log('Is token valid?', validationResult.validated);
      if (!validationResult.validated) {
        setStatus('error');
        setErrorMessage(validationResult.reason || 'Invalid token');
        return;
      }
      tokenDispatch({
        type: 'SAVE_TOKEN',
        data: { ...newToken },
      });
      return newToken.tokenData.access_token;
    })
    .then((access_token) => {
      if (!access_token) {
        setStatus('error');
        setErrorMessage('No token found');
        return;
      }
      return getModels(access_token);
    })
    .then(({ data }) => {
      initializeModel(data);
      setStatus('idle');
    })
    .catch((error) => {
      console.error('Error fetching token:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Error fetching token');
    });
  };
    
  // useEffect(() => {
  //   if(Object.keys(survey.answers).length) {
  //     return setStatus('idle');
  //   };
  //   const { tokenData } = token;
  //   console.log("TOKEN DATA, tokenData", tokenData);
  //   getModels(tokenData.access_token)
  //   .then(({ data }) => {
  //     console.log("DATA, data", data);
  //     initializeModel(data);
  //     setStatus('idle');
  //   })
  //   .catch((_e: Error) => {
  //     setStatus('error');
  //   })
  //   useScrollToTop();
  // }, [token]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setStatus('loading');
    handleToken();
  }, []);

  if(status === 'loading') return <LoadingIndicator />;
  if(status === 'error') return <ErrorComponent  main={errorMessage} />;
  return <Sections />
}

export default Survey; 
