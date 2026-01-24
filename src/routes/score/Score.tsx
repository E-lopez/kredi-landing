import { useEffect, useState } from 'react';
import { useSurvey } from '@/stores/survey/SurveyStore';
import Button from '@/components/button/Button';
import { useNavigate } from 'react-router-dom';
import getAmountByRiskLevel from '@/utils/getAmountByRiskLevel';
import { toCurrency } from '@/utils/functions/currency';
import LoadingIndicator from '@/components/loaderComponent/LoaderComponent';
import DataCollectionScoreView from './components/DataCollectionView';


const Score = () => {
  const [status, setStatus] = useState<'idle'|'loading'|'error'|'success'>('idle');
  const navigate = useNavigate();
  const survey = useSurvey();
  const { scoreResult: { riskLevel, userName, risk_distance_analysis } } = survey!;
  const { risk_category } = risk_distance_analysis || {};

  useEffect(() => {
    if(!riskLevel) {      
      navigate("/")
    }
    if (window && window !== undefined) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setStatus('idle');
  }, []);

  if(status === 'loading') return  <div className='survey'><LoadingIndicator /></div>;
  if(status === 'error') return <div className='survey documents-upload'><h1>Error, error!</h1></div>;
  if(import.meta.env.VITE_ENVIRONMENT === 'data_collection') return <DataCollectionScoreView />;
  return(
    <div className='score'>  
      <div className='score__data-box u-mb-30'>
        <div className="score__data-icon u-center-v u-pt-5">
          <i className="bi-heart-fill"></i>
        </div>
        <h1 className='u-center-text heading-primary heading-primary--caption'>{userName} <br/>tu score es</h1>
        <h1 className='u-center-text heading-primary score__data-figure'>{riskLevel && (riskLevel as number).toFixed(1) || '--'}</h1>
      </div>

      {risk_category && (risk_category as string).toLowerCase().includes('low') ?
        <div className='score__warning-box u-mb-30 u-pr-20 u-pl-20'>
          <div className="score__warning-icon u-center-v u-pt-5">
            <i className="bi-exclamation-triangle-fill paragraph paragraph--lg"></i>
          </div>
          <h1 className='u-center-text heading-primary heading-primary--caption'>Malas noticias :(</h1>
          <p className='u-center-text paragraph paragraph--lg'>No podemos prestarte dinero por el momento.</p>
          <p className='u-center-text paragraph paragraph--sm'>Puedes intentarlo de nuevo en algún tiempo, <br/> te enviaremos un correo con la información completa.</p>
        </div>
      :
        <>
          <h1 className='u-center-text heading-primary'>Significa que <br/> podemos prestarte hasta</h1>
          <p className='u-center-text paragraph paragraph--lg'>${toCurrency(getAmountByRiskLevel(riskLevel))}</p>

          <div className="u-center-h">
            <Button 
              method={() => { navigate("/") }} 
              label="No, gracias" 
              cssModifier='decline' 
            />
            <Button 
              method={() => { navigate("/loan-config") }} 
              label="¡Sí, continuemos!" 
              cssModifier='accept' 
            />
          </div>
        </>
      }
    </div>
  )
}

export default Score; 
