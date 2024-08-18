import { FormEvent, useRef, useState } from 'react';
import S from './UncontrolledForm.module.css';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { countrySelector } from '../../../redux/selectors/formSelectors';
import { UncontrolledSearchBar } from '../UncontrolledSearchBar/UncontrolledSearchBar';
import { userSchema } from '../../../validations/userValidation';
import { ValidationError } from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { formActions } from '../../../redux/slices/formSlice';
import { PasswordStrengthMeter } from '../PasswordStrengthMeter/PasswordStrengthMeter';
import { PATH } from '../../../shared/consts';
import { CustomError } from '../../CustomError/CustomError';
import { FormType, FormValueError } from '../../../shared/consts/types';

export const UncontrolledForm = () => {
  const countries = useAppSelector<string[]>(countrySelector);
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<FormValueError>({});
  const [, setPassword] = useState<string | undefined>('');
  const formRef = useRef<HTMLFormElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const agreementRef = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    const currentErrors: FormValueError = {};

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const valuesForm = Object.fromEntries(formData.entries());
      const agreement = agreementRef.current?.checked as boolean;
      const image = imageRef.current?.files;
      const formDataUpdated = { ...valuesForm, agreement, image };

      await userSchema
        .validate(formDataUpdated, {
          abortEarly: false
        })
        .catch((error: ValidationError) => {
          error.inner.forEach((err) => {
            const name = err.path as string;
            if (!currentErrors[name]) {
              currentErrors[name] = err;
            }
          });
          setErrors(currentErrors);
        });

      if (Object.keys(currentErrors).length === 0 && image) {
        reader.readAsDataURL(image[0]);
        reader.onloadend = function () {
          const base64Image = reader.result as string;
          if (base64Image) {
            const formToPrint = {
              id: `${Date.now()}`,
              type: 'uncontrolled' as FormType,
              data: { ...formDataUpdated, image: base64Image }
            };
            dispatch(formActions.addFilledForm({ form: formToPrint }));
          }
          dispatch(formActions.toggleIsHighlighted({ flag: true }));
          setTimeout(
            () => dispatch(formActions.toggleIsHighlighted({ flag: false })),
            2500
          );
          navigate('/');
        };
      }
      console.log(currentErrors);
    }
  };

  return (
    <div className={S.formContainer}>
      <h2 className={S.formTitle}>Registration Form</h2>
      <form ref={formRef} onSubmit={formSubmitHandler} noValidate>
        <div className={S.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className={S.formInput}
            autoComplete="name"
          />
          {errors?.name && <CustomError error={errors.name} />}
        </div>
        <div className={S.formGroup}>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            className={S.formInput}
            autoComplete="age"
          />
          {errors?.age && <CustomError error={errors.age} />}
        </div>
        <div className={S.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className={S.formInput}
            autoComplete="email"
          />
          {errors?.email && <CustomError error={errors.email} />}
        </div>
        <div className={S.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            name="password"
            className={S.formInput}
            autoComplete="current-password"
            onChange={() => setPassword(passwordRef.current?.value)}
          />
          {errors?.password && <CustomError error={errors.password} />}
        </div>
        <PasswordStrengthMeter ref={passwordRef} />
        <div className={S.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={S.formInput}
            autoComplete="confirmPassword"
          />
          {errors?.confirmPassword && (
            <CustomError error={errors.confirmPassword} />
          )}
        </div>
        <div className={S.formGroup}>
          <label>Gender</label>
          <div className={S.genderOptions}>
            <label>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                className={S.formRadio}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                className={S.formRadio}
              />
              Female
            </label>
            {errors?.gender && <CustomError error={errors.gender} />}
          </div>
        </div>
        <div className={S.formGroup}>
          <label className={S.formCheckbox}>
            <input
              type="checkbox"
              id="agreement"
              name="agreement"
              ref={agreementRef}
              className={S.formCheckboxInput}
            />
            I accept the Terms and Conditions
          </label>
          {errors?.agreement && <CustomError error={errors.agreement} />}
        </div>
        <div className={S.formGroup}>
          <label htmlFor="image">Upload Picture</label>
          <input
            type="file"
            id="image"
            name="image"
            ref={imageRef}
            className={S.uploadFile}
          />
          {errors?.image && <CustomError error={errors.image} />}
        </div>
        <UncontrolledSearchBar error={errors?.country} countries={countries} />
        <button type="submit" className={S.submitButton}>
          Submit
        </button>
      </form>
      <NavLink className={'home'} to={PATH.PAGE_ROOT}>
        Home
      </NavLink>
    </div>
  );
};
