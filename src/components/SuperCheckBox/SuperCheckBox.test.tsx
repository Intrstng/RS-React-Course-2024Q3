import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SuperCheckBox, SuperCheckBoxProps } from './SuperCheckBox';
import { vi, describe, test, expect } from 'vitest';
import '@testing-library/jest-dom';

const CHECKBOX_TITLE = 'Test check';

describe('SuperCheckBox Component', () => {
  test('should call onChangeHandler when the checkbox is clicked', () => {
    const onChangeHandlerMock = vi.fn();
    const props: SuperCheckBoxProps = {
      isChecked: false,
      onChangeHandler: onChangeHandlerMock,
      children: CHECKBOX_TITLE,
    };

    render(<SuperCheckBox {...props}>{props.children}</SuperCheckBox>);

    const checkbox = screen.getByLabelText(CHECKBOX_TITLE);

    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(onChangeHandlerMock).toHaveBeenCalled();
    expect(onChangeHandlerMock).toHaveBeenCalledTimes(1);
  });
});
