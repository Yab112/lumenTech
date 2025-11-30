import { BriefcaseBusiness, BookOpen, FolderKanban } from "lucide-react";
import { IconHome } from "@tabler/icons-react";

export const links = [
  {
    title: "Home",
    icon: (
      <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/",
  },
  {
    title: "Careers",
    icon: (
      <BriefcaseBusiness className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/careers",
  },
  {
    title: "Blog",
    icon: (
      <BookOpen className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/blog",
  },
  {
    title: "Projects",
    icon: (
      <FolderKanban className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/projects",
  },
];
