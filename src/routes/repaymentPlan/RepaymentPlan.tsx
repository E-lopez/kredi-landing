import { useEffect, useState } from 'react';
import Button from '@/components/button/Button';
import { useNavigate } from 'react-router-dom';
import { monthYearFormat } from '@/utils/functions/dataTime';
import { toCurrency } from '@/utils/functions/currency';
import { useAmortization, useAmortizationDispatch } from '@/stores/amortization/AmortizationStore';
import PlanSummary from './components/PlanSummary';
import LoadingIndicator from '@/components/loaderComponent/LoaderComponent';


const RepaymentPlan = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('loading');
  const navigate = useNavigate();
  const amortization = useAmortization();
  const amortizationDispatch = useAmortizationDispatch();
  const { data } = amortization!;

  const recalculatePlan = () => {
    amortizationDispatch({ type: "RESET_DATA" });
    navigate("/loan-config");
  };

  useEffect(() => {
    if(!data) {
      setStatus('error');
      navigate("/");
    }
    if (window && window !== undefined) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setTableData(data);
    setStatus('idle');
  }, []);

  if(status === 'loading') return  <div className='base-layout u-mt-30'><LoadingIndicator /></div>;
  if(status === 'error') return <h1>Error, error!</h1>;
  return(
    <div className='repayment u-center-v'> 
      <h1 className='u-center-text u-mb-30 heading-primary'>Nuestra propuesta</h1>
      <PlanSummary />
      <h1 className='u-center-text u-mt-30 heading-primary'>Plan de pagos</h1>
      <p className='paragraph u-center-text'>Esta tabla muestra el detalle de tu cuota: lo que va a intereses, lo que va a capital y el saldo mes a mes.</p>
      <p className='caption'>* Esta tabla es una estimación. La propuesta final puede variar pero recibirás la definitiva en tu correo antes de cualquier acuerdo.</p>

      <div className="repayment__table">
        <table>
          <thead>
            <tr>
              <th scope='col'>Fecha</th>
              <th scope='col'>Interés</th>
              <th scope='col'>Capital</th>
              <th scope='col'>Cuota</th>
              <th scope='col'>Balance</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length !== 0 && tableData.map((row) => {
              return (
                <tr key={row.due_date}>
                  <th scope='row'>{monthYearFormat(row.due_date)}</th>
                  <td>${toCurrency(row.interest)}</td>
                  <td>${toCurrency(row.principal)}</td>
                  <td>${toCurrency(row.installment)}</td>
                  <td><strong>${toCurrency(row.balance)}</strong></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div> 

      <h1 className='u-center-text u-mb-10 heading-primary'>¿Te interesa?</h1>
      <div className="u-center-h">
        <Button method={() => {navigate("/")}} label="No, gracias" cssModifier='decline' />
        <Button method={() => {navigate("/documents-upload")}} label="¡Sí, continuemos!" cssModifier='accept' />
      </div>

      <div className="repayment__recalculate">
        <p className='paragraph paragraph--sm u-center-text'>¿No te gustan estos números? <br /> Calcula de nuevo usando una cuota mayor o un periodo menor. <br /> ¡Esto reduce los costos!</p>
        <div className="u-center-h u-mt-10">
          <Button method={recalculatePlan} label="Calcular de nuevo" />
        </div>
      </div>
    </div>
  )
}

export default RepaymentPlan; 
