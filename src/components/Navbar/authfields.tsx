export const registrationformFields = [
  {
    name: "username",
    label: "Foydalanuvchi nomi",
    placeholder: "UserName",
    type: "input",
  },
  {
    name: "phone",
    label: "Telefon",
    placeholder: "+998",
    type: "input",
  },
  {
    name: "password",
    label: "Parol",
    placeholder: "Parol",
    type: "password",
    showPasswordToggle: true,
  },
  {
    name: "role",
    label: "Investor yoki Startap asoschisi",
    type: "radio",
    options: [
      { label: "Investor", value: "investor" },
      { label: "Startap asoschisi", value: "startup" },
    ],
  },
];