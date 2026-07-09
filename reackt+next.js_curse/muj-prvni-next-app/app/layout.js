export const metadata = {
  title: "Můj první Next.js web",
  description: "Učím se Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <body>
        {children}
      </body>
    </html>
  );
}
