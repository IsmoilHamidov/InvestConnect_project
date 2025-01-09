import { FaCreditCard } from "react-icons/fa";

export default function BankCardBalance() {
  return (
    <div className="w-full min-h-[16rem] h-auto   bg-gradient-to-r 
     from-[#1e2f36] to-[#57737d] text-white shadow-lg border-[1px] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold tracking-wide">Bank kartasi</h2>
          <p className="text-sm opacity-80">Xavfsiz hisob</p>
        </div>
        <FaCreditCard className="text-3xl opacity-90" />
      </div>
      <div className="mb-8">
        <h3 className="text-sm opacity-80 mb-1">Karta raqami</h3>
        <p className="text-lg font-bold tracking-wide">**** **** **** 9876</p>
      </div>
      <div>
        <h3 className="text-sm opacity-80 mb-1">Mavjud balans</h3>
        <p className="text-3xl font-bold">$500000</p>
      </div>
    </div>
  );
}
