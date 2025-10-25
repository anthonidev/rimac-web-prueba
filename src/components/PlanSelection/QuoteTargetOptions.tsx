'use client';

import Image from 'next/image';
import styles from './PlanSelection.module.scss';
import type { QuoteTarget, QuoteTargetOption } from './types';

interface QuoteTargetOptionsProps {
    options: QuoteTargetOption[];
    selectedOption: QuoteTarget | null;
    onSelect: (value: QuoteTarget) => void;
}

export function QuoteTargetOptions({ options, selectedOption, onSelect }: QuoteTargetOptionsProps) {
    return (
        <div className={styles.planSelection__options}>
            {options.map((option) => {
                const isSelected = selectedOption === option.value;
                return (
                    <label
                        key={option.value}
                        className={styles.planSelection__option}
                        data-selected={isSelected}
                    >
                        <input
                            type="radio"
                            name="quoteTarget"
                            value={option.value}
                            checked={isSelected}
                            onChange={() => onSelect(option.value)}
                            className={styles.planSelection__radio}
                        />
                        <span className={styles.planSelection__checkmark} aria-hidden="true" />
                        <article className={styles.planSelection__optionContent}>
                            <div className={styles.planSelection__iconWrapper}>
                                <Image src={option.icon} alt="" width={48} height={48} priority />
                            </div>
                            <h2 className={styles.planSelection__optionTitle}>{option.label}</h2>
                            <p className={styles.planSelection__optionDescription}>{option.description}</p>
                        </article>
                    </label>
                );
            })}
        </div>
    );
}
