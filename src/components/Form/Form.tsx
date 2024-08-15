import React from 'react';
import S from './Form.module.css';

export const Form = () => {
  return (
    <div className={S.formContainer}>
      <h2 className={S.formTitle}>Registration Form</h2>
      <form>
        <div className={S.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className={S.formInput}
            pattern="[A-Z][a-zA-Z]*"
            required
          />
        </div>
        <div className={S.formGroup}>
          <label htmlFor="age">Age</label>
          <input type="number" id="age" className={S.formInput} min="0" />
        </div>
        <div className={S.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" className={S.formInput} required />
        </div>
        <div className={S.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className={S.formInput}
            pattern="(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{8,}"
            title="Must contain at least one number, one uppercase letter, one lowercase letter, and one special character."
            required
          />
          <p>Password strength</p>
        </div>
        <div className={S.formGroup}>
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            type="password"
            id="confirm_password"
            className={S.formInput}
            required
          />
        </div>
        <div className={S.formGroup}>
          <label>Gender</label>
          <div className={S.genderOptions}>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                className={S.formRadio}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                className={S.formRadio}
              />
              Female
            </label>
          </div>
        </div>
        <div className={S.formGroup}>
          <label className={S.formCheckbox}>
            <input
              type="checkbox"
              id="terms"
              className={S.formCheckboxInput}
              required
            />
            I accept the Terms and Conditions
          </label>
        </div>
        <div className={S.formGroup}>
          <label htmlFor="uploadPicture">Upload Picture</label>
          <label className={S.fileUpload}>
            Choose File
            <input
              type="file"
              id="uploadPicture"
              className={S.hidden}
              accept=".png, .jpeg"
            />
          </label>
        </div>
        <div className={S.formGroup}>
          <label htmlFor="country">Country</label>
          <select id="country" className={S.formSelect}>
            <option value="" disabled selected>
              Select country
            </option>
            <option value="value1">Значение 1</option>
            <option value="value2">Значение 2</option>
          </select>
        </div>
        <button type="submit" className={S.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};
