import { registerUser } from "@/shared/auth/actions";
import { Button } from "@/shared/ui/ui-button";
import { Input } from "@/shared/ui/ui-input";
const Register = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 w-fit border-4 rounded-xl px-10 py-5 mx-auto">
      <h1>Регистрация</h1>
      <form
        className="flex flex-col justify-center items-center gap-3"
        action={async (formData) => {
          "use server";
          registerUser(formData);
        }}
      >
        <Input type="text" placeholder="Логин" name="login" id="login" />
        <Input type="text" placeholder="Почта" name="email" id="email" />
        <Input type="text" placeholder="Пароль" name="password" id="password" />
        <Button type="submit">Зарегистрироваться</Button>
      </form>
    </div>
  );
};
export default Register;
