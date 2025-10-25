'use client';

import Image from 'next/image';
import styles from './PlanSummary.module.scss';
import type { SelectedPlan, UserData } from '@/store/useQuoteStore';
import { formatPrice, getPlanIcon } from '../../planUtils';

interface PlanSummaryProps {
    user: UserData;
    plan: SelectedPlan;
}

export function PlanSummary({ user, plan }: PlanSummaryProps) {
    const fullName = `${user.name} ${user.lastName}`.trim();
    const iconSrc = getPlanIcon(plan.name);

    return (
        <section className={styles.summary} aria-labelledby="plan-summary-heading">
            <h2 id="plan-summary-heading" className={styles.title}>
                Resumen del plan seleccionado
            </h2>

            <div className={styles.grid}>
                <article className={styles.card} aria-labelledby="plan-summary-personal-heading">
                    <h3 id="plan-summary-personal-heading" className={styles.subtitle}>
                        Tus datos
                    </h3>
                    <dl className={styles.details}>
                        <div className={styles.detailRow}>
                            <dt>Nombre completo</dt>
                            <dd>{fullName}</dd>
                        </div>
                        <div className={styles.detailRow}>
                            <dt>Documento</dt>
                            <dd>{user.documentNumber}</dd>
                        </div>
                        <div className={styles.detailRow}>
                            <dt>Celular</dt>
                            <dd>{user.phone}</dd>
                        </div>
                    </dl>
                </article>

                <article className={styles.card} aria-labelledby="plan-summary-plan-heading">
                    <h3 id="plan-summary-plan-heading" className={styles.subtitle}>
                        Plan seleccionado
                    </h3>
                    <div className={styles.planHeader}>
                        <div className={styles.iconWrapper}>
                            <Image src={iconSrc} alt="" width={48} height={48} priority />
                        </div>
                        <div className={styles.planInfo}>
                            <p className={styles.planName}>{plan.name}</p>
                            <div className={styles.priceGroup}>
                                {plan.hasDiscount && <span className={styles.pricePrevious}>{formatPrice(plan.originalPrice)} antes</span>}
                                <span className={styles.priceFinal}>{formatPrice(plan.finalPrice)} al mes</span>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}
