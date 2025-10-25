'use client';

import { Fragment, useMemo } from 'react';
import Image from 'next/image';
import styles from './PlanSelection.module.scss';
import type { QuoteTarget } from './types';
import type { Plan, SelectedPlan } from '@/store/useQuoteStore';
import {
    DISCOUNT_RATE,
    applyDiscount,
    formatPrice,
    getHighlightTokens,
    getPlanIcon,
} from './planUtils';

interface PlanCardsProps {
    plans: Plan[];
    variant: QuoteTarget;
    recommendedPlanName?: string;
    onSelectPlan: (plan: SelectedPlan) => void;
}

interface PlanCardData extends Plan {
    icon: string;
    isRecommended: boolean;
    displayPrice: number;
    hasDiscount: boolean;
}

export function PlanCards({ plans, variant, recommendedPlanName, onSelectPlan }: PlanCardsProps) {
    const cardsData: PlanCardData[] = useMemo(() => {
        return plans.map<PlanCardData>((plan) => {
            const hasDiscount = variant === 'for_others';
            const displayPrice = hasDiscount
                ? applyDiscount(plan.price, DISCOUNT_RATE)
                : plan.price;

            return {
                ...plan,
                icon: getPlanIcon(plan.name),
                isRecommended: plan.name.trim() === (recommendedPlanName ?? '').trim(),
                displayPrice,
                hasDiscount,
            };
        });
    }, [plans, variant, recommendedPlanName]);

    if (!cardsData.length) {
        return null;
    }

    return (
        <div className={styles.planSelection__plans}>
            {cardsData.map((plan) => (
                <article
                    key={plan.name}
                    className={styles.planSelection__planCard}
                    data-recommended={plan.isRecommended}
                >
                    {plan.isRecommended && (
                        <span className={styles.planSelection__planBadge}>Plan recomendado</span>
                    )}

                    <header className={styles.planSelection__planCardHeader}>
                        <div>
                            <h3 className={styles.planSelection__planTitle}>{plan.name}</h3>
                            <p className={styles.planSelection__planLabel}>Costo del plan</p>
                            <div className={styles.planSelection__planPriceBlock}>
                                {plan.hasDiscount && (
                                    <span className={styles.planSelection__planPricePrevious}>
                                        {formatPrice(plan.price)} antes
                                    </span>
                                )}
                                <span className={styles.planSelection__planPriceCurrent}>
                                    {formatPrice(plan.displayPrice)} al mes
                                </span>
                            </div>
                        </div>

                        <div className={styles.planSelection__planIconWrapper}>
                            <Image
                                src={plan.icon}
                                alt={`Ícono del ${plan.name}`}
                                width={48}
                                height={48}
                                priority
                            />
                        </div>
                    </header>

                    <div className={styles.planSelection__planDivider} aria-hidden="true"></div>

                    <ul className={styles.planSelection__planFeatures}>
                        {plan.description.map((item, index) => {
                            const tokens = getHighlightTokens(item);
                            return (
                                <li
                                    key={`${plan.name}-feature-${index}`}
                                    className={styles.planSelection__planFeatureItem}
                                >
                                    <span className={styles.planSelection__planFeatureBullet} aria-hidden="true"></span>
                                    <span className={styles.planSelection__planFeatureText}>
                                        {tokens.map((token, tokenIndex) => (
                                            token.bold ? (
                                                <strong key={`highlight-${plan.name}-${index}-${tokenIndex}`}>
                                                    {token.value}
                                                </strong>
                                            ) : (
                                                <Fragment key={`text-${plan.name}-${index}-${tokenIndex}`}>
                                                    {token.value}
                                                </Fragment>
                                            )
                                        ))}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>

                    <button
                        type="button"
                        className={styles.planSelection__planButton}
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
