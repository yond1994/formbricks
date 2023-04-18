import EnvironmentsNavbar from "@/app/environments/[environmentId]/EnvironmentsNavbar";
import ToasterClient from "@/components/ToasterClient";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import PosthogIdentify from "./PosthogIdentify";
import FormbricksClient from "./FormbricksClient";
import { headers } from "next/headers";

async function getEnvironment(environmentId) {
  const cookie = headers().get("cookie") || "";
  console.log(`${process.env.NEXTAUTH_URL}/api/v1/environments/${environmentId}/`);
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/v1/environments/${environmentId}/`, {
    headers: {
      cookie,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function EnvironmentLayout({ children, params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect(`/auth/login`);
  }

  const environment = await getEnvironment(params.environmentId);

  return (
    <>
      {<PosthogIdentify session={session} />}
      <FormbricksClient session={session} />
      <ToasterClient />
      <EnvironmentsNavbar environment={environment} session={session} />
      <main className="h-full flex-1 overflow-y-auto bg-slate-50">
        {children}
        <main />
      </main>
    </>
  );
}
