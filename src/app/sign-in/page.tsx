import { signIn } from "@/shared/auth/auth";
import { Button } from "@/shared/ui/ui-button";
import { Input } from "@/shared/ui/ui-input";

const SignIn = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 w-fit border-4 rounded-xl px-10 py-5 mx-auto">
      <h1>Вход</h1>
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <Button type="submit">Войти через Github</Button>
      </form>
      <form
        action={async () => {
          "use server";
          await signIn("yandex");
        }}
      >
        <Button type="submit">Войти через Yandex</Button>
      </form>
      <form
        action={async () => {
          "use server";
          await signIn("discord");
        }}
      >
        <Button type="submit">Войти через Discord</Button>
      </form>
      <span>Или</span>
      <form
        action={async (formData) => {
          "use server";
          await signIn("credentials", formData);
        }}
        className="flex flex-col pt-3 gap-3 border-t-2"
      >

        <Input type="text" placeholder="Почта" name="email" id="email" required/>
        <Input type="text" placeholder="Пароль" name="password" id="password" required/>
        <Button type="submit">Войти</Button>
      </form>
    </div>
  );
};

export default SignIn;
