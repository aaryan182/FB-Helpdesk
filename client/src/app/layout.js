import './globals.css'
import { Inter } from 'next/font/google'
import UserState from '@/context/UserState'
import 'font-awesome/css/font-awesome.min.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FB HelpDesk',
  description: 'FB HelpDesk, your solution to all your Facebook chat problems.',
}

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserState>
          <div>{children}</div>
        </UserState>
      </body>
    </html>
  )
}

export default RootLayout;