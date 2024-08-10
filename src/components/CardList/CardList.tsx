// import React, { FC, useContext } from 'react';
// import S from '../../styles/CardList.module.css';
// import { Card } from '../Card/Card';
// import {
//   VehicleDetails,
//   VehicleDetailsDomain,
//   VehiclesResponse,
// } from '../../shared/types/types';
// import { ThemeType } from '../../contexts/Theme/Theme.model';
// import { ThemeContext } from '../../contexts/Theme/Theme.context';
// import { useAppSelector } from '../../redux/store';
// import { domainCardsSelector } from '../../redux/selectors/domainCardsSelectors';
// import { CustomToastify } from '../CustomToastify/CustomToastify';
// import { favoritesSelector } from '../../redux/selectors/favoritesSelectors';
// import { FavoritesItems } from '../../redux/slices/favoritesSlice';
// import { useRouter } from 'next/router';
// import { DetailedCard } from '../DetailedCard/DetailedCard';
//
// export type CardListProps = {
//   detailsData?: VehicleDetails | undefined;
// };
//
// const CardList: FC<CardListProps> = ({ detailsData }) => {
//   const { themeType, theme } = useContext(ThemeContext);
//   const domainCards =
//     useAppSelector<VehiclesResponse<VehicleDetailsDomain>>(domainCardsSelector);
//   const favoritesItems = useAppSelector<FavoritesItems>(favoritesSelector);
//
//   const router = useRouter();
//   const { cardId } = router.query;
//
//   const textStyle =
//     themeType === ThemeType.LIGHT
//       ? { color: theme['--search'] }
//       : { color: theme['--white'] };
//
//   return (
//     <>
//       <section className={S.viewContainer}>
//         {domainCards?.results?.length > 0 ? (
//           <ul className={S.vehiclesList}>
//             {domainCards?.results.map((card) => {
//               return (
//                 <li key={card.id}>
//                   <Card
//                     card={card}
//                     cardId={card.id}
//                     isChecked={card.isChecked}
//                   />
//                 </li>
//               );
//             })}
//           </ul>
//         ) : (
//           <h2 style={textStyle} className={S.notification}>
//             No results were found for your request...
//           </h2>
//         )}
//       </section>
//       {cardId && (
//         <aside>
//           <DetailedCard detailsData={detailsData} />
//         </aside>
//       )}
//       {Object.keys(favoritesItems)?.length > 0 && <CustomToastify />}
//     </>
//   );
// };
//
// export default CardList;



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


type Params = {
  params?: { id: string },
  searchParams?: { [key: string]: string | undefined },
};

import { getCards } from '../../services/getCards';
import React, { Suspense } from 'react';
import { Loader } from '../Loader/Loader';
import S from '../../styles/CardList.module.css';
import { Card } from '../Card/Card';

const CardList = async ({ params, searchParams }: Params) => {
  const pageId = Number(params?.id) || 1;
  const querySearch = searchParams?.search || '';

  const cards = await getCards({search: querySearch, page: pageId})
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
      <Suspense fallback={<Loader/>}>
        <>
          <section className={S.viewContainer}>
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
          </section>
          {/*{cardId && (*/}
          {/*    <aside>*/}
          {/*      <DetailedCard detailsData={detailsData} />*/}
          {/*    </aside>*/}
          {/*)}*/}
          {/*{Object.keys(favoritesItems)?.length > 0 && <CustomToastify />}*/}
        </>
      </Suspense>
  );
};

export default CardList;