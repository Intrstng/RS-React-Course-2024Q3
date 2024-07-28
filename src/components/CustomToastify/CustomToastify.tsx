import React, { useContext } from 'react';
import S from './CustomToastify.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { favoritesSelector } from '../../redux/selectors';
import { Button } from '../Button';
import {
  favoritesActions,
  FavoritesItems,
} from '../../redux/slices/favoritesSlice';
import { cardsActions } from '../../redux/slices/cardsSlice';
import { ThemeContext } from '../../contexts/Theme/Theme.context';
import { isToastifyOpenSelector } from '../../redux/selectors/appSelectors';
import { appActions } from '../../redux/slices/appSlice';
import { DownloadCSV } from '../DownloadCSV/DownloadCSV';
import { refineFavoritesItemsStructureToCSV } from '../../shared/uitils/refineFavoritesItemsStructureToCSV';

export const CustomToastify = () => {
  const isToastifyOpen = useAppSelector<boolean>(isToastifyOpenSelector);
  const favoritesItems = useAppSelector<FavoritesItems>(favoritesSelector);
  const { theme } = useContext(ThemeContext);
  const dispatch = useAppDispatch();

  const onClickClearFavorites = () => {
    dispatch(favoritesActions.clearFavorites());
    dispatch(cardsActions.clearAllFromFavorites());
  };

  const onClickToggleIsOpenFavorites = () => {
    dispatch(appActions.toggleIsToastifyOpen());
  };

  const alertText =
    Object.keys(favoritesItems)?.length > 1
      ? ' items selected'
      : ' item selected';
  const toggleButtonStyles = isToastifyOpen
    ? { color: theme['--error'] }
    : { color: theme['--alert'] };

  return (
    <div className={S.toastify}>
      <div className={S.toastifyHeader}>
        <h2>Favorites</h2>
        <p>
          <span>{Object.keys(favoritesItems).length}</span>
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
            {Object.keys(favoritesItems).map((cardId) => (
              <li key={cardId}>{favoritesItems[cardId].name}</li>
            ))}
          </ol>
          <div className={S.toastifyControls}>
            <Button onClickCallBack={onClickClearFavorites} color={'delete'}>
              Unselect all
            </Button>
            <DownloadCSV
              data={refineFavoritesItemsStructureToCSV(favoritesItems)}
              fileName={'vehicles'}
              color={'alert'}
            />
          </div>
        </div>
      )}
    </div>
  );
};
