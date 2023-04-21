import DocsSidebar from "@/components/integrations/DocsSidebar";
import IntegrationPageTitle from "@/components/integrations/IntegrationsPageTitle";
import { Input, Button, Label, Checkbox } from "@formbricks/ui";
import PostHogLogo from "@/images/posthoglogo.png";
import Image from "next/image";

export default function PostHogPage({ params }) {
  return (
    <div>
      <IntegrationPageTitle
        environmentId={params.environmentId}
        title="PostHog Integration"
        icon={<Image src={PostHogLogo} alt="PostHog Logo" />}
      />

      <div className="flex justify-between gap-8">
        <div className="col-span-2">
          <div>
            <h3 className="text-xl font-bold  text-slate-800">Overview</h3>
            <div className="pl-2 text-slate-900">
              <p className="my-4 list-disc">
                Integrate Formbricks with PostHog to gain a comprehensive understanding of your user
                experiences and product performance:
              </p>
              <ul className="my-4 ml-3 list-disc">
                <li className="my-1">
                  Seamlessly combine Formbricks user feedback and PostHog product analytics to uncover the
                  reasons behind user behavior and optimize your product experience.
                </li>
                <li className="my-1">
                  Automatically sync your Formbricks survey responses with PostHog in real-time, enabling you
                  to make data-driven decisions backed by both qualitative and quantitative insights.
                </li>
                <li className="my-1">
                  Identify and resolve pain points in crucial user journeys by analyzing Formbricks feedback
                  alongside PostHog&apos;s detailed user event tracking and cohort analysis.
                </li>
                <li className="my-1">
                  Target and survey specific user cohorts based on their engagement and behavior patterns,
                  allowing for personalized and context-aware feedback collection.
                </li>
              </ul>
              <p className="my-4 list-disc">
                By connecting Formbricks and PostHog, you can empower your team to create exceptional user
                experiences driven by a unified understanding of both user feedback and product performance.
              </p>
            </div>
          </div>
          <hr className="my-8 border-slate-200" />
          <div>
            <h3 className="text-xl font-bold text-slate-800">Configuration</h3>
            <form className="mt-4 space-y-6">
              <div>
                <Label>PostHog Project API Key</Label>
                <Input type="text" placeholder="e.g. phc_3kH7bT1pL0sR9fA6uY2cQ8mJ5xD4wZgVnO1hC7tB3Fz" />
              </div>
              <div>
                <Label>PostHog Endpoint Host</Label>
                <Input type="URL" defaultValue="https://app.posthog.com" />
              </div>
              <div>
                <Label className="block">Synchronization Options</Label>
                <Label className="font-normal text-slate-400">
                  Choose what data you want to send to PostHog
                </Label>
                <div className="mt-2 space-y-4 rounded bg-slate-50 p-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="displays" />
                    <Label htmlFor="displays">
                      Displays <span className="text-xs text-slate-500">When a survey is displayed</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="displays" />
                    <Label htmlFor="displays">
                      Responses <span className="text-xs text-slate-500">When a response is created</span>
                    </Label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="minimal">Cancel</Button>
                <Button variant="primary">Save</Button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-span-1">
          <DocsSidebar />
        </div>
      </div>
    </div>
  );
}
