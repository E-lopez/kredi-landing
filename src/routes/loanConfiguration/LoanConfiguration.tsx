import { useEffect, useMemo, useState } from "react";
import { loanConfigModels } from "@/models/forms/loanConfigModel";
import FormFactory from "@/components/formComponent/formFactory";
import { useSurvey } from "@/stores/survey/SurveyStore";
import getAmountByRiskLevel from "@/utils/getAmountByRiskLevel";
import { repaymentPlanRequest } from "@/models/dto/repaymentPlanRequest";
import { useAmortizationHandler } from "@/hooks/useAmortizationHandler";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "@/components/loaderComponent/LoaderComponent";
import { roundUpMinAmmount, toCurrency } from "@/utils/functions/currency";
import { useAlertDispatch } from "@/stores/alerts/AlertsStore";
import { useToken } from "@/stores/tokens/TokenStore";


const LoanConfiguration = () => {
  const [status, setStatus] = useState<'loading'|'error'|'idle'>('idle');
  const [ model, setModel ] = useState(null);
  const [formVersion, setFormVersion] = useState(0);
  const [loanMethod, setLoanMethod] = useState<string | keyof typeof loanData>('');
  const { method, loanData } = loanConfigModels;
  const survey = useSurvey();
  const navigate = useNavigate();
  const { handleRepaymentPlan } = useAmortizationHandler();
  const alertDispatch = useAlertDispatch();
  const token: any = useToken();
  const { scoreResult: { riskLevel, userId } } = survey!;

  const translateMethod = (val: string) => val.toLowerCase() === 'plazo' ? 'period' : 'instalment'

  const setMethod = (e: any) => {
    const { value } = e.currentTarget;
    const translated_label = translateMethod(value)
    setLoanMethod(translated_label);
  };

  const getModelData = () => {
    const maxAmount = getAmountByRiskLevel(riskLevel);
    let loanModel = loanData[loanMethod];

    const { amount } = loanModel;
    loanModel = {
      ...loanModel,
      amount: {
        ...amount, 
        ...{
          placeholder: `El máximo es $${toCurrency(maxAmount)}`,
          max: maxAmount,
        }
      },
    };
    if (loanMethod === 'instalment') {
      loanModel = {
        ...loanModel,
        ...{instalment: {
          ...loanModel.instalment, 
          ...{
            placeholder: 'Ingresa tu cuota',
            max: maxAmount,
          }
        }}
      }
    };
    return loanModel;
  };

  const validateInstalment = (amount: number, instalment: number, loanMethod?: any) => {
    if(loanMethod !== 'instalment') return false;
    const minInstalment = amount/36;
    const isValid = instalment < minInstalment; 

    if(isValid) {
      alertDispatch({
        type: "SET_ALERT",
        name: "Instalment validation failed",
        message: `La cuota mínima para $${toCurrency(amount)} es $${toCurrency(Math.floor(minInstalment))}`,
      });
      setFormVersion(formVersion + 1);
      setStatus('idle');
    }
    return isValid;
  }

  const getRepaymentPlan = async (payload: Partial<repaymentPlanRequest>) => {
    if(!riskLevel || !loanMethod || !payload) return;
    const { tokenData } = token;

    setStatus('loading');
    const req = {
      ...{
        userId: userId,
        payment_type: loanMethod,
        user_risk: riskLevel,
      },
      ...payload
    }

    if(validateInstalment(Number(req.amount), Number(req.instalment), loanMethod)) return;

    const res: any = await handleRepaymentPlan(req as repaymentPlanRequest, tokenData.access_token)
    if(!res.success) {
      return setStatus('error');
    }
    navigate("/repayment-plan");
  };

  useMemo(() => {
    if(loanMethod !== '') {
      setModel(getModelData());
      setFormVersion(formVersion + 1);
    }
  }, [loanMethod]);

  useEffect(() => {
    if(!riskLevel) navigate("/");
  }, [])

  if(status === 'loading') return  <div className='base-layout u-mt-30'><LoadingIndicator /></div>;
  if(status === 'error') return (
    <div className="base-layout u-mt-30">
      <h1 className="u-center-text">Error, error!</h1>
    </div>
  )
  return(
    <div className='base-layout base-layout--fixed loan-config u-pt-30'>
      <h1 
        className="heading-primary u-mt-30 u-center-text"
      >
         Configuremos tu crédito
      </h1>
      <div className='form-default__field'>
        <div>
          {model === null ?
            <div className="loan-config__instructions-box u-mt-10">
              <p className='paragraph paragraph--md u-center-text'>Atención</p>
              <p className='paragraph u-center-text'>* {method.instruction.line_1}</p>
              <p className='paragraph u-center-text'>* {method.instruction.line_2}</p>
            </div>
            :
            <p className='label u-center-text'>{method.label}</p>
          } 
          <div className='form-default__multi-choice u-center-h u-mt-20'>
            {method.multipleOptions.map((el: string, i: number) => 
              <button
                className={`${translateMethod(el) === loanMethod ? 'form-default__multi-choice--active' : ''}`}
                key={i+el} 
                type="button" 
                value={el} 
                name={method.name} 
                onClick={(e) => setMethod(e)}
              >
                {el}
              </button>
              )
            }
          </div>
        </div>
      </div>
      
      {model !== null &&
        <div className="u-mt-20">
          <div className="loan-config__max-amount">
            <p className="paragraph paragraph--sm u-center-text">
              Máximo: ${toCurrency(getAmountByRiskLevel(riskLevel))}
            </p>
            {loanMethod === 'instalment' ?
              <>
                <p className="paragraph paragraph--sm u-center-text blue">
                  Cuota Sugerida: ${toCurrency(roundUpMinAmmount(getAmountByRiskLevel(riskLevel)))}
                </p>
                <p className="paragraph paragraph--sm u-center-text">*ponemos un mínimo para que puedas pagar tu crédito en menos de 3 años
                </p>
              </>
              :
              <>
                <p className="paragraph paragraph--sm u-center-text blue">
                  Plazo máximo: 36 meses
                </p>
                <p className="paragraph paragraph--sm u-center-text">Queremos que salgas rápido <br/>de tus deudas!</p>
              </>
            }
          </div>
          <FormFactory
            key={formVersion}
            base={model}
            formMethod={getRepaymentPlan} 
            rootCss="survey-form"
            submitLabel="Calcular"
          />
        </div>
      }
    </div>
  )
}

export default LoanConfiguration; 
