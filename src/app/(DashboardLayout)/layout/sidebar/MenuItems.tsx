import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
  IconGrain,
  IconReport,
  IconMessageChatbot,
  IconNavigation,
  IconBookmark,
  IconFlare
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "Learn",
    icon: IconMessageChatbot,
    href: "/chat",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },

  {
    navlabel: true,
    subheader: "TOOLS",
  },
  {
    id: uniqueId(),
    title: "Guider",
    icon: IconNavigation,
    href: "/utilities/typography",
  },
  {
    id: uniqueId(),
    title: "Live Test",
    icon: IconFlare,
    href: "/utilities/typography",
  },
  {
    id: uniqueId(),
    title: "Saved",
    icon: IconBookmark,
    href: "/utilities/shadow",
  },
  // {
  //   navlabel: true,
  //   subheader: "Auth",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Login",
  //   icon: IconLogin,
  //   href: "/authentication/login",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Register",
  //   icon: IconUserPlus,
  //   href: "/authentication/register",
  // },
  // {
  //   navlabel: true,
  //   subheader: "Extra",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Icons",
  //   icon: IconMoodHappy,
  //   href: "/icons",
  // },
];

export default Menuitems;
