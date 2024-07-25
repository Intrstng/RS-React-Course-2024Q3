import React, { FC } from 'react';
import { DownloadCSVProps } from '../../shared/types/types';

export const DownloadCSV: FC<DownloadCSVProps> = ({
  data,
  fileName = 'download',
  color,
}) => {
  const selectedCardIdArray = Object.keys(data);
  const selectedCards = selectedCardIdArray.map((cardId) => data[cardId]);
  const csvData = [];
  let csvResult = '';
  const titleNames = Object.keys(selectedCards[0]);
  const fullFileName = `${selectedCards.length}_${fileName}.csv`;

  csvData.push(titleNames);
  selectedCards.forEach((item) => {
    csvData.push(Object.values(item));
  });

  csvData.forEach((line) => {
    csvResult += line.join(',') + '\n';
  });

  const blob = new Blob([csvResult], { type: 'text/csv;charset=utf-8,' });
  const objUrl = URL.createObjectURL(blob);

  return (
    <a className={`link link--${color}`} href={objUrl} download={fullFileName}>
      Download
    </a>
  );
};
