import { forwardRef, useEffect, useRef, useState } from 'react';
import S from './PasswordStrengthMeter.module.css';

export const PasswordStrengthMeter = forwardRef<HTMLInputElement, unknown>(
  (_, ref) => {
    const [password, setPassword] = useState<string>('');
    const passStrengthMeterRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (ref && 'current' in ref && ref.current) {
        const inputElement = ref.current as HTMLInputElement;

        const handleInputChange = () => {
          setPassword(inputElement.value);
        };

        inputElement.addEventListener('input', handleInputChange);

        return () => {
          inputElement.removeEventListener('input', handleInputChange);
        };
      }
    }, [ref]);

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
  }
);
