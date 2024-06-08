"use client"
import { SignOutButton } from "@/features/auth";
import { CreateTableButton } from "@/features/table";
import { useSession } from "next-auth/react";

const Profile = () => {
  const session = useSession()
  return (
    <div>
      <h1 className="text-center">Профиль</h1>
      <div className="flex gap-5 w-fit items-center mx-auto mt-10">
      <CreateTableButton />
      <SignOutButton />
      {session.data?.user.role === "admin" && <p className="text-center">Admin</p>}
      </div>
    </div>
  );
};
export default Profile;
