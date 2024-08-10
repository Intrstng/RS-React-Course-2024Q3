// import React, { FC, useContext } from 'react';
// import { ThemeContext } from '../../../contexts/Theme/Theme.context';
// import { useAppSelector } from '../../../redux/store';
// import { VehicleDetailsDomain, VehiclesResponse } from '../../../shared/types/types';
// import { domainCardsSelector, favoritesSelector } from '../../../redux/selectors';
// import { FavoritesItems } from '../../../redux/slices/favoritesSlice';
// import { ThemeType } from '../../../contexts/Theme/Theme.model';
// import S from '../../../styles/CardList.module.css';
// import { Card } from '../../../components/Card/Card';
// import { DetailedCard } from '../../../components/DetailedCard/DetailedCard';
// import { CustomToastify } from '../../../components/CustomToastify/CustomToastify';
// import { CardListProps } from '../../../components/CardList/CardList';
// import { getCards } from '../../../services/getCards';
// import { Suspense } from 'react';
// import { Loader } from '../../../components/Loader/Loader';
//
// type Params = {
//   params: { id: string },
//   searchParams: { [key: string]: string | undefined },
// };
//
// export async function generateMetadata({ params }: Params) {
//   return { title: `Post: ${params.id}` };
// }
//
// const CardList = async ({ params, searchParams }: Params) => {
//   const pageId = Number(params.id) || 1;
//   const querySearch = searchParams.search || '';
//
//   const cards = await getCards({search: querySearch, page: pageId})
//   const domainCards = {
//     ...cards,
//     results:
//         cards.results.map(card => {
//       return {...card,
//         isChecked: false,
//         id: card.url.split('/').slice(-2, -1)[0],
//       }
//     }
//     )
//   }
//
// console.log('!!!!!!!!!!!!!!!!!!!!!', domainCards)
//   return (
//       <Suspense fallback={<Loader/>}>
//       <>
//         <section className={S.viewContainer}>
//           {domainCards?.results?.length > 0 ?
//               (
//               <ul className={S.vehiclesList}>
//                 {domainCards?.results.map((card) => {
//                   return (
//                       <li key={card.id}>
//                         <Card
//                             card={card}
//                             cardId={card.id}
//                             pageId={pageId}
//                             isChecked={card.isChecked}
//                         />
//                       </li>
//                   );
//                 })}
//               </ul>
//           )
//               : (
//               <h2 className={`${S.notification} cardListTitle--color`}>
//                 No results were found for your request...
//               </h2>
//           )}
//         </section>
//         {/*{cardId && (*/}
//         {/*    <aside>*/}
//         {/*      <DetailedCard detailsData={detailsData} />*/}
//         {/*    </aside>*/}
//         {/*)}*/}
//         {/*{Object.keys(favoritesItems)?.length > 0 && <CustomToastify />}*/}
//       </>
//       </Suspense>
//   );
// };
//
// export default CardList;




import React, { FC, useContext } from 'react';
import { ThemeContext } from '../../../contexts/Theme/Theme.context';
import { useAppSelector } from '../../../redux/store';
import { VehicleDetailsDomain, VehiclesResponse } from '../../../shared/types/types';
import { domainCardsSelector, favoritesSelector } from '../../../redux/selectors';
import { FavoritesItems } from '../../../redux/slices/favoritesSlice';
import { ThemeType } from '../../../contexts/Theme/Theme.model';
import S from '../../../styles/CardList.module.css';
import { Card } from '../../../components/Card/Card';
import { DetailedCard } from '../../../components/DetailedCard/DetailedCard';
import { CustomToastify } from '../../../components/CustomToastify/CustomToastify';
import { CardListProps } from '../../../components/CardList/CardList';
import { getCards } from '../../../services/getCards';
import { Suspense } from 'react';
import { Loader } from '../../../components/Loader/Loader';
import Detailed from '../../../components/Detailed/Detailed';
import { Pagination } from '../../../components/Pagination/Pagination';



export type Params = {
  params: { id: string },
  searchParams: { [key: string]: string | undefined },
};

// export async function generateMetadata({ params }: Params) {
//   return { title: `Post: ${params?.id}` };
// }

const CardList = async ({ params, searchParams }: Params) => {
  const pageId = Number(params?.id) || 1;
  const querySearch = searchParams?.search || '';

  const cards = await getCards({search: querySearch, page: pageId})

  console.log('jjjjjjjjjjjjj', typeof cards.count)
  const domainCards = {
    ...cards,
    results:
        cards.results.map(card => {
              return {...card,
                isChecked: false,
                id: card.url.split('/').slice(-2, -1)[0],
              }
            }
        )
  }

  console.log(')))))))))))))))', params, searchParams)
  return (
        <>
        <Suspense key={'cardList'} fallback={<Loader/>}>
          <section className={S.viewContainer}>
            <div>
              <Pagination cardsCount={cards.count}/>
              {domainCards?.results?.length > 0 ?
                  (
                      <ul className={S.vehiclesList}>
                        {domainCards?.results.map((card) => {
                          return (
                              <li key={card.id}>
                                <Card
                                    card={card}
                                    cardId={card.id}
                                    pageId={pageId}
                                    isChecked={card.isChecked}
                                />
                              </li>
                          );
                        })}
                      </ul>
                  )
                  : (
                      <h2 className={`${S.notification} cardListTitle--color`}>
                        No results were found for your request...
                      </h2>
                  )}
            </div>


          </section>

          {searchParams?.card && (
              <aside className={S.detailedContent}>
                <Suspense key={'detailed'} fallback={<Loader/>}>
                  <Detailed params={params} searchParams={searchParams}/>
                </Suspense>
              </aside>
          )}

          {/*{Object.keys(favoritesItems)?.length > 0 && <CustomToastify />}*/}
        </Suspense>
        </>
  );
};

export default CardList;





// 'use client';
// import React from 'react';
// import { useParams, usePathname } from 'next/navigation';
// import Page from './page';
// import Card from './card/[cardId]/page';
// import CardList from '../../../components/CardList/CardList';
// import Detailed from './card/[cardId]/page';
//
// const MainPage = () => {
//   const { id, cardId } = useParams();
//   const pathname = usePathname();
// console.log("")
//   return (
//       <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
//         <CardList />
//         {pathname.includes('card') && <Detailed />}
//       </div>
//   );
// };
//
// export default MainPage;