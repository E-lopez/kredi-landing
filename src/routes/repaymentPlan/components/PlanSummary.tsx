import { useEffect, useState } from "react";
import { useAmortization } from "@/stores/amortization/AmortizationStore";
import { calculateLoanSummary, toCurrency } from "@/utils/functions/currency";
import { useNavigate } from "react-router-dom";



const PlanSummary = () => {
  const [VTUA, setVTUA] = useState(0);
  const [amount, setAmount] = useState(0);
  const amortization = useAmortization();
  const navigate = useNavigate();  
  const { data, rate }: { data: any[], rate: number} = amortization!;
  const { installment } = data[0] ?? { installment: 0 };

  useEffect(() => {
    if (!data.length) navigate("/")
    const values = calculateLoanSummary(data)
    setVTUA(values.VTUA)
    setAmount(values.loan)
  }, [])
    
  return(
    <>
      <div className='plan-summary__data-box u-mb-10'>
        <h2 className="heading-primary">Resumen</h2>
        <p className="heading-primary">Tasa (E.A.): <span>{rate*100}%</span></p>
        <p className="heading-primary">Deuda total: <span>${toCurrency(Math.round(VTUA))}</span></p>
        <p className="heading-primary">Cuota mensual: <span>${toCurrency(Math.round(installment))}</span></p>
        <p className="heading-primary">Costo final (VTUA)*: <span>${toCurrency(Math.round(amount))}</span></p>
        <p className="heading-primary">¿Cuánto pagas en intereses? <span className="blue">${toCurrency(Math.round(amount - VTUA))}</span></p>
        
        <div className="plan-summary__disclaimer">
          <p className="text-primary">El costo final (VTUA) es el valor total del préstamo más los intereses causados. ¡No hay cobros ocultos! </p>
        </div>
      </div>
    </>
  )
}

export default PlanSummary;