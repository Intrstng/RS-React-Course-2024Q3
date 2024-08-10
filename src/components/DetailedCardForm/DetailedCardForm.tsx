'use client'
import React, { FC, FormEvent } from 'react';

type DetailedCardFormProps = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export const DetailedCardForm: FC<DetailedCardFormProps> = ({ onSubmit }) => {
  return (
      <form onSubmit={onSubmit}>
        <button type="submit">Close</button>
      </form>
  );
};