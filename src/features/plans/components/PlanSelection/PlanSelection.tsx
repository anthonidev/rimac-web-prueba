'use client';

import styles from './PlanSelection.module.scss';
import { PlanSteps } from './components/PlanSteps/PlanSteps';
import { QuoteTargetOptions } from './components/QuoteTargetOptions/QuoteTargetOptions';
import { PlanCards } from './components/PlanCards/PlanCards';
import { PlanSummary } from './components/PlanSummary/PlanSummary';
import { QUOTE_TARGET_OPTIONS, RECOMMENDED_PLAN_NAME, STEPS } from '@/features/plans/config';
import { usePlanSelection } from '@/features/plans/hooks/usePlanSelection';

export default function PlanSelection() {
    const {
        userData,
        plans,
        selectedOption,
        currentStep,
        chosenPlan,
        introTitle,
        introSubtitle,
        handleBack,
        handleQuoteTargetChange,
        handlePlanSelect,
    } = usePlanSelection();

    if (!userData) {
        return null;
    }

    return (
        <section className={styles.container} aria-labelledby="plan-selection-heading">
            <header className={styles.progressArea}>
                <nav className={styles.progressNav} aria-label="Progreso de la cotización">
                    <button
                        type="button"
                        className={`${styles.backButton} ${styles.backButtonMobile}`}
                        onClick={handleBack}
                        aria-label="Volver"
                    >
                        <span aria-hidden="true" className={styles.backIcon}>
                            &lt;
                        </span>
                    </button>
                    <PlanSteps steps={STEPS} activeStepIndex={currentStep} />
                </nav>
            </header>

            <div className={styles.wrapper}>
                <button
                    type="button"
                    className={`${styles.backButton} ${styles.backButtonDesktop}`}
                    onClick={handleBack}
                >
                    <span aria-hidden="true" className={styles.backIcon}>
                        &lt;
                    </span>
                    <span className={styles.backLabel}>Volver</span>
                </button>

                <div className={styles.content}>
                    <header className={styles.intro}>
                        <h1 id="plan-selection-heading" className={styles.title}>
                            {introTitle}
                        </h1>
                        <p className={styles.subtitle}>{introSubtitle}</p>
                    </header>

                    {currentStep === 0 && (
                        <>
                            <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
                                <fieldset className={styles.fieldset}>
                                    <QuoteTargetOptions
                                        options={QUOTE_TARGET_OPTIONS}
                                        selectedOption={selectedOption}
                                        onSelect={handleQuoteTargetChange}
                                    />
                                </fieldset>
                            </form>

                            {selectedOption ? (
                                plans.length > 0 ? (
                                    <PlanCards
                                        plans={plans}
                                        variant={selectedOption}
                                        recommendedPlanName={RECOMMENDED_PLAN_NAME}
                                        onSelectPlan={handlePlanSelect}
                                    />
                                ) : (
                                    <p className={styles.helper}>
                                        Actualmente no contamos con planes disponibles para esta selección.
                                    </p>
                                )
                            ) : (
                                <p className={styles.helper}>
                                    Selecciona una opción para ver los planes disponibles.
                                </p>
                            )}
                        </>
                    )}

                    {currentStep === 1 && chosenPlan && <PlanSummary user={userData} plan={chosenPlan} />}
                </div>
            </div>
        </section>
    );
}
