import { createBrowserRouter } from 'react-router-dom';

import { 
  Root, 
  Home,
  NotFound,
} from '../routes';
import Survey from '@/routes/survey/Survey';
import Score from '@/routes/score/Score';
import LoanConfiguration from '@/routes/loanConfiguration/LoanConfiguration';
import RepaymentPlan from '@/routes/repaymentPlan/RepaymentPlan';
import DocumentsUpload from '@/routes/documentsUpload/DocumentsUpload';
import SurveyGuide from '@/routes/surveyGuide/SurveyGuide';
import Layout from '@/components/layouts/Layout';
import WhoWeAre from '@/routes/corporativeContent/WhoWeAre';
import FrequentQuestions from '@/routes/corporativeContent/FrequentQuestions';
import ContactUs from '@/routes/corporativeContent/ContactUs';
import '../sass/index.scss';
import Agreements from '@/routes/agreements/Agreements';
import UserOnboarding from '@/routes/userOnboarding/UserOnboarding';
// Only import ScoreTestWrapper in development
const ScoreTestWrapper: React.ComponentType | undefined = import.meta.env.DEV
  ? (await import('../../__mockups__/routes/ScoreTestWrapper')).default
  : undefined;

const routes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        errorElement: <NotFound />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: 'agreements',
            element: <Agreements />,
          },
          {
            path: 'onboarding',
            element: <UserOnboarding />,
          },
          {
            path: 'guide',
            element: <SurveyGuide />,
          },
          {
            path: 'survey',
            element: <Survey />,
          },
          {
            path: 'score',
            element: <Score />,
          },
          {
            path: 'loan-config',
            element: <LoanConfiguration />,
          },
          {
            path: 'repayment-plan',
            element: <RepaymentPlan />,
          },
          {
            path: 'documents-upload',
            element: <DocumentsUpload />,
          },
          // Only include test-score route in development
          ...(import.meta.env.DEV && ScoreTestWrapper
          ? [
              {
                path: 'test-score',
                element: <ScoreTestWrapper />
              }
            ]
          : []),
          {
            path: '*',
            loader() {
              throw new Response(null, { status: 404, statusText: 'Not found' })
            }
          }
        ]
      }
    ]
  },
  {
    path: '',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: 'que-es-kredi',
        element: <WhoWeAre />,
      },
      {
        path: 'faq',
        element: <FrequentQuestions />,
      },
      {
        path: 'contacto',
        element: <ContactUs />,
      },
      {
        path: '*',
        loader() {
          throw new Response(null, { status: 404, statusText: 'Not found' })
        }
      }
    ]
  }
];

const Router = createBrowserRouter(routes);

export default Router;
