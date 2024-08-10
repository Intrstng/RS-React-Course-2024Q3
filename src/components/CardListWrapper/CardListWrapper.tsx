'use client'
import React from 'react';

import CardList from '../../app/page/[id]/page';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { getCardDetails } from '../../services/getCards';
import { DetailedCard } from '../DetailedCard/DetailedCard';



const CardListWrapper = async ({ children, params, searchParams}) => {

  // const params = useParams<{ id: string; cardId: string }>()
  // const querySearchParams = useSearchParams()
  // const querySearchValue = querySearchParams.get('search')
  // const searchParams = { search: querySearchValue}



  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { params, searchParams });
    }
    return child;
  });

  return (
      <div>
        {childrenWithProps}
      </div>
  );
};

export default CardListWrapper

