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

  // console.log(')))))))))))))))', params, searchParams)
  console.log(')))))))))))))))', domainCards?.results)
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

          <CustomToastify />
        </Suspense>
        </>
  );
};

export default CardList;

