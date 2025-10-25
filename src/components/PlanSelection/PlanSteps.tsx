'use client';

import styles from './PlanSelection.module.scss';
import type { PlanStep } from './types';

interface PlanStepsProps {
    steps: PlanStep[];
    activeStepIndex: number;
}

export function PlanSteps({ steps, activeStepIndex }: PlanStepsProps) {
    const totalSteps = steps.length;
    const hasSteps = totalSteps > 0;
    const currentIndex = hasSteps
        ? Math.min(Math.max(activeStepIndex, 0), totalSteps - 1)
        : 0;
    const currentStep = hasSteps ? steps[currentIndex] : undefined;
    const currentStepNumber = currentStep?.number ?? currentIndex + 1;
    const progressBase = hasSteps ? totalSteps : 1;
    const progressPercentage = ((currentIndex + 1) / progressBase) * 100;

    return (
        <>
            <ol className={styles.planSelection__steps}>
                {steps.map((step, index) => {
                    const isActive = index === currentIndex;
                    return (
                        <li
                            key={step.number}
                            className={styles.planSelection__step}
                            data-active={isActive}
                        >
                            <span className={styles.planSelection__stepNumber} aria-hidden="true">
                                {step.number}
                            </span>
                            <span className={styles.planSelection__stepLabel}>{step.label}</span>
                            {index < steps.length - 1 && (
                                <span className={styles.planSelection__stepDivider} aria-hidden="true"></span>
                            )}
                        </li>
                    );
                })}
            </ol>

            <div className={styles.planSelection__stepsMobile}>
                <span className={styles.planSelection__stepsMobileLabel}>
                    PASO {currentStepNumber} DE {totalSteps || 1}
                </span>
                <div
                    className={styles.planSelection__stepsMobileBar}
                    role="progressbar"
                    aria-valuemin={1}
                    aria-valuenow={currentIndex + 1}
                    aria-valuemax={progressBase}
                    aria-label={`Paso ${currentStepNumber} de ${progressBase}`}
                >
                    <span
                        className={styles.planSelection__stepsMobileBarFill}
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>
        </>
    );
}
