import SurveyEditor from "./(editor)/SurveyEditor";

export default function SurveysEditPage({ params }) {
  return <SurveyEditor environmentId={params.environmentId} surveyId={params.surveyId} />;
}
