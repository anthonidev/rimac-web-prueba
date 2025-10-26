'use client';

import Image from 'next/image';
import styles from './QuoteTargetOptions.module.scss';
import type { QuoteTarget, QuoteTargetOption } from '@/features/plans/types';

interface QuoteTargetOptionsProps {
    options: QuoteTargetOption[];
    selectedOption: QuoteTarget | null;
    onSelect: (value: QuoteTarget) => void;
}

export function QuoteTargetOptions({ options, selectedOption, onSelect }: QuoteTargetOptionsProps) {
    return (
        <div className={styles.options}>
            {options.map((option) => {
                const isSelected = selectedOption === option.value;
                return (
                    <label key={option.value} className={styles.option} data-selected={isSelected}>
                        <input
                            type="radio"
                            name="quoteTarget"
                            value={option.value}
                            checked={isSelected}
                            onChange={() => onSelect(option.value)}
                            className={styles.radio}
                        />
                        <span className={styles.checkmark} aria-hidden="true" />
                        <article className={styles.content}>
                            <div className={styles.header}>
                                <div className={styles.iconWrapper}>
                                    <Image
                                        src={option.icon}
                                        alt=""
                                        fill
                                        priority
                                        sizes="(max-width: 600px) 32px, 48px"
                                        className={styles.icon}
                                    />
                                </div>
                                <h2 className={styles.title}>{option.label}</h2>
                            </div>
                            <p className={styles.description}>{option.description}</p>
                        </article>
                    </label>
                );
            })}
        </div>
    );
}
