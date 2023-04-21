import { Card, PageTitle } from "@formbricks/ui";
import Image from "next/image";
import PosthogLogo from "@/images/posthoglogo.png";

export default function IntegrationsPage({ params }) {
  return (
    <div>
      <PageTitle>Integrations</PageTitle>
      <div className="grid grid-cols-3 gap-6">
        <Card
          href={`/environments/${params.environmentId}/integrations/posthog`}
          title="PostHog"
          description="Forward Formbricks events & responses to PostHog."
          icon={<Image src={PosthogLogo} alt="PostHog Logo" />}
        />
      </div>
    </div>
  );
}
