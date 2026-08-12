import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Codebase Assistant",
  description: "AI-powered developer assistant for understanding and reviewing codebases.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
