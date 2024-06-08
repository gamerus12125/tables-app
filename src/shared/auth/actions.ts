import { genSalt, hashSync } from "bcrypt-ts";
import prisma from "./prisma";

export const registerUser = async (formData: FormData) => {
    const salt = await genSalt(10);
    const hashedPassword = await hashSync(
      formData.get("password") as string,
      salt
    );

    await prisma.user.create({
        data: {
          name: formData.get("login") as string,
          email: formData.get("email") as string,
          passwordHash: hashedPassword,
        },
      });
    
}
