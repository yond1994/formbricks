import type { Survey } from "@formbricks/types/surveys";
import HowToSendCard from "./(settingsCards)/HowToSendCard";
import RecontactOptionsCard from "./(settingsCards)/RecontactOptionsCard";
import ResponseOptionsCard from "./(settingsCards)/ResponseOptionsCard";
import WhenToSendCard from "./(settingsCards)/WhenToSendCard";
import WhoToSendCard from "./(settingsCards)/WhoToSendCard";

interface SettingsViewProps {
  environmentId: string;
  localSurvey: Survey;
  setLocalSurvey: (survey: Survey) => void;
}

export default function SettingsView({ environmentId, localSurvey, setLocalSurvey }: SettingsViewProps) {
  return (
    <div className="mt-12 space-y-3 p-5">
      <HowToSendCard
        localSurvey={localSurvey}
        setLocalSurvey={setLocalSurvey}
        environmentId={environmentId}
      />

      <WhoToSendCard
        localSurvey={localSurvey}
        setLocalSurvey={setLocalSurvey}
        environmentId={environmentId}
      />

      <WhenToSendCard
        localSurvey={localSurvey}
        setLocalSurvey={setLocalSurvey}
        environmentId={environmentId}
      />

      <ResponseOptionsCard localSurvey={localSurvey} setLocalSurvey={setLocalSurvey} />

      <RecontactOptionsCard
        localSurvey={localSurvey}
        setLocalSurvey={setLocalSurvey}
        environmentId={environmentId}
      />
    </div>
  );
}
