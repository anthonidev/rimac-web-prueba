'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './PlanSelection.module.scss';
import { useQuoteStore } from '@/store/useQuoteStore';
import { PlanSteps } from './PlanSteps';
import { QuoteTargetOptions } from './QuoteTargetOptions';
import { PlanCards } from './PlanCards';
import { PlanSummary } from './PlanSummary';
import type { PlanStep, QuoteTarget, QuoteTargetOption } from './types';
import type { Plan, SelectedPlan } from '@/store/useQuoteStore';

const steps: PlanStep[] = [
    { number: 1, label: 'Planes y coberturas' },
    { number: 2, label: 'Resumen' },
];

const quoteTargetOptions: QuoteTargetOption[] = [
    {
        label: 'Para mí',
        value: 'for_me',
        icon: '/icons/IcProtectionLight.svg',
        description: 'Cotiza tu seguro de salud y agrega familiares si así lo deseas.',
    },
    {
        label: 'Para alguien más',
        value: 'for_others',
        icon: '/icons/IcAddUserLight.svg',
        description: 'Realiza una cotización para uno de tus familiares o cualquier persona.',
    },
];

export default function PlanSelection() {
    const router = useRouter();
    const userData = useQuoteStore((state) => state.userData);
    const clearUserData = useQuoteStore((state) => state.clearUserData);
    const setChosenPlan = useQuoteStore((state) => state.setChosenPlan);
    const chosenPlan = useQuoteStore((state) => state.chosenPlan);
    const [selectedOption, setSelectedOption] = useState<QuoteTarget | null>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const plans: Plan[] = userData?.plans ?? [];

    useEffect(() => {
        if (!userData) {
            router.replace('/');
        }
    }, [userData, router]);

    if (!userData) {
        return null;
    }

    const handleBack = () => {
        if (currentStep === 1) {
            setChosenPlan(null);
            setCurrentStep(0);
            return;
        }

        clearUserData();
        router.push('/');
    };

    const handleQuoteTargetChange = (option: QuoteTarget) => {
        setSelectedOption(option);
        if (currentStep !== 0) {
            setCurrentStep(0);
        }
        if (chosenPlan) {
            setChosenPlan(null);
        }
    };

    const handlePlanSelect = (plan: SelectedPlan) => {
        setChosenPlan(plan);
        setCurrentStep(1);
    };

    const introTitle = currentStep === 0
        ? `${userData.name} ¿Para quién deseas cotizar?`
        : `${userData.name}, revisa y confirma tu plan`;
    const introSubtitle = currentStep === 0
        ? 'Selecciona la opción que se ajuste más a tus necesidades.'
        : 'Verifica que tus datos y la información del plan sean correctos antes de continuar.';

    return (
        <section className={styles.planSelection} aria-labelledby="plan-selection-heading">
            <header className={styles.planSelection__progressArea}>
                <nav className={styles.planSelection__progressNav} aria-label="Progreso de la cotización">
                    <button
                        type="button"
                        className={`${styles.planSelection__backButton} ${styles['planSelection__backButton--mobile']}`}
                        onClick={handleBack}
                        aria-label="Volver"
                    >
                        <span aria-hidden="true" className={styles.planSelection__backIcon}>
                            &lt;
                        </span>
                    </button>
                    <PlanSteps steps={steps} activeStepIndex={currentStep} />
                </nav>
            </header>

            <div className={styles.planSelection__wrapper}>
                <button
                    type="button"
                    className={`${styles.planSelection__backButton} ${styles['planSelection__backButton--desktop']}`}
                    onClick={handleBack}
                >
                    <span aria-hidden="true" className={styles.planSelection__backIcon}>
                        &lt;
                    </span>
                    <span className={styles.planSelection__backLabel}>Volver</span>
                </button>

                <div className={styles.planSelection__content}>
                    <header className={styles.planSelection__intro}>
                        <h1 id="plan-selection-heading" className={styles.planSelection__title}>
                            {introTitle}
                        </h1>
                        <p className={styles.planSelection__subtitle}>{introSubtitle}</p>
                    </header>

                    {currentStep === 0 && (
                        <>
                            <form className={styles.planSelection__form} onSubmit={(event) => event.preventDefault()}>
                                <fieldset className={styles.planSelection__fieldset}>
                                    <QuoteTargetOptions
                                        options={quoteTargetOptions}
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
                                        recommendedPlanName="Plan en Casa y Clínica"
                                        onSelectPlan={handlePlanSelect}
                                    />
                                ) : (
                                    <p className={styles.planSelection__helper}>
                                        Actualmente no contamos con planes disponibles para esta selección.
                                    </p>
                                )
                            ) : (
                                <p className={styles.planSelection__helper}>
                                    Selecciona una opción para ver los planes disponibles.
                                </p>
                            )}
                        </>
                    )}

                    {currentStep === 1 && chosenPlan && (
                        <PlanSummary user={userData} plan={chosenPlan} />
                    )}
                </div>
            </div>
        </section>
    );
}
