"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./theme-provider";

const qClient = new QueryClient()

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={qClient}><ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>{children}</ThemeProvider></QueryClientProvider>;
};

