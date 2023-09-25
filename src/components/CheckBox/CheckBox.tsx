import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import WhiteCheck from './WhiteCheck';

interface CheckBoxProps {
  checked?: boolean; // Accept a controlled value
  defaultChecked?: boolean; // Accept a default value
  onChange: (checked: boolean) => void;
  label?: string;
}

interface CheckMarkProps {
  isChecked: boolean;
}

const CheckBoxContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CheckBoxInput = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const CheckMark = styled.div<CheckMarkProps>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid ${(props) => (props.isChecked ? '#767676' : '#c5c9d0')};
  background: ${(props) => (props.isChecked ? '#767676' : '#ffffff')};
  cursor: pointer;
  position: relative;
  margin-right: 8px;
  display: grid;
  place-items: center;
  /* Or you can use: place-items: center middle; */

  &:hover {
    border-color: gray;
  }
`;

const Label = styled.span`
  cursor: pointer;
  line-height: 28px;
  letter-spacing: 0;
  text-align: left;
`;

const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  defaultChecked,
  onChange,
  label,
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked || false);

  useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  const handleCheckboxChange = () => {
    const newCheckedValue = !isChecked;
    setIsChecked(newCheckedValue);
    if (onChange) {
      onChange(newCheckedValue);
    }
  };
  const formatLabel = (label:string) => {
    // Split the label by underscores and capitalize the first letter of each word
    const words = label.split('_').map((word:string) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
  
    // Join the words with spaces
    return words.join(' ');
  };
  return (
    <CheckBoxContainer>
      <CheckBoxInput defaultChecked={isChecked} />
      <CheckMark isChecked={isChecked} onClick={handleCheckboxChange}>
        {isChecked && <WhiteCheck />}
      </CheckMark>
      <Label onClick={handleCheckboxChange}>{formatLabel(label!)}</Label>
    </CheckBoxContainer>
  );
};

// Default prop values
CheckBox.defaultProps = {
  checked: undefined, // Set to undefined to allow controlled and uncontrolled usage
  defaultChecked: false,
  label: '',
};

export default CheckBox;
