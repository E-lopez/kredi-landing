import { useState } from "react";
import FormFactory from "@/components/formComponent/formFactory";
import { FormModel } from "@/models/types/formModel";
import { useSurvey, useSurveyDispatch } from '@/stores/survey/SurveyStore';
import SubmitSection from "../submitSection/submitSection";
import Consent from "../consent/consent";
import { validateData } from "@/utils/dataFunctions/dataValidation";
import { useModalDispatch } from "@/stores/modals/ModalStore";
import { SurveyModalContent } from "../modalContent/surveyModalContent";
import LoadingIndicator from "@/components/loaderComponent/LoaderComponent";
import { useToken } from "@/stores/tokens/TokenStore";


const colors = ['blue', 'green', 'pink', 'yellow', 'orange', 'gray'];

const Sections = () => {
  const [status, setStatus] = useState<'idle'|'loading'|'error' | 'success'>('idle');
  const [formVersion, setFormVersion] = useState(0);
  const [submitReady, setSubmitReady] = useState(false);
  const dispatch = useSurveyDispatch();
  const survey: any = useSurvey();
  const modalDispatch = useModalDispatch();
  const token: any = useToken();
  const { questions, sections, section, currentStep } = survey;
  const { data, metadata } = questions[section];
  const styleClass = colors[Math.floor(Math.random() * colors.length)];
  const skipSteps = 1;
  let loadingLegend = 'Validando tus respuestas';

  const hasSectionWeight = (section: string) => {
    switch(section) {
      case 'demographics':
      case 'consent': 
        return false;
      default:
        return true;
    }
  }

  const nextSection = () => {
    if(sections.length === currentStep) {
      setSubmitReady(true);
      return;
    };
    const nextSection = sections[currentStep];
    dispatch({
      type: 'UPDATE_SECTION',
      section: nextSection
    });
    if(window && window !== undefined) {
      window.scrollTo(0, 0);
    };
  }

  const showModal = (message: string[]) => {
    modalDispatch({
      type: 'SHOW_MODAL',
      content: SurveyModalContent.duplicatedData(message),
      cssModifier: 'surveyError'
    })
    setFormVersion(formVersion + 1);
    setStatus('idle');
  }

  const storeSection = async (sectionToSave: string, dataToSave: any) => {
      dispatch({
        type: 'SAVE_SECTION',
        section: sectionToSave,
        sectionData: dataToSave,
      });
      nextSection();
      setFormVersion(formVersion + 1);
  }

  const validationStep = async (answersData: FormModel) => {
    setStatus('loading');
    const { tokenData } = token;
    const sectionToSave = sections[currentStep - 1];
    const data = hasSectionWeight(sectionToSave)
      ? { weight: metadata.weight, data: answersData } 
      : answersData;
    const { isDuplicated, message } = await validateData(sectionToSave, data, tokenData.access_token);
    if (isDuplicated) {
      return showModal(message);
    }
    loadingLegend = 'Estamos verificando tu información';
    storeSection(sectionToSave, data);
    setStatus('idle');
  }

  if(status === 'loading') return <LoadingIndicator legend={loadingLegend} />;
  if (submitReady) return <SubmitSection />;
  return(
    <div className={`survey survey--${styleClass}`}>
      {currentStep > 1 && 
        <div className="survey__stepper">
          <h1 className="heading-primary u-center-text">{currentStep - skipSteps} de {sections.length - skipSteps}</h1>
        </div>
      }
      <h1 
        className="heading-primary u-mt-10 u-center-text"
      >
        {metadata.title}
      </h1>
      <p className="paragraph u-mt-10 u-center-text">{metadata.instruction}</p>
      <FormFactory
        key={formVersion}
        base={data}
        formMethod={validationStep} 
        rootCss="survey-form"
        submitLabel="Siguiente"
      />
    </div>
  )
};

export default Sections;