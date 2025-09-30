import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import "./styles/dropdown.css";

const CustomDropdown = ({
  options,
  value,
  onChange,
  placeholder,
  icon: Icon,
  textColor = "white", // Default to white for backward compatibility
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setHighlightedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : options.length - 1
          );
          break;
        case "Enter":
          event.preventDefault();
          if (highlightedIndex >= 0) {
            onChange(options[highlightedIndex].value);
            setIsOpen(false);
            setHighlightedIndex(-1);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, highlightedIndex, options, onChange]);

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  return (
    <div className="custom-dropdown-classic" ref={dropdownRef}>
      <button
        type="button"
        className={`dropdown-trigger-classic ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        style={{ color: textColor }} // Apply custom text color
      >
        {Icon && (
          <Icon
            className="dropdown-leading-icon"
            size={18}
            style={{ color: textColor }} // Apply to icon
          />
        )}
        <span
          className={`dropdown-value-classic ${
            !selectedOption ? "placeholder" : ""
          }`}
          style={{ color: textColor }} // Apply to value text
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={18}
          className={`dropdown-icon-classic ${isOpen ? "rotated" : ""}`}
          style={{ color: textColor }} // Apply to chevron
        />
      </button>

      {isOpen && (
        <div className="dropdown-menu-classic">
          <div className="dropdown-options-classic">
            {options.map((option, index) => (
              <div
                key={option.value}
                className={`dropdown-option-classic ${
                  option.value === value ? "selected" : ""
                } ${index === highlightedIndex ? "highlighted" : ""}`}
                onClick={() => handleOptionClick(option.value)}
                onMouseEnter={() => setHighlightedIndex(index)}
                role="option"
                aria-selected={option.value === value}
              >
                <span className="option-label-classic">{option.label}</span>
                {option.value === value && (
                  <Check size={16} className="check-icon-classic" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
