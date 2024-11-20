import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Savio Santos",
  icons: {
    icon: "https://github.com/dsaviossantos.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-green-950 flex items-center justify-center p-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-green-500 to-transparent opacity-20 transform -skew-y-6"></div>
          <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-green-500 to-transparent opacity-20 transform skew-y-6"></div>
          {children}
        </div>
      </body>
    </html>
  );
}
