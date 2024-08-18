import { FC, useEffect, useRef } from 'react';
import S from './ControlledPasswordStrengthMeter.module.css';

type ControlledPasswordStrengthMeterProps = {
  password: string;
};

export const ControlledPasswordStrengthMeter: FC<
  ControlledPasswordStrengthMeterProps
> = ({ password }) => {
  const passStrengthMeterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const passStrengthMeter = passStrengthMeterRef.current as HTMLElement;
    const getPassStrengthValue = (pass: string): number => {
      let passStrength: number = 0;
      if (pass?.length > 0 && /(?=.*[a-z])/.test(pass)) {
        passStrength++;
      }
      if (/(?=.*[A-Z])/u.test(pass)) {
        passStrength++;
      }
      if (/(?=.*\d)/u.test(pass)) {
        passStrength++;
      }
      if (/(?=.*[@$!%*?&])/.test(pass)) {
        passStrength++;
      }
      return passStrength;
    };

    const selectStrengthMeterColor = (passStrength: number): string => {
      switch (passStrength) {
        case 1:
          return '#ff0000';
        case 2:
          return '#ff7f47';
        case 3:
          return '#fff200';
        case 4:
          return '#00ff03';
        default:
          return '#909090';
      }
    };

    const passStrength = getPassStrengthValue(password);
    const color = selectStrengthMeterColor(passStrength);
    passStrengthMeter.style.width = `${(passStrength / 4) * 100}%`;
    passStrengthMeter.style.backgroundColor = color;
  }, [password]);

  return (
    <div className={S.powerMeter}>
      <div className={S.powerScale} ref={passStrengthMeterRef}></div>
    </div>
  );
};
