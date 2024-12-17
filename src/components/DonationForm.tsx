import React, { useState } from "react";

const DonationForm: React.FC = () => {
  const [amount, setAmount] = useState(5000);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("uzcard");

  const paymentMethods = [
    { id: "uzcard", name: "Uzcard" },
    { id: "payme", name: "Payme" },
    { id: "uzum", name: "Uzum" },
    { id: "click", name: "Click" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ amount, cardNumber, expiryDate, paymentMethod });
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Оплатить</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Сумма */}
        <div>
          <label className="block text-sm font-medium mb-1">Сумма</label>
          <input
            type="number"
            value={amount}
            min="5000"
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Сообщение */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Сообщение к донату
          </label>
          <textarea
            rows={2}
            maxLength={200}
            placeholder="Введите сообщение"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Методы оплаты */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Способ оплаты
          </label>
          <div className="flex space-x-4">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethod(method.id)}
                className={`px-4 py-2 border rounded-lg ${
                  paymentMethod === method.id
                    ? "bg-yellow-300 border-yellow-500"
                    : "bg-gray-100"
                }`}
              >
                {method.name}
              </button>
            ))}
          </div>
        </div>

        {/* Номер карты */}
        <div>
          <label className="block text-sm font-medium mb-1">Номер карты</label>
          <input
            type="text"
            placeholder="Введите номер карты"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Срок действия карты */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Срок действия карты
          </label>
          <input
            type="text"
            placeholder="MM/ГГ"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Кнопка */}
        <div>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-white font-bold py-2 rounded-lg hover:bg-yellow-500"
          >
            Оплатить
          </button>
        </div>
      </form>
    </div>
  );
};

export default DonationForm;
