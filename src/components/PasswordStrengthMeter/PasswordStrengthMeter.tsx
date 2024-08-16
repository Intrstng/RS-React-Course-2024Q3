import React, { forwardRef, useEffect, useRef } from 'react';
import S from './PasswordStrengthMeter.module.css';

export const PasswordStrengthMeter = forwardRef((props, ref) => {
  const passStrengthMeterRef = useRef(null);
  const password = ref?.current && ref.current.value

  useEffect(() => {
    const passStrengthMeter = passStrengthMeterRef.current as HTMLElement;

    const getPassStrengthValue = (pass: string): number => {
      let passStrength: number = 0;
      pass?.length > 0 && /(?=.*[a-z])/.test(pass) && passStrength++;
      /(?=.*[A-Z])/u.test(pass) && passStrength++;
      /(?=.*\d)/u.test(pass) && passStrength++;
      /(?=.*[@$!%*?&])/.test(pass) && passStrength++;
      return passStrength
    }

    const selectStrengthMeterColor = (passStrength: number): string => {
      let color: string;
      switch (passStrength) {
        case 1:
          return color = '#ff0000';
        case 2:
          return color = '#ff7f47';
        case 3:
          return color = '#fff200';
        case 4:
          return color = '#00ff03';
        default:
          return color = '#909090';
      }
    }

    const passStrength = getPassStrengthValue(password)
    const color = selectStrengthMeterColor(passStrength)
    passStrengthMeter.style.width = `${(passStrength / 4) * 100}%`;
    passStrengthMeter.style.backgroundColor = color;
  }, [password])

  return (
      <div className={S.powerMeter}>
        <div className={S.powerScale} ref={passStrengthMeterRef}></div>
      </div>
  );
});
