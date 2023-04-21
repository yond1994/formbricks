"use client";

import DeleteDialog from "@/components/shared/DeleteDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shared/DropdownMenu";
import { deleteSurvey } from "@/lib/surveys/surveys";
import { EllipsisHorizontalIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SurveyContextMenu({ environmentId, surveys, survey, surveyIdx }) {
  const router = useRouter();

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [activeSurvey, setActiveSurvey] = useState("" as any);
  const [activeSurveyIdx, setActiveSurveyIdx] = useState("" as any);

  const deleteSurveyAction = async (survey, surveyIdx) => {
    try {
      await deleteSurvey(environmentId, survey.id);
      // remove locally
      const updatedsurveys = JSON.parse(JSON.stringify(surveys));
      updatedsurveys.splice(surveyIdx, 1);
      router.refresh();
      setDeleteDialogOpen(false);
      toast.success("Survey deleted successfully.");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="z-10 cursor-pointer" asChild>
          <div>
            <span className="sr-only">Open options</span>
            <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link
                className="flex w-full items-center"
                href={`/environments/${environmentId}/surveys/${survey.id}/edit`}>
                <PencilSquareIcon className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button
                className="flex w-full  items-center"
                onClick={() => {
                  setActiveSurvey(survey);
                  setActiveSurveyIdx(surveyIdx);
                  setDeleteDialogOpen(true);
                }}>
                <TrashIcon className="mr-2 h-4 w-4" />
                Delete
              </button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteDialog
        deleteWhat="Survey"
        open={isDeleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        onDelete={() => deleteSurveyAction(activeSurvey, activeSurveyIdx)}
      />
    </>
  );
}
