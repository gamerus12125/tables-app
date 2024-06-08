"use client"
import { Button } from "@/shared/ui/ui-button";
import { signOut } from "next-auth/react";

export const SignOutButton = () => {
    return <Button onClick={() => signOut()}>Выйти</Button>;
}