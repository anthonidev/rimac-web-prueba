'use client';

import Image from 'next/image';
import styles from './PlanSelection.module.scss';
import type { SelectedPlan, UserData } from '@/store/useQuoteStore';
import { formatPrice, getPlanIcon } from './planUtils';

interface PlanSummaryProps {
    user: UserData;
    plan: SelectedPlan;
}

export function PlanSummary({ user, plan }: PlanSummaryProps) {
    const fullName = `${user.name} ${user.lastName}`.trim();
    const iconSrc = getPlanIcon(plan.name);

    return (
        <section className={styles.planSelection__summary} aria-labelledby="plan-summary-heading">
            <h2 id="plan-summary-heading" className={styles.planSelection__summaryTitle}>
                Resumen del plan seleccionado
            </h2>

            <div className={styles.planSelection__summaryGrid}>
                <article
                    className={styles.planSelection__summaryCard}
                    aria-labelledby="plan-summary-personal-heading"
                >
                    <h3 id="plan-summary-personal-heading" className={styles.planSelection__summarySubtitle}>
                        Tus datos
                    </h3>
                    <dl className={styles.planSelection__summaryDetails}>
                        <div className={styles.planSelection__summaryDetailRow}>
                            <dt>Nombre completo</dt>
                            <dd>{fullName}</dd>
                        </div>
                        <div className={styles.planSelection__summaryDetailRow}>
                            <dt>Documento</dt>
                            <dd>{user.documentNumber}</dd>
                        </div>
                        <div className={styles.planSelection__summaryDetailRow}>
                            <dt>Celular</dt>
                            <dd>{user.phone}</dd>
                        </div>
                    </dl>
                </article>

                <article
                    className={styles.planSelection__summaryCard}
                    aria-labelledby="plan-summary-plan-heading"
                >
                    <h3 id="plan-summary-plan-heading" className={styles.planSelection__summarySubtitle}>
                        Plan seleccionado
                    </h3>
                    <div className={styles.planSelection__summaryPlanHeader}>
                        <div className={styles.planSelection__summaryIconWrapper}>
                            <Image src={iconSrc} alt="" width={48} height={48} priority />
                        </div>
                        <div className={styles.planSelection__summaryPlanInfo}>
                            <p className={styles.planSelection__summaryPlanName}>{plan.name}</p>
                            <div className={styles.planSelection__summaryPriceGroup}>
                                {plan.hasDiscount && (
                                    <span className={styles.planSelection__summaryPricePrevious}>
                                        {formatPrice(plan.originalPrice)} antes
                                    </span>
                                )}
                                <span className={styles.planSelection__summaryPriceFinal}>
                                    {formatPrice(plan.finalPrice)} al mes
                                </span>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}
