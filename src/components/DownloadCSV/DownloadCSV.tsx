import React, { FC } from 'react';
import { DownloadCSVProps } from '../../shared/types/types';

export const DownloadCSV: FC<DownloadCSVProps> = ({
  data,
  fileName = 'download',
  color,
}) => {
  const csvData = [];
  let csvResult: string = '';
  const titleNames = Object.keys(data[0]);
  const fullFileName = `${data.length}_${fileName}.csv`;

  csvData.push(titleNames);
  data.forEach((item) => {
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
