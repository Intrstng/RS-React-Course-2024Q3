import "./globals.css";
import { Metadata } from 'next'
import { ThemeContext, ThemeProvider } from '../contexts/Theme/Theme.context';

import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import { CSSProperties, ReactNode, useContext } from 'react';
import { ThemeControl } from '../components/ThemeControl/ThemeControl';
import { Search } from '../components/Search/Search';



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
        {/*<Provider store={store}>*/}
          <ErrorBoundary>
            <body>
              <main>{children}</main>
            </body>
          </ErrorBoundary>
        {/*</Provider>*/}
      </ThemeProvider>
      </html>
  );
}


