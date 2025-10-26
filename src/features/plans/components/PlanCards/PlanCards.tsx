'use client';

import { usePlanCards } from '@/features/plans/hooks/usePlanCards';
import { usePlanCarousel } from '@/features/plans/hooks/usePlanCarousel';
import type { QuoteTarget } from '@/features/plans/types';
import { formatPrice, getHighlightTokens } from '@/features/plans/utils';
import type { Plan, SelectedPlan } from '@/store/useQuoteStore';
import Image from 'next/image';
import { Fragment } from 'react';
import styles from './PlanCards.module.scss';

const CAROUSEL_OPTIONS = {
    align: 'center' as const,
    containScroll: 'trimSnaps' as const,
};

interface PlanCardsProps {
    plans: Plan[];
    variant: QuoteTarget;
    recommendedPlanName?: string;
    onSelectPlan: (plan: SelectedPlan) => void;
}

export function PlanCards({ plans, variant, recommendedPlanName, onSelectPlan }: PlanCardsProps) {
    const cards = usePlanCards({ plans, variant, recommendedPlanName });
    const cardsKey = cards.map((card) => card.name).join('|');
    const {
        emblaRef,
        isMobile,
        activeIndex,
        canScrollPrev,
        canScrollNext,
        showControls,
        handlePrev,
        handleNext,
    } = usePlanCarousel({
        slideKeys: cardsKey,
        slideCount: cards.length,
        options: CAROUSEL_OPTIONS,
    });

    const showSlider = isMobile;
    const totalSlides = cards.length;

    if (!cards.length) {
        return null;
    }

    const renderPlanCard = (plan: (typeof cards)[number]) => (
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
    );

    return (
        <div className={styles.container}>
            {showSlider ? (
                <div className={styles.slider} data-slider-active={showControls}>
                    <div className={styles.viewport} ref={emblaRef}>
                        <div className={styles.slideContainer}>
                            {cards.map((plan) => (
                                <div key={plan.name} className={styles.slide}>
                                    {renderPlanCard(plan)}
                                </div>
                            ))}
                        </div>
                    </div>

                    {showControls && (
                        <div className={styles.controls}>
                            <button
                                type="button"
                                className={styles.controlButton}
                                onClick={handlePrev}
                                disabled={!canScrollPrev}
                                aria-label="Ver plan anterior"
                            >
                                <span aria-hidden="true">&lt;</span>
                            </button>
                            <span className={styles.pagination} aria-live="polite">
                                {activeIndex + 1} / {totalSlides}
                            </span>
                            <button
                                type="button"
                                className={styles.controlButton}
                                onClick={handleNext}
                                disabled={!canScrollNext}
                                aria-label="Ver siguiente plan"
                            >
                                <span aria-hidden="true">&gt;</span>
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className={styles.grid}>{cards.map((plan) => renderPlanCard(plan))}</div>
            )}
        </div>
    );
}
