import React from "react";
import "./progressIndicator.css";

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="progress-indicator-container">
      <div className="progress-indicator-steps">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <React.Fragment key={stepNumber}>
              <div
                className={`progress-indicator-step ${
                  isActive ? "active" : ""
                } ${isCompleted ? "completed" : ""}`}
              >
                <div className="progress-indicator-step-number">
                  {stepNumber}
                </div>
              </div>
              {stepNumber < totalSteps && (
                <div
                  className={`progress-indicator-line ${
                    stepNumber < currentStep ? "completed" : ""
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
