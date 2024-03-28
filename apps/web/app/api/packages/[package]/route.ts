import { responses } from "@/app/lib/api/response";
import fs from "fs/promises";
import { NextRequest } from "next/server";
import path from "path";

const listAllFiles = async (dirPath: string): Promise<string[]> => {
  let filesList: string[] = [];
  const files = await fs.readdir(dirPath, { withFileTypes: true });
  for (const file of files) {
    const filePath = path.join(dirPath, file.name);
    if (file.isDirectory()) {
      filesList = filesList.concat(await listAllFiles(filePath));
    } else {
      filesList.push(filePath);
    }
  }
  return filesList;
};

const listDirectoriesBreadthFirst = async () => {
  let startDir = process.cwd();
  let jsDir = path.join(startDir, "../../packages/");

  const allFiles = await listAllFiles(jsDir);
  console.log("All files in packages/:", allFiles);
};

export async function GET(_: NextRequest, { params }: { params: { slug: string } }) {
  let path: string;
  const packageRequested = params["package"];
  listDirectoriesBreadthFirst();

  switch (packageRequested) {
    case "js-core":
      path = `../../packages/js-core/dist/index.umd.cjs`;
      break;
    case "surveys":
      path = `../../packages/surveys/dist/index.umd.cjs`;
      break;
    default:
      return responses.notFoundResponse(
        "package",
        packageRequested,
        true,
        "public, s-maxage=600, max-age=1800, stale-while-revalidate=600, stale-if-error=600"
      );
  }

  try {
    const packageSrcCode = await fs.readFile(path, "utf-8");
    return new Response(packageSrcCode, {
      headers: {
        "Content-Type": "application/javascript",
        "Cache-Control": "public, s-maxage=600, max-age=1800, stale-while-revalidate=600, stale-if-error=600",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error reading file:", error);
    return responses.internalServerErrorResponse(
      "file not found:",
      true,
      "public, s-maxage=600, max-age=1800, stale-while-revalidate=600, stale-if-error=600"
    );
  }
}
