import { ReactNode } from 'react';
import Page from '../../components/Page/Page';

export default function PageLayout({
                                     children,
                                   }: {
  children: ReactNode
}) {
  return (
      <Page>
        {children}
      </Page>
  )
}