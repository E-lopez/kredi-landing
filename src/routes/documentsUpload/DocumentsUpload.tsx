import { useEffect, useState } from 'react';
import UploadForm from './components/UploadForm';
import OutputMessage from './components/OutputMessage';
import LoadingIndicator from '@/components/loaderComponent/LoaderComponent';
import { useSurvey } from '@/stores/survey/SurveyStore';
import { useNavigate } from 'react-router-dom';


const DocumentsUpload = () => {
  const [status, setStatus] = useState<'idle'|'loading'|'error'|'success'>('idle');
  const [success, setSuccess] = useState<boolean>(false);
  const survey = useSurvey();
  const navigate = useNavigate();
  const { scoreResult: { userId } } = survey!;

  useEffect(() => {
    if(!userId) {
      navigate("/");
    }
    if (window && window !== undefined) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setStatus('idle');
  }, []);

  if(status === 'loading') return  <div className='survey'><LoadingIndicator /></div>;
  if(status === 'error') return <div className='survey documents-upload'><h1>Error, error!</h1></div>;
  return(
    <div className='base-layout base-layout--fixed documents-upload'>
      {success ? 
        <OutputMessage /> : 
        <UploadForm setStatus={setStatus} setSuccess={setSuccess} userId={userId} />
      }
    </div>
  )
}

export default DocumentsUpload; 
