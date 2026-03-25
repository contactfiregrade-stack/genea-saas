import type { ReactNode } from "react";

export const metadata = {
  title: "Genea Search",
  description: "Recherche documentaire intelligente pour généalogie et archives"
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          background: "#f7f8fb",
          color: "#111827"
        }}
      >
        {children}
      </body>
    </html>
  );
}
