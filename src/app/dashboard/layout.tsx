import CustomLink from "@/components/UI/CustomLink";
import { links } from "@/constants/routes";
import { ILayoutProps } from "@/types/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Expense Tracker",
  description:
    "Welcome to the Expense Tracker dashboard. Manage your income, expenses, and additional analytics.",
  keywords: "Main, Income, Expense, AI analytics, Dashboard",
};

export default function DashboardLayout({ children }: ILayoutProps) {
  return (
    <div className="flex">
      <div className="w-60 h-screen text-gray-100 bg-gray-800 left-0 top-0 sticky">
        <header className="h-20 flex px-10 items-center border-b border-gray-700">
          <h1>Expense Tracker</h1>
        </header>
        <nav className="flex flex-col gap-4 p-6 px-10">
          {links.map((link) => (
            <CustomLink link={link} key={link.text} />
          ))}
        </nav>
      </div>
      <div className="flex-1 relative">{children}</div>
    </div>
  );
}
