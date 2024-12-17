import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  message: string;
};

export const FeedBack = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center gap-4 p-8 w-full sm:w-full md:w-1/2 "
    >
      <div className="flex gap-4">
        <div className="flex flex-col w-full">
          <input
            type="text"
            placeholder="Voornaam"
            {...register("firstName", { required: "Voornaam is verplicht" })}
            className={`border rounded-[75px] px-6 py-4 w-full ${
              errors.firstName ? "border-red-500" : "border-black"
            }`}
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm">{errors.firstName.message}</span>
          )}
        </div>
        <div className="flex flex-col w-full">
          <input
            type="text"
            placeholder="Familie"
            {...register("lastName", { required: "Familienaam is verplicht" })}
            className={`border rounded-[75px] px-6 py-4 w-full ${
              errors.lastName ? "border-red-500" : "border-black"
            }`}
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm">{errors.lastName.message}</span>
          )}
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col w-full">
          <input
            type="text"
            placeholder="Email"
            {...register("email", {
              required: "Email is verplicht",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Ongeldig emailadres",
              },
            })}
            className={`border rounded-[75px] px-6 py-4 w-full ${
              errors.email ? "border-red-500" : "border-black"
            }`}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col w-full">
          <input
            type="text"
            placeholder="Telefoon"
            {...register("phone", {
              required: "Telefoonnummer is verplicht",
              pattern: {
                value: /^[0-9]+$/,
                message: "Ongeldig telefoonnummer",
              },
            })}
            className={`border rounded-[75px] px-6 py-4 w-full ${
              errors.phone ? "border-red-500" : "border-black"
            }`}
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">{errors.phone.message}</span>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <select
          {...register("location", { required: "Locatie is verplicht" })}
          className={`border bg-background px-6 py-4 rounded-[75px] w-full ${
            errors.location ? "border-red-500" : "border-black"
          }`}
        >
          <option value="">Kies een locatie</option>
          <option value="locatie1">Locatie 1</option>
          <option value="locatie2">Locatie 2</option>
        </select>
        {errors.location && (
          <span className="text-red-500 text-sm">{errors.location.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <textarea
          placeholder="Bericht"
          {...register("message", { required: "Bericht is verplicht" })}
          className={`border rounded-[30px] px-4 py-2 w-full h-28 ${
            errors.message ? "border-red-500" : "border-black"
          }`}
        />
        {errors.message && (
          <span className="text-red-500 text-sm">{errors.message.message}</span>
        )}
      </div>
      <Button variant="secondary" type="submit" className="self-start px-6 py-3 text-white">
        Verzenden
      </Button>
    </form>
  );
};
