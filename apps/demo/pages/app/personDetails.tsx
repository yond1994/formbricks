import React, { useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function DataSection({ title, data }: { title: string; data: any }) {
  return (
    data &&
    JSON.stringify(data) !== "{}" && (
      <div className="mt-2 text-slate-700 dark:text-slate-300">
        <strong>{title}</strong>
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li key={key}>
              {capitalizeFirstLetter(key)}: {value}
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export default function PersonDetails({ refreshKey }: { refreshKey: number }) {
  const [localStorageData, setLocalStorageData] = useState<any>();
  const [userAgentData, setUserAgentData] = useState<any>();

  const agent = userAgentData ? UAParser(userAgentData.userAgent) : undefined;
  const attributes = localStorageData?.state?.person.attributes;
  const metadata = agent
    ? {
        device: agent.device.type,
        browser: agent.browser.name,
        os: agent.os.name,
      }
    : undefined;

  useEffect(() => {
    const formbricksData = localStorage?.getItem("formbricks-js");
    if (formbricksData) {
      setLocalStorageData(JSON.parse(formbricksData));
    }

    const allySupportsData = localStorage?.getItem("ally-supports-cache");
    if (allySupportsData) {
      setUserAgentData(JSON.parse(allySupportsData));
    }
  }, [refreshKey]);

  return (
    <div>
      <DataSection title="Metadata" data={metadata} />
      <DataSection title="Attributes" data={attributes} />
    </div>
  );
}
