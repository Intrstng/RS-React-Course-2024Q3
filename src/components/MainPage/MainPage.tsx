import { filledFormsSelector } from '../../redux/selectors/formSelectors';
import { useAppSelector } from '../../shared/hooks/hooks';
import { Card } from '../Card/Card';
import { Form } from '../../shared/consts/types';
import S from './MainPage.module.css';

export const MainPage = () => {
  const filledForms = useAppSelector<Form[]>(filledFormsSelector);

  return (
    <div className={S.container}>
      {filledForms.length > 0 ? (
        filledForms.map((form, index) => (
          <Card key={form.id} card={form} count={index} />
        ))
      ) : (
        <h2>Please fill out the form using the links</h2>
      )}
    </div>
  );
};
