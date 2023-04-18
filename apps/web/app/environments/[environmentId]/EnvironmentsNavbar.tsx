import { CustomersIcon, FilterIcon, FormIcon, SettingsIcon } from "@formbricks/ui";
import { PlusIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import type { Session } from "next-auth";
import Link from "next/link";
import EnvironmentsNavbarDropdown from "./EnvironmentNavbarDropdown";

interface EnvironmentsNavbarProps {
  environment: any;
  session: Session;
}

export default function EnvironmentsNavbar({ environment, session }: EnvironmentsNavbarProps) {
  const navigation = [
    {
      name: "Surveys",
      href: `/environments/${environment.id}/surveys`,
      icon: FormIcon,
      /* current: pathname?.includes("/surveys"), */
      current: false,
    },
    {
      name: "People",
      href: `/environments/${environment.id}/people`,
      icon: CustomersIcon,
      /* current: pathname?.includes("/people"), */
      current: false,
    },
    {
      name: "Actions & Attributes",
      href: `/environments/${environment.id}/events`,
      icon: FilterIcon,
      /* current: pathname?.includes("/events") || pathname?.includes("/attributes"), */
      current: false,
    },
    /*       {
        name: "Integrations",
        href: `/environments/${environment.id}/integrations/installation`,
        icon: DashboardIcon,
        current: pathname?.includes("/integrations"),
      }, */
    {
      name: "Settings",
      href: `/environments/${environment.id}/settings/profile`,
      icon: SettingsIcon,
      /* current: pathname?.includes("/settings"), */
      current: false,
    },
  ];

  return (
    <nav className="top-0 z-10 w-full border-b border-slate-200 bg-white">
      {environment?.type === "development" && (
        <div className="h-6 w-full bg-[#A33700] p-0.5 text-center text-sm text-white">
          You&apos;re in development mode. Use it to test surveys, events and attributes.
        </div>
      )}

      <div className="w-full px-4 sm:px-6">
        <div className="flex h-14 justify-between">
          <div className="flex  space-x-4 py-2">
            <Link
              href={`/environments/${environment.id}/surveys/templates`}
              className="from-brand-light to-brand-dark my-1 flex items-center justify-center rounded-md bg-gradient-to-b px-1 text-white transition-all ease-in-out hover:scale-105">
              <PlusIcon className="h-6 w-6" />
            </Link>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  item.current
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-900 hover:bg-slate-50 hover:text-slate-900",
                  "inline-flex items-center rounded-md px-2 py-1 text-sm font-medium"
                )}
                aria-current={item.current ? "page" : undefined}>
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <EnvironmentsNavbarDropdown environment={environment} session={session} />
          </div>
        </div>
      </div>
    </nav>
  );
}
