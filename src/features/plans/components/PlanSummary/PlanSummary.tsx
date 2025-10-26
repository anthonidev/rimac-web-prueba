'use client';

import Image from 'next/image';
import styles from './PlanSummary.module.scss';
import type { SelectedPlan, UserData } from '@/store/useQuoteStore';
import { formatPrice } from '@/features/plans/utils';

interface PlanSummaryProps {
    user: UserData;
    plan: SelectedPlan;
}

export function PlanSummary({ user, plan }: PlanSummaryProps) {
    const fullName = `${user.name} ${user.lastName}`.trim();

    return (
        <section className={styles.summary} aria-labelledby="plan-summary-heading">
            <h2 id="plan-summary-heading" className={styles.title}>
                Resumen del seguro
            </h2>

            <div className={styles.grid}>
                <article className={styles.card} aria-labelledby="plan-summary-card-heading">
                    <header className={styles.cardHeader}>
                        <span className={styles.overline}>Precios calculados para:</span>
                        <div className={styles.person}>
                            <span className={styles.personIcon}>
                                <Image src="/icons/family.svg" alt="Icono de familia" width={24} height={24} />
                            </span>
                            <p id="plan-summary-card-heading" className={styles.personName}>
                                {fullName}
                            </p>
                        </div>
                    </header>

                    <div className={styles.divider} aria-hidden="true" />

                    <section className={styles.section} aria-labelledby="plan-summary-responsable-heading">
                        <h3 id="plan-summary-responsable-heading" className={styles.sectionTitle}>
                            Responsable de pago
                        </h3>
                        <p className={styles.detailLine}>
                            <span >DNI:</span>
                            <span >{user.documentNumber}</span>
                        </p>
                        <p className={styles.detailLine}>
                            <span >Celular:</span>
                            <span >{user.phone}</span>
                        </p>
                    </section>

                    <section className={styles.section} aria-labelledby="plan-summary-selected-plan-heading">
                        <h3 id="plan-summary-selected-plan-heading" className={styles.sectionTitle}>
                            Plan elegido
                        </h3>
                        <p className={styles.detailLine}>
                            <span >{plan.name}</span>
                        </p>
                        <p className={styles.detailLine}>
                            <span >Costo del Plan:</span>
                            <span > {formatPrice(plan.finalPrice)} al mes</span>
                        </p>

                    </section>
                </article>
            </div>
        </section>
    );
}
