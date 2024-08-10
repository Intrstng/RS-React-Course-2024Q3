// // 'use client'
// // import React, { FC, FormEvent, useEffect, useRef, useState } from 'react';
// // import { useRouter, usePathname } from 'next/navigation'
// // import S from '../../styles/DetailedCard.module.css';
// // import { DetailedVehicle, VehicleDetails } from '../../shared/types/types';
// // import defaultImage from '../../assets/image_default.jpg';
// // import { useAppSelector } from '../../redux/store';
// // import { currentPageSelector, searchSelector } from '../../redux/selectors';
// // import Image from 'next/image';
// //
// // export type DetailedCardProps = {
// //   detailsData?: DetailedVehicle | undefined;
// //   params: {
// //     id: string;
// //     cardId: string;
// //   };
// // };
// //
// // export const DetailedCard: FC<DetailedCardProps> = ({ detailsData, params, searchParams }) => {
// //   const [imgSrc, setImgSrc] = useState<string | null>(null);
// //   const detailsRef = useRef<HTMLDivElement | null>(null);
// //   const router = useRouter();
// //   // const { cardId } = router.query;
// //   // const pageId = useAppSelector(currentPageSelector);
// //   // const searchValue = useAppSelector(searchSelector);
// // console.log('11111111111111', params, searchParams)
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       await setImgSrc(
// //         `https://starwars-visualguide.com/assets/img/vehicles/${params.cardId}.jpg`,
// //       );
// //     };
// //     fetchData();
// //   }, [params.cardId]);
// //
// //   useEffect(() => {
// //     const handleClickOutside = (e: MouseEvent) => {
// //       if (
// //         detailsRef.current &&
// //         !detailsRef.current!.contains(e.target as Node)
// //       ) {
// //         router.push(`/page/${params.id}`);
// //         // router.push(`/page/${params}?search=${searchValue}`);
// //       }
// //     };
// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => {
// //       document.removeEventListener('mousedown', handleClickOutside);
// //     };
// //   }, [params.id]);
// //
// //   const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     router.push(`/page/${params.id}`);
// //     // router.push(`/page/${params.id}?search=${searchValue}`);
// //   };
// //
// //   const handleImageError = () => {
// //     setImgSrc(defaultImage.src);
// //   };
// //
// //   return (
// //     <div className={S.details} ref={detailsRef}>
// //       <div className={S.detailsCard}>
// //         {imgSrc && (
// //           <Image
// //             src={imgSrc}
// //             alt="card"
// //             className={S.card}
// //             onError={handleImageError}
// //             width={230}
// //             height={155}
// //           />
// //         )}
// //         {detailsData ? (
// //           <>
// //             <p>
// //               Model: <span>{detailsData.model}</span>
// //             </p>
// //             <p>
// //               Manufacturer: <span>{detailsData.manufacturer}</span>
// //             </p>
// //             <p>
// //               Length: <span>{detailsData.length}</span>
// //             </p>
// //             <p>
// //               Crew: <span>{detailsData.crew}</span>
// //             </p>
// //             <p>
// //               Passengers: <span>{detailsData.passengers}</span>
// //             </p>
// //             <p>
// //               Consumables: <span>{detailsData.consumables}</span>
// //             </p>
// //           </>
// //         ) : (
// //           <p className={S.error}>Error loading detailed cards</p>
// //         )}
// //         <form onSubmit={onSubmitHandler}>
// //           <button type="submit">Close</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };
//
// 'use client'
// import React, { FC, FormEvent } from 'react';
// import S from '../../styles/DetailedCard.module.css';
// import { DetailedVehicle, VehicleDetails } from '../../shared/types/types';
// import defaultImage from '../../assets/image_default.jpg';
// import Image from 'next/image';
//
// export type DetailedCardProps = {
//   detailsData?: DetailedVehicle | undefined;
//   params: {
//     id: string;
//     cardId: string;
//   };
//   searchParams: { [key: string]: string | undefined };
// };
//
// export const DetailedCard: FC<DetailedCardProps> = ({ detailsData, params, searchParams }) => {
//   // const [imgSrc, setImgSrc] = useState<string | null>(null);
//   // const detailsRef = useRef<HTMLDivElement | null>(null);
//
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     await setImgSrc(
//   //         `https://starwars-visualguide.com/assets/img/vehicles/${params.cardId}.jpg`,
//   //     );
//   //   };
//   //   fetchData();
//   // }, [params.cardId]);
//
//   // const handleImageError = () => {
//   //   setImgSrc(defaultImage.src);
//   // };
//
//   return (
//       // <div className={S.details} ref={detailsRef}>
//         <div className={S.details} >
//         <div className={S.detailsCard}>
//           {/*{imgSrc && (*/}
//           {/*    <Image*/}
//           {/*        src={imgSrc}*/}
//           {/*        alt="card"*/}
//           {/*        className={S.card}*/}
//           {/*        onError={handleImageError}*/}
//           {/*        width={230}*/}
//           {/*        height={155}*/}
//           {/*    />*/}
//           {/*)}*/}
//           {detailsData ? (
//               <>
//                 <p>
//                   Model: <span>{detailsData.model}</span>
//                 </p>
//                 <p>
//                   Manufacturer: <span>{detailsData.manufacturer}</span>
//                 </p>
//                 <p>
//                   Length: <span>{detailsData.length}</span>
//                 </p>
//                 <p>
//                   Crew: <span>{detailsData.crew}</span>
//                 </p>
//                 <p>
//                   Passengers: <span>{detailsData.passengers}</span>
//                 </p>
//                 <p>
//                   Consumables: <span>{detailsData.consumables}</span>
//                 </p>
//               </>
//           ) : (
//               <p className={S.error}>Error loading detailed cards</p>
//           )}
//           <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
//             e.preventDefault();
//             // Handle form submission, e.g., redirect to another page
//           }}>
//             <button type="submit">Close</button>
//           </form>
//         </div>
//       </div>
//   );
// };

// 'use client'
// import React, { FC, FormEvent, useEffect, useRef, useState } from 'react';
// import { useRouter, usePathname } from 'next/navigation'
// import S from '../../styles/DetailedCard.module.css';
// import { DetailedVehicle, VehicleDetails } from '../../shared/types/types';
// import defaultImage from '../../assets/image_default.jpg';
// import { useAppSelector } from '../../redux/store';
// import { currentPageSelector, searchSelector } from '../../redux/selectors';
// import Image from 'next/image';
//
// export type DetailedCardProps = {
//   detailsData?: DetailedVehicle | undefined;
//   params: {
//     id: string;
//     cardId: string;
//   };
// };
//
// export const DetailedCard: FC<DetailedCardProps> = ({ detailsData, params, searchParams }) => {
//   const [imgSrc, setImgSrc] = useState<string | null>(null);
//   const detailsRef = useRef<HTMLDivElement | null>(null);
//   const router = useRouter();
//   // const { cardId } = router.query;
//   // const pageId = useAppSelector(currentPageSelector);
//   // const searchValue = useAppSelector(searchSelector);
// console.log('11111111111111', params, searchParams)
//   useEffect(() => {
//     const fetchData = async () => {
//       await setImgSrc(
//         `https://starwars-visualguide.com/assets/img/vehicles/${params.cardId}.jpg`,
//       );
//     };
//     fetchData();
//   }, [params.cardId]);
//
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (
//         detailsRef.current &&
//         !detailsRef.current!.contains(e.target as Node)
//       ) {
//         router.push(`/page/${params.id}`);
//         // router.push(`/page/${params}?search=${searchValue}`);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [params.id]);
//
//   const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     router.push(`/page/${params.id}`);
//     // router.push(`/page/${params.id}?search=${searchValue}`);
//   };
//
//   const handleImageError = () => {
//     setImgSrc(defaultImage.src);
//   };
//
//   return (
//     <div className={S.details} ref={detailsRef}>
//       <div className={S.detailsCard}>
//         {imgSrc && (
//           <Image
//             src={imgSrc}
//             alt="card"
//             className={S.card}
//             onError={handleImageError}
//             width={230}
//             height={155}
//           />
//         )}
//         {detailsData ? (
//           <>
//             <p>
//               Model: <span>{detailsData.model}</span>
//             </p>
//             <p>
//               Manufacturer: <span>{detailsData.manufacturer}</span>
//             </p>
//             <p>
//               Length: <span>{detailsData.length}</span>
//             </p>
//             <p>
//               Crew: <span>{detailsData.crew}</span>
//             </p>
//             <p>
//               Passengers: <span>{detailsData.passengers}</span>
//             </p>
//             <p>
//               Consumables: <span>{detailsData.consumables}</span>
//             </p>
//           </>
//         ) : (
//           <p className={S.error}>Error loading detailed cards</p>
//         )}
//         <form onSubmit={onSubmitHandler}>
//           <button type="submit">Close</button>
//         </form>
//       </div>
//     </div>
//   );
// };

'use client'
import React, { FC, FormEvent, useEffect, useRef, useState } from 'react';
import S from '../../styles/DetailedCard.module.css';
import { DetailedVehicle, VehicleDetails } from '../../shared/types/types';
import defaultImage from '../../assets/image_default.jpg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Loader } from '../Loader/Loader';

export type DetailedCardProps = {
  detailsData?: DetailedVehicle | undefined;
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | undefined };
};

export const DetailedCard: FC<DetailedCardProps> = ({ detailsData, params, searchParams }) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter()


  useEffect(() => {
    setImgSrc(
          `https://starwars-visualguide.com/assets/img/vehicles/${searchParams?.card}.jpg`,
      );
  }, [searchParams?.card]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
          detailsRef.current &&
          !detailsRef.current!.contains(e.target as Node)
      ) {
        searchParams?.search ? router.push(`/page/${params.id}?search=${searchParams?.search}`)
            : router.push(`/page/${params.id}`);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [params.id]);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // router.push(`/page/${params.id}?search=${searchValue}`);
    searchParams?.search ? router.push(`/page/${params.id}?search=${searchParams?.search}`)
        : router.push(`/page/${params.id}`);
  };

  const handleImageError = () => {
    setImgSrc(defaultImage.src);
  };

  return (
      <div className={S.details} ref={detailsRef}>
        <div className={S.detailsCard}>
          {imgSrc && (
              <Image
                  src={imgSrc}
                  alt="card"
                  className={S.card}
                  onError={handleImageError}
                  width={230}
                  height={155}
              />
          )}
          {detailsData ? (
              <>
                <p>
                  Model: <span>{detailsData.model}</span>
                </p>
                <p>
                  Manufacturer: <span>{detailsData.manufacturer}</span>
                </p>
                <p>
                  Length: <span>{detailsData.length}</span>
                </p>
                <p>
                  Crew: <span>{detailsData.crew}</span>
                </p>
                <p>
                  Passengers: <span>{detailsData.passengers}</span>
                </p>
                <p>
                  Consumables: <span>{detailsData.consumables}</span>
                </p>
              </>
          ) : (
              <p className={S.error}>Error loading detailed cards</p>
          )}
          <form onSubmit={onSubmitHandler}>
            <button type="submit">Close</button>
          </form>
        </div>
      </div>
  );
};