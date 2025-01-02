import Navbar from "./components/Navbar";
import { getUser } from "../lib/dal";
import './global.css';
import localFont from 'next/font/local';

const aptos = localFont({
  src: [
    {
      path: '../fonts/Aptos-Bold.ttf',
      weight: '700', 
      style: 'normal',
    },
    {
      path: '../fonts/Aptos-Display.ttf',
      weight: '400', 
      style: 'normal', 
    },
    {
      path: '../fonts/Aptos-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../fonts/Aptos-SemiBold.ttf',
      weight: '600', 
      style: 'normal',
    },
  ],
});

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default async function RootLayout({ children }) {
  const user = await getUser();
  const userRole = user?.userRole || "user";

  return (
    <html lang="en" className={aptos.className}>
      <body>
        <Navbar user={user} userRole={userRole} />
        {children}
      </body>
    </html>
  );
}
