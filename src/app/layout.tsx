import "./globals.css";
import { Metadata } from 'next'
import { ThemeProvider } from '../contexts/Theme/Theme.context';
import { ReactNode } from 'react';
import StoreProvider from './StoreProvider';


export const metadata: Metadata = {
  title: 'RS School Next.js',
  description: 'RS School Next.js App Routing',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: ReactNode;
}) {
  return (
      <html lang="en">
      <ThemeProvider>
        <StoreProvider>
          <body>
          <main>{children}</main>
          </body>
        </StoreProvider>
      </ThemeProvider>
      </html>
  );
}
