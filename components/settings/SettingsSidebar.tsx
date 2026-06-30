"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Bot,
  Globe,
  HelpCircle,
  Lock,
  Palette,
  Plane,
  Settings,
  Shield,
} from "lucide-react";

const tabs = [
  { id: "general", label: "General", icon: Settings },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
  { id: "travel", label: "Travel Preferences", icon: Plane },
  { id: "ai", label: "AI Preferences", icon: Bot },
  { id: "privacy", label: "Privacy", icon: Shield },
  { id: "support", label: "Support", icon: HelpCircle },
  { id: "about", label: "About", icon: Globe },
];

interface SettingsSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function SettingsSidebar({
  activeTab,
  onTabChange,
}: SettingsSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onTabChange(id)}
            className={[
              "flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all whitespace-nowrap",
              activeTab === id
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800",
            ].join(" ")}
          >
            <Icon className="h-4 w-4" strokeWidth={2} />
            {label}
          </button>
        ))}
      </nav>
      <Link
        href="/profile"
        className={[
          "hidden lg:flex mt-6 items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700",
          pathname === "/profile" ? "font-semibold" : "",
        ].join(" ")}
      >
        ← Back to Profile
      </Link>
    </aside>
  );
}

export { tabs };
