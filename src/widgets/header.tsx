"use client";
import { ToggleThemeButton } from "@/features/toggle-theme";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/shared/ui/ui-navigation-menu";
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import Link from "next/link";

export const Header = () => {
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
          </div>
        </NavigationMenuList>
      </NavigationMenu>
      <ToggleThemeButton />
    </header>
  );
};
