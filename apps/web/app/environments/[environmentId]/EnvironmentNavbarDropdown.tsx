"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/shared/DropdownMenu";
import { capitalizeFirstLetter } from "@/lib/utils";
import { ProfileAvatar } from "@formbricks/ui";
import {
  AdjustmentsVerticalIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  CodeBracketIcon,
  CreditCardIcon,
  DocumentCheckIcon,
  HeartIcon,
  PaintBrushIcon,
  PlusIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AddProductModal from "./AddProductModal";
import { useRouter } from "next/navigation";

export default function EnvironmentsNavbarDropdown({ environment, session }) {
  const router = useRouter();
  const [widgetSetupCompleted, setWidgetSetupCompleted] = useState(false);

  const [showAddProductModal, setShowAddProductModal] = useState(false);

  useEffect(() => {
    if (environment && environment.widgetSetupCompleted) {
      setWidgetSetupCompleted(true);
    } else {
      setWidgetSetupCompleted(false);
    }
  }, [environment]);

  const changeEnvironment = (environmentType: string) => {
    const newEnvironmentId = environment.product.environments.find((e) => e.type === environmentType)?.id;
    router.push(`/environments/${newEnvironmentId}/`);
  };

  const changeEnvironmentByProduct = (productId: string) => {
    const product = environment.availableProducts.find((p) => p.id === productId);
    const newEnvironmentId = product?.environments[0]?.id;
    router.push(`/environments/${newEnvironmentId}/`);
  };

  const dropdownnavigation = [
    {
      title: "Survey",
      links: [
        {
          icon: AdjustmentsVerticalIcon,
          label: "Survey Settings",
          href: `/environments/${environment.id}/settings/product`,
        },
        {
          icon: PaintBrushIcon,
          label: "Look & Feel",
          href: `/environments/${environment.id}/settings/lookandfeel`,
        },
      ],
    },
    {
      title: "Account",
      links: [
        {
          icon: UserCircleIcon,
          label: "Profile",
          href: `/environments/${environment.id}/settings/profile`,
        },
        { icon: UsersIcon, label: "Team", href: `/environments/${environment.id}/settings/members` },
        {
          icon: CreditCardIcon,
          label: "Billing & Plan",
          href: `/environments/${environment.id}/settings/billing`,
          hidden: process.env.NEXT_PUBLIC_IS_FORMBRICKS_CLOUD !== "1",
        },
        /*  {
              icon: RocketLaunchIcon,
              label: "Upgrade account",
              href: `/environments/${environmentId}/settings/billing`,
            }, */
      ],
    },
    {
      title: "Setup",
      links: [
        {
          icon: DocumentCheckIcon,
          label: "Setup checklist",
          href: `/environments/${environment.id}/settings/setup`,
          hidden: widgetSetupCompleted,
        },
        {
          icon: CodeBracketIcon,
          label: "Developer Docs",
          href: "https://formbricks.com/docs",
          target: "_blank",
        },
        {
          icon: HeartIcon,
          label: "Contribute to Formbricks",
          href: "https://github.com/formbricks/formbricks",
          target: "_blank",
        },
      ],
    },
  ];
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex cursor-pointer flex-row items-center space-x-5">
            {session.user.image ? (
              <Image
                src={session.user.image}
                width="100"
                height="100"
                className="h-9 w-9 rounded-full"
                alt="Profile picture"
              />
            ) : (
              <ProfileAvatar userId={session.user.id} />
            )}

            <div>
              <p className="-mb-0.5 text-sm font-bold text-slate-700">{environment?.product?.name}</p>
              <p className="text-sm text-slate-500">{capitalizeFirstLetter(environment?.type)}</p>
            </div>
            <ChevronDownIcon className="h-5 w-5 text-slate-700 hover:text-slate-500" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            <span className="font-normal">Signed in as</span> {session.user.name}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <div>
                <p>{environment?.product?.name}</p>
                <p className=" block text-xs text-slate-500">Product</p>
              </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={environment?.product.id}
                  onValueChange={changeEnvironmentByProduct}>
                  {environment?.availableProducts?.map((product) => (
                    <DropdownMenuRadioItem value={product.id} className="cursor-pointer" key={product.id}>
                      {product.name}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setShowAddProductModal(true)}>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  <span>Add product</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <div>
                <p>{capitalizeFirstLetter(environment?.type)}</p>
                <p className=" block text-xs text-slate-500">Environment</p>
              </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={environment?.type} onValueChange={(v) => changeEnvironment(v)}>
                  <DropdownMenuRadioItem value="production" className="cursor-pointer">
                    Production
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="development" className="cursor-pointer">
                    Development
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          {dropdownnavigation.map((item) => (
            <DropdownMenuGroup key={item.title}>
              <DropdownMenuSeparator />
              {item.links.map(
                (link) =>
                  !link.hidden && (
                    <Link href={link.href} target={link.target} key={link.label}>
                      <DropdownMenuItem key={link.label}>
                        <div className="flex items-center">
                          <link.icon className="mr-2 h-4 w-4" />
                          <span>{link.label}</span>
                        </div>
                      </DropdownMenuItem>
                    </Link>
                  )
              )}
            </DropdownMenuGroup>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                signOut();
              }}>
              <div className="flex h-full w-full items-center">
                <ArrowRightOnRectangleIcon className="mr-2 h-4 w-4" />
                Logout
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <AddProductModal
        open={showAddProductModal}
        setOpen={(val) => setShowAddProductModal(val)}
        environmentId={environment.id}
      />
    </>
  );
}
