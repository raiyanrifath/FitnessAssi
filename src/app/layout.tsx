import type { Metadata } from "next";
import "@fontsource/oswald/400.css";
import "@fontsource/oswald/500.css";
import "@fontsource/oswald/600.css";
import "@fontsource/oswald/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import { Toaster } from "sonner";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { PlanProvider } from "@/context/plan-context";

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "FitLog — Workout Library",
    description:
      "Pick a lift, lock it into today's plan, and watch the week's work add up.",
    images: ["/banner.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body">
        <PlanProvider>
          <Navbar />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#1e1e1e",
                border: "1px solid #2a2a2a",
                color: "#fff",
              },
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}
