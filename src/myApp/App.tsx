// 'use client'
//
// import React, { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '../redux/store';
// import {
//   currentPageSelector,
//   searchSelector,
//   statusSelector,
// } from '../redux/selectors/appSelectors';
// import { appActions } from '../redux/slices/appSlice';
// import { useRouter } from 'next/router';
// import { Loader } from '../components/Loader/Loader';
// import CardList from '../components/CardList/CardList';
//
// const App = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const pageFromParams = parseInt(id ?? '1', 10);
//   const currentPage = useAppSelector<number>(currentPageSelector);
//   const isLoading = useAppSelector<boolean>(statusSelector);
//   const dispatch = useAppDispatch();
//   const searchValue = useAppSelector<string>(searchSelector);
//
//   useEffect(() => {
//     dispatch(appActions.setAppCurrentPage({ currentPage: pageFromParams }));
//
//     if (router.pathname === '/') {
//       router.replace(
//         {
//           pathname: `/page/${currentPage}`,
//           query: { search: searchValue },
//         },
//         undefined,
//         { shallow: true },
//       );
//     }
//   }, [router, pageFromParams, searchValue]);
//
//   return (
//     <div className={'content'}>{isLoading ? <Loader /> : <CardList />}</div>
//   );
// };
//
// export default App;


'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react';


export default function App() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/') {
      router.replace(`/page/1`);
    }
  }, [router])

  return (
      <h1>Welcome to RS School Next.js App Routing</h1>
  )
}

