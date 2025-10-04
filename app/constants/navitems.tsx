import { Briefcase, Layers, Mail, User2 } from "lucide-react";
import { IconHome } from "@tabler/icons-react";

export const links = [
  {
    title: "Home",
    icon: (
      <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#home",
  },
  {
    title: "About",
    icon: (
      <User2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#about",
  },
  {
    title: "Services",
    icon: (
      <Briefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#services",
  },
  {
    title: "Solutions",
    icon: (
      <Layers className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#solutions",
  },
  {
    title: "Contact",
    icon: (
      <Mail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#contact",
  },
];
