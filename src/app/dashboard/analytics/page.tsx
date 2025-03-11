import FinanceCard from "@/components/FinanceCard";
import PeriodSelector from "@/components/PeriodSelector";
import Chat from "@/components/Chat";

const page = () => {
  return (
    <main className="p-5 flex gap-10">
      <div className="flex flex-col gap-3">
        <FinanceCard title="Income" link={"/dashboard/income"} />
        <FinanceCard title="Expense" link={"/dashboard/expense"} />
        <h2 className="text-blue-500">Select period</h2>
        <PeriodSelector />
      </div>
      <div className="flex flex-col w-full">
        <Chat />
      </div>
    </main>
  );
};

export default page;
