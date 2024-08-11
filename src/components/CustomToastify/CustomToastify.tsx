'use client';
import React, { useContext } from 'react';
import S from '../../styles/CustomToastify.module.css';
import { useAppDispatch, useAppSelector } from '../../lib/store';
import { Button } from '../Button';
import { favoritesActions } from '../../lib/features/favorites/favoritesSlice';
import { ThemeContext } from '../../contexts/Theme/Theme.context';
import { isToastifyOpenSelector } from '../../lib/features/app/selectors/appSelectors';
import { appActions } from '../../lib/features/app/appSlice';
import { DownloadCSV } from '../DownloadCSV/DownloadCSV';
import { refineFavoritesItemsStructureToCSV } from '../../shared/uitils/refineFavoritesItemsStructureToCSV';
import { favoriteCardsSelector } from '../../lib/features/favorites/selectors/favoritesSelectors';
import { VehicleDetailsDomain } from '../../shared/types/types';

export const CustomToastify = () => {
  const isToastifyOpen = useAppSelector<boolean>(isToastifyOpenSelector);
  const favoriteCards = useAppSelector<VehicleDetailsDomain[]>(
    favoriteCardsSelector,
  );
  const { theme } = useContext(ThemeContext);
  const dispatch = useAppDispatch();

  const onClickClearFavorites = () => {
    dispatch(favoritesActions.clearFavorites());
  };

  const onClickToggleIsOpenFavorites = () => {
    dispatch(appActions.toggleIsToastifyOpen());
  };

  const alertText =
    favoriteCards.length > 1 ? ' items selected' : ' item selected';
  const toggleButtonStyles = isToastifyOpen
    ? { color: theme['--error'] }
    : { color: theme['--alert'] };

  return (
    <>
      {favoriteCards.length > 0 && (
        <div className={S.toastify}>
          <div className={S.toastifyHeader}>
            <h2>Favorites</h2>
            <p>
              <span>{favoriteCards.length}</span>
              {alertText}
            </p>
            <Button
              style={toggleButtonStyles}
              onClickCallBack={onClickToggleIsOpenFavorites}
            >
              {isToastifyOpen ? 'Hide' : 'Show'}
            </Button>
          </div>

          {isToastifyOpen && (
            <div className={S.toastifyItems}>
              <ol className={S.toastifyList}>
                {favoriteCards.map((favCard) => (
                  <li key={favCard.id}>{favCard.name}</li>
                ))}
              </ol>
              <div className={S.toastifyControls}>
                <Button
                  onClickCallBack={onClickClearFavorites}
                  color={'delete'}
                >
                  Unselect all
                </Button>
                <DownloadCSV
                  data={refineFavoritesItemsStructureToCSV(favoriteCards)}
                  fileName={'vehicles'}
                  color={'alert'}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
