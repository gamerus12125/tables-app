import { useTheme } from "next-themes"
export const useToggleTheme = () => {
    const { setTheme } = useTheme()

    const toggleTheme = (theme: "light" | "dark" | "system") => {
        switch (theme) {
            case "system":
                return setTheme("system")
            case "dark":
                return setTheme("dark")
            case "light":
                return setTheme("light")
        }
    }
    return toggleTheme
}