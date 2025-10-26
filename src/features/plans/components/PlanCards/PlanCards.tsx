'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import styles from './PlanCards.module.scss';
import type { QuoteTarget } from '@/features/plans/types';
import type { Plan, SelectedPlan } from '@/store/useQuoteStore';
import { formatPrice, getHighlightTokens } from '@/features/plans/utils';
import { usePlanCards } from '@/features/plans/hooks/usePlanCards';

interface PlanCardsProps {
    plans: Plan[];
    variant: QuoteTarget;
    recommendedPlanName?: string;
    onSelectPlan: (plan: SelectedPlan) => void;
}

export function PlanCards({ plans, variant, recommendedPlanName, onSelectPlan }: PlanCardsProps) {
    const cards = usePlanCards({ plans, variant, recommendedPlanName });

    if (!cards.length) {
        return null;
    }

    return (
        <div className={styles.list}>
            {cards.map((plan) => (
                <article key={plan.name} className={styles.card} data-recommended={plan.isRecommended}>
                    {plan.isRecommended && <span className={styles.badge}>Plan recomendado</span>}

                    <header className={styles.header}>
                        <div>
                            <h3 className={styles.title}>{plan.name}</h3>
                            <p className={styles.label}>Costo del plan</p>
                            <div className={styles.priceBlock}>
                                {plan.hasDiscount && <span className={styles.pricePrevious}>{formatPrice(plan.price)} antes</span>}
                                <span className={styles.priceCurrent}>{formatPrice(plan.displayPrice)} al mes</span>
                            </div>
                        </div>

                        <div className={styles.iconWrapper}>
                            <Image src={plan.icon} alt={`Ícono del ${plan.name}`} width={48} height={48} priority />
                        </div>
                    </header>

                    <div className={styles.divider} aria-hidden="true" />

                    <ul className={styles.features}>
                        {plan.description.map((item, index) => {
                            const tokens = getHighlightTokens(item);
                            return (
                                <li key={`${plan.name}-feature-${index}`} className={styles.featureItem}>
                                    <span className={styles.featureBullet} aria-hidden="true" />
                                    <span className={styles.featureText}>
                                        {tokens.map((token, tokenIndex) =>
                                            token.bold ? (
                                                <strong key={`highlight-${plan.name}-${index}-${tokenIndex}`}>{token.value}</strong>
                                            ) : (
                                                <Fragment key={`text-${plan.name}-${index}-${tokenIndex}`}>{token.value}</Fragment>
                                            ),
                                        )}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>

                    <button
                        type="button"
                        className={styles.selectButton}
                        onClick={() =>
                            onSelectPlan({
                                name: plan.name,
                                description: plan.description,
                                originalPrice: plan.price,
                                finalPrice: plan.displayPrice,
                                hasDiscount: plan.hasDiscount,
                            })
                        }
                    >
                        Seleccionar Plan
                    </button>
                </article>
            ))}
        </div>
    );
}
