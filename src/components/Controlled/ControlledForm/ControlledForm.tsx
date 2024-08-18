import { ChangeEvent, useState } from 'react';
import S from './ControlledForm.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { PATH } from '../../../shared/consts';
import { CustomError } from '../../CustomError/CustomError';
import { Controller, useForm } from 'react-hook-form';
import { FormType, HookFormData } from '../../../shared/consts/types';
import { formActions } from '../../../redux/slices/formSlice';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { countrySelector } from '../../../redux/selectors/formSelectors';
import { ControlledSearchBar } from '../ControlledSearchBar/ControlledSearchBar';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../../../validations/userValidation';
import { ControlledPasswordStrengthMeter } from '../ControlledPasswordStrength/ControlledPasswordStrengthMeter';

export const ControlledForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<HookFormData>({
    mode: 'all',
    resolver: yupResolver(userSchema)
  });

  const countries = useAppSelector<string[]>(countrySelector);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>('');

  const onSubmit = (data: HookFormData) => {
    const reader = new FileReader();
    reader.readAsDataURL(data.image[0]);

    reader.onloadend = function () {
      const base64Image = reader.result as string;
      if (base64Image) {
        const formToPrint = {
          id: `${Date.now()}`,
          type: 'controlled' as FormType,
          data: { ...data, image: base64Image }
        };
        dispatch(formActions.addFilledForm({ form: formToPrint }));
      }
      dispatch(formActions.toggleIsHighlighted({ flag: true }));
      setTimeout(
        () => dispatch(formActions.toggleIsHighlighted({ flag: false })),
        2500
      );
      reset();
      navigate('/');
    };
  };

  return (
    <div className={S.formContainer}>
      <h2 className={S.formTitle}>Registration Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={S.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            {...register('name')}
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
            {...register('age')}
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
            {...register('email')}
            className={S.formInput}
            autoComplete="email"
          />
          {errors?.email && <CustomError error={errors.email} />}
        </div>
        <div className={S.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register('password')}
            className={S.formInput}
            autoComplete="current-password"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          {errors?.password && <CustomError error={errors.password} />}
        </div>
        <ControlledPasswordStrengthMeter password={password} />
        <div className={S.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword')}
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
                {...register('gender')}
                value="male"
                className={S.formRadio}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                id="female"
                {...register('gender')}
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
              {...register('agreement')}
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
            {...register('image')}
            className={S.uploadFile}
          />
          {errors?.image && <CustomError error={errors.image} />}
        </div>
        <Controller
          name="country"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <ControlledSearchBar
              countries={countries}
              error={errors?.country}
              {...field}
            />
          )}
        />
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
