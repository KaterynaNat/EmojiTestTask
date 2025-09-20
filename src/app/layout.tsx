// app/layout.tsx
/* eslint-disable react-refresh/only-export-components */

import "./globals.css";
import type { ReactNode } from "react";

export const metadata = { title: "Emotions Board" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
