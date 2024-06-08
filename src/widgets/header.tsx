"use client";
import { ToggleThemeButton } from "@/features/toggle-theme";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/shared/ui/ui-navigation-menu";
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import { MenuIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const Header = () => {
  const session = useSession();

  return (
    <header className="flex items-center justify-between p-3 max-w-full">
      <NavigationMenu>
        <NavigationMenuList className="justify-between">
          <div className="flex items-center justify-center gap-4">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Главная
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/tables" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Таблицы
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {session.status === "authenticated" ? (
              <NavigationMenuItem>
                <Link href="/profile" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {session.data?.user?.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ) : (
              <>
                <NavigationMenuItem>
                  <Link href="/sign-in" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Войти
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/register" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Зарегистрироваться
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </>
            )}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
      <ToggleThemeButton />
    </header>
  );
};
