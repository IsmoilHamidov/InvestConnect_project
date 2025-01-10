import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const policyText = {
  text: `
1. Umumiy qoidalar
1.1. Ushbu shartnoma InvestConnect platformasi (keyingi o‘rinlarda “Platforma”)dan foydalanish qoidalarini belgilaydi.
1.2. Platformadan foydalanish orqali Siz ushbu shartnoma shartlariga rozilik bildirasiz.
1.3. Platforma foydalanuvchilarga o‘z bizneslari uchun investorlar bilan bog‘lanish, shuningdek, loyihalarga investitsiya qilish imkoniyatini beradi.

2. Ro‘yxatdan o‘tish va hisob qaydnomasidan foydalanish
2.1. Platformadan foydalanish uchun foydalanuvchilar ro‘yxatdan o‘tishlari va shaxsiy ma’lumotlarni taqdim etishlari zarur.
2.2. Foydalanuvchi o‘z hisob qaydnomasi ma’lumotlarining maxfiyligini ta’minlashi va uchinchi shaxslarga oshkor qilmasligi shart.
2.3. Agar hisob qaydnomasi noqonuniy foydalanilgan bo‘lsa, foydalanuvchi darhol Platforma administratsiyasini xabardor qilishi kerak.

...

8. Aloqa ma’lumotlari
Savollar yoki muammolar yuzasidan foydalanuvchilar quyidagi manzilga murojaat qilishlari mumkin:
Email: support@investconnect.com
Telefon: +998 (XX) XXX-XX-XX`,
};

const PrivacyPolicy = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <span className="text-blue-500 lowercase ">
          Foydalanish shartlari{" "}
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-2xl animate-fade-in">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            FOYDALANUVCHILAR VA FOYDALANISH SHARTNOMASI
          </DialogTitle>
          <DialogDescription className="mt-4 max-h-96 overflow-y-auto text-lg leading-8 text-black whitespace-pre-line scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {policyText.text}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyPolicy;
