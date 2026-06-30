"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SettingsSidebar from "@/components/settings/SettingsSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { motion } from "framer-motion";
import { useState } from "react";

function Toggle({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
      <input type="checkbox" defaultChecked={defaultChecked} className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500/30" />
    </label>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <SectionCard title="General">
            <div className="space-y-4">
              {["Full Name", "Email", "Phone"].map((f) => (
                <div key={f}>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">{f}</label>
                  <input className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white" defaultValue={f === "Full Name" ? "Sachin Mishra" : f === "Email" ? "sachin@staynest.com" : "+91 98765 43210"} />
                </div>
              ))}
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="text-sm font-medium text-gray-600 dark:text-gray-400">Language</label><select className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"><option>English</option><option>Hindi</option></select></div>
                <div><label className="text-sm font-medium text-gray-600 dark:text-gray-400">Country</label><select className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"><option>India</option></select></div>
              </div>
            </div>
          </SectionCard>
        );
      case "appearance":
        return (
          <SectionCard title="Appearance">
            <div className="space-y-4">
              <div><label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">Theme</label><ThemeToggle variant="dropdown" /></div>
              <div><label className="text-sm font-medium text-gray-600 dark:text-gray-400">Accent Color</label><div className="mt-2 flex gap-2">{["#16a34a","#0891b2","#7c3aed","#ea580c"].map((c) => (<button key={c} type="button" style={{ backgroundColor: c }} className="h-8 w-8 rounded-full ring-2 ring-offset-2 ring-emerald-500 dark:ring-offset-gray-900" />))}</div></div>
              <div><label className="text-sm font-medium text-gray-600 dark:text-gray-400">Font Size</label><select className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"><option>Medium</option><option>Small</option><option>Large</option></select></div>
            </div>
          </SectionCard>
        );
      case "notifications":
        return (
          <SectionCard title="Notifications">
            <div className="space-y-2">
              <Toggle label="Booking Updates" defaultChecked />
              <Toggle label="Promotions" />
              <Toggle label="Email Notifications" defaultChecked />
              <Toggle label="Push Notifications" defaultChecked />
              <Toggle label="AI Suggestions" defaultChecked />
            </div>
          </SectionCard>
        );
      case "security":
        return (
          <SectionCard title="Security">
            <div className="space-y-4">
              <button type="button" className="w-full rounded-xl border border-gray-200 py-3 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">Change Password</button>
              <Toggle label="Two-Factor Authentication (2FA)" />
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800"><p className="text-sm font-medium text-gray-900 dark:text-white">Active Sessions</p><p className="text-xs text-gray-500 mt-1">Chrome · Bangalore · Current session</p></div>
              <button type="button" className="w-full rounded-xl border border-red-200 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30">Delete Account</button>
            </div>
          </SectionCard>
        );
      case "travel":
        return (
          <SectionCard title="Travel Preferences">
            <div className="space-y-4">
              <div><label className="text-sm font-medium text-gray-600 dark:text-gray-400">Preferred Budget</label><input type="range" min={1000} max={10000} defaultValue={3500} className="mt-2 w-full accent-emerald-600" /></div>
              <div><p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Favourite Categories</p><div className="flex flex-wrap gap-2">{["Mountain","Beach","Forest","Desert","Lake","Luxury","Budget","Adventure","Family","Solo","Couple"].map((c) => (<button key={c} type="button" className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium hover:border-emerald-300 hover:bg-emerald-50 dark:border-gray-700 dark:hover:bg-emerald-950/30">{c}</button>))}</div></div>
            </div>
          </SectionCard>
        );
      case "ai":
        return (
          <SectionCard title="AI Preferences">
            <div className="space-y-2">
              <Toggle label="Enable AI Recommendations" defaultChecked />
              <Toggle label="Enable AI Chat" defaultChecked />
              <div><label className="text-sm font-medium text-gray-600 dark:text-gray-400">Travel Style</label><select className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"><option>Balanced</option><option>Adventure</option><option>Relaxation</option></select></div>
              <div><label className="text-sm font-medium text-gray-600 dark:text-gray-400">Budget Preference</label><select className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"><option>Mid-range</option><option>Budget</option><option>Luxury</option></select></div>
              <div><label className="text-sm font-medium text-gray-600 dark:text-gray-400">Recommendation Frequency</label><select className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"><option>Weekly</option><option>Daily</option><option>Monthly</option></select></div>
            </div>
          </SectionCard>
        );
      case "privacy":
        return (
          <SectionCard title="Privacy">
            <div className="space-y-2">
              <Toggle label="Show profile to hosts" defaultChecked />
              <Toggle label="Share travel preferences for better recommendations" defaultChecked />
              <Toggle label="Allow analytics" />
            </div>
          </SectionCard>
        );
      case "support":
        return (
          <SectionCard title="Support">
            <div className="space-y-3">
              {["FAQ", "Contact Support", "Privacy Policy", "Terms of Service"].map((item) => (
                <button key={item} type="button" className="w-full rounded-xl border border-gray-200 py-3 text-sm font-medium text-left px-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">{item}</button>
              ))}
            </div>
          </SectionCard>
        );
      case "about":
        return (
          <SectionCard title="About StayNest">
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">StayNest v1.0.0 — AI-powered homestay recommendation platform built for sustainable travel across India.</p>
            <p className="mt-4 text-xs text-gray-400">© 2026 StayNest. All rights reserved.</p>
          </SectionCard>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <motion.div key={activeTab} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }} className="flex-1 min-w-0">
            {renderContent()}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
