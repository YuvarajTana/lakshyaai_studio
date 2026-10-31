import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@lakshya/tokens/fonts.css";
import "@lakshya/tokens/styles.css";
import "@lakshya/motion/styles.css";
import "@lakshya/three/styles.css";
import "@lakshya/ui/styles.css";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: { default: "LakshyaAI Studio — Website foundation kit", template: "%s · LakshyaAI Studio" },
  description:
    "Free, open website foundations for scroll storytelling, real estate, hotels and e-commerce: 3D, GSAP motion and micro-interactions. Made in Tirupati & Bengaluru.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f4fbf7" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="studio">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
