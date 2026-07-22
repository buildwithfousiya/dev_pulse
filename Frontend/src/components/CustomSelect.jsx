import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const CustomSelect = ({ options, value, onChange, placeholder, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getOptionLabel = (opt) => {
    if (opt && typeof opt === 'object') return opt.label;
    return opt;
  };

  const getOptionValue = (opt) => {
    if (opt && typeof opt === 'object') return opt.value;
    return opt;
  };

  const selectedOption = options.find(
    (opt) => getOptionValue(opt) === value
  );

  const handleSelect = (opt) => {
    onChange(getOptionValue(opt));
    setIsOpen(false);
  };

  return (
    <div className={`custom-select-container ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className="custom-select-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {selectedOption ? getOptionLabel(selectedOption) : (placeholder || value)}
        </span>
        <ChevronDown size={14} className="chevron-icon" />
      </button>

      {isOpen && (
        <ul className="custom-select-options">
          {options.map((opt, index) => {
            const optVal = getOptionValue(opt);
            const isSelected = optVal === value;
            return (
              <li
                key={index}
                className={`custom-select-option ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelect(opt)}
              >
                {getOptionLabel(opt)}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
