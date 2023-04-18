"use client";

import SurveyStatusIndicator from "@/components/shared/SurveyStatusIndicator";
import { Badge } from "@formbricks/ui";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ComputerDesktopIcon, LinkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import SurveyContextMenu from "./SurveyContextMenu";

interface SurveysListProps {
  environmentId: string;
  surveys: any[];
}

export default function SurveysList({ environmentId, surveys }: SurveysListProps) {
  return (
    <>
      <ul className="grid grid-cols-2 place-content-stretch gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 ">
        <Link href={`/environments/${environmentId}/surveys/templates`}>
          <li className="col-span-1 h-56">
            <div className="from-brand-light to-brand-dark delay-50 flex h-full items-center justify-center overflow-hidden rounded-md bg-gradient-to-b font-light text-white shadow transition ease-in-out hover:scale-105">
              <div className="px-4 py-8 sm:p-14 xl:p-10">
                <PlusIcon className="stroke-thin mx-auto h-14 w-14" />
                Create Survey
              </div>
            </div>
          </li>
        </Link>
        {surveys
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .map((survey, surveyIdx) => (
            <li key={survey.id} className="relative col-span-1 h-56">
              <div className="delay-50 flex h-full flex-col justify-between rounded-md bg-white shadow transition ease-in-out hover:scale-105">
                <div className="px-6 py-4">
                  <Badge
                    StartIcon={survey.type === "link" ? LinkIcon : ComputerDesktopIcon}
                    startIconClassName="mr-2"
                    text={
                      survey.type === "link"
                        ? "Link Survey"
                        : survey.type === "web"
                        ? "In-Product Survey"
                        : ""
                    }
                    type="gray"
                    size={"tiny"}
                    className="font-base"></Badge>
                  <p className="my-2 line-clamp-3 text-lg">{survey.name}</p>
                </div>
                <Link
                  href={
                    survey.status === "draft"
                      ? `/environments/${environmentId}/surveys/${survey.id}/edit`
                      : `/environments/${environmentId}/surveys/${survey.id}/summary`
                  }
                  className="absolute h-full w-full"></Link>
                <div className="divide-y divide-slate-100">
                  <div className="flex justify-between px-4 py-2 text-right sm:px-6">
                    <div className="flex items-center">
                      {survey.status !== "draft" && (
                        <>
                          <SurveyStatusIndicator
                            status={survey.status}
                            tooltip
                            environmentId={environmentId}
                          />
                          <p className="ml-2 text-xs text-slate-400 ">{survey._count?.responses} responses</p>
                        </>
                      )}
                      {survey.status === "draft" && (
                        <span className="text-xs italic text-slate-400">Draft</span>
                      )}
                    </div>
                    <SurveyContextMenu
                      environmentId={environmentId}
                      surveys={surveys}
                      survey={survey}
                      surveyIdx={surveyIdx}
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}
