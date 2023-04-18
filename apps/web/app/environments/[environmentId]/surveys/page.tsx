import SurveyList from "./SurveyList";
import ContentWrapper from "@/components/shared/ContentWrapper";
import WidgetStatusIndicator from "@/components/shared/WidgetStatusIndicator";
import { headers } from "next/headers";

async function getSurveys(environmentId) {
  const cookie = headers().get("cookie") || "";
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/v1/environments/${environmentId}/surveys`, {
    headers: {
      cookie,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function SurveysPage({ params }) {
  const surveys = await getSurveys(params.environmentId);
  return (
    <ContentWrapper className="flex h-full flex-col justify-between">
      <SurveyList environmentId={params.environmentId} surveys={surveys} />
      <WidgetStatusIndicator environmentId={params.environmentId} type="mini" />
    </ContentWrapper>
  );
}
