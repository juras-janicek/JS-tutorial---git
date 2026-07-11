import "./globals.css";

export const metadata = {
  title: "say hello",
  description: "easy project in next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}