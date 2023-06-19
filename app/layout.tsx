import { Roboto } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import '@/styles/styles.css'


const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: "W3GPT",
  description: "Web3 enabled AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.className}>

      <head>
        <link
          rel="apple-touch-icon"
          href="/robot.png"
        />
        <link
          rel="icon"
          href="/robot.png"
        />

      </head>

      <body style={{
        backgroundColor: "#343541",
        margin: 0,
        padding: 0,
      }}>
        {children}
        <Analytics />
      </body>

    </html>
  );
}
