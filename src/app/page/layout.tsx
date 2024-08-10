import { ReactNode } from 'react';
import Page from '../../components/Page/Page';
import MainPage from './[id]/page';
import CardList from '../../components/CardList/CardList';
import { DetailedCard } from '../../components/DetailedCard/DetailedCard';

// export default function PageLayout({
//                                           children,
//                                         }: {
//   children: ReactNode
// }) {
//   return (
//       <Page>
//         <MainPage>
//           {children}
//         </MainPage>
//       </Page>
//   )
// }




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