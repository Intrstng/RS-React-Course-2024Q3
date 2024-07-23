import React, { ChangeEvent } from 'react';
import S from './SuperCheckBox.module.css';

export const SuperCheckBox = () => {
  const onChangeInputStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValueFlag = e.currentTarget.checked;
    const statusValue: TaskStatuses = newStatusValueFlag
      ? TaskStatuses.Completed
      : TaskStatuses.New;
    // dispatch(updateTaskTC(todolist.id, task.id, { status: statusValue }));
    console.log(statusValue);
  };

  return (
    <div className={S.checkbox}>
      {/*<label htmlFor={task.id} className={S.formControl}>*/}
      {/*  <input type="checkbox"*/}
      {/*         name="checkbox"*/}
      {/*         id={task.id}*/}
      {/*         checked={!!task.status}*/}
      {/*         onChange={onChangeInputStatusHandler}*/}
      {/*         disabled={isLoading}*/}
      {/*  />*/}
      {/*  Save to favorites*/}
      {/*</label>*/}

      <label className={S.formControl}>
        <input
          type="checkbox"
          name="checkbox"
          onChange={onChangeInputStatusHandler}
        />
        Save to favorites
      </label>
    </div>
  );
};

export type SuperCheckBoxProps = {
  cardId: string;
  cardStatus: TaskStatuses;
};

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}
