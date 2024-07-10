// import React, { FC } from 'react';
// import { ViewContainerProps } from '../../types/types';
// import S from './MainPage.module.css';
// import { Vehicle } from '../Vehicle/Vehicle';
// import { useOutletContext } from 'react-router-dom';
// import { Outlet } from 'react-router-dom';
//
// export const MainPage: FC<ViewContainerProps> = () => {
//   const { vehicles } = useOutletContext();
//   return (
//     <section className={S.viewContainer}>
//       {vehicles.length > 0 ? (
//         <ul className={S.vehiclesList}>
//           {vehicles.map((vehicle, idx) => (
//             <li key={idx}>
//               <Vehicle vehicle={vehicle} />
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <h2 className={S.notification}>
//           No results were found for your request...
//         </h2>
//       )}
//     </section>
//   );
// };

import React, { FC } from 'react';
import { ViewContainerProps } from '../../types/types';
import S from './MainPage.module.css';
import { Vehicle } from '../Vehicle/Vehicle';
import { Outlet, useOutletContext } from 'react-router-dom';

export const MainPage: FC<ViewContainerProps> = () => {
  const { vehicles } = useOutletContext();
  return (
    <>
      <section className={S.viewContainer}>
        {vehicles.length > 0 ? (
          <ul className={S.vehiclesList}>
            {vehicles.map((vehicle, idx) => {
              const vehicleId = vehicle.url.split('/').slice(-2, -1)[0];
              return (
                <li key={idx}>
                  <Vehicle vehicle={vehicle} id={vehicleId} />
                </li>
              );
            })}
          </ul>
        ) : (
          <h2 className={S.notification}>
            No results were found for your request...
          </h2>
        )}
      </section>
      <aside>
        <Outlet />
      </aside>
    </>
  );
};
