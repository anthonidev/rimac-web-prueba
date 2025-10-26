import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';

interface PlanCarouselOptions {
    slideKeys: string;
    slideCount: number;
    options?: EmblaOptionsType;
}

interface PlanCarouselState {
    emblaRef: (node: HTMLElement | null) => void;
    emblaApi: EmblaCarouselType | undefined;
    isMobile: boolean;
    activeIndex: number;
    canScrollPrev: boolean;
    canScrollNext: boolean;
    showControls: boolean;
    handlePrev: () => void;
    handleNext: () => void;
}

const MOBILE_BREAKPOINT = '(max-width: 768px)';

export function usePlanCarousel({ slideKeys, slideCount, options }: PlanCarouselOptions): PlanCarouselState {
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const [isMobile, setIsMobile] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT);
        const updateViewportState = () => {
            setIsMobile(mediaQuery.matches);
        };

        updateViewportState();
        mediaQuery.addEventListener('change', updateViewportState);

        return () => {
            mediaQuery.removeEventListener('change', updateViewportState);
        };
    }, []);

    useEffect(() => {
        if (!emblaApi || !isMobile) {
            return;
        }

        const updateState = () => {
            setActiveIndex(emblaApi.selectedScrollSnap());
            setCanScrollPrev(emblaApi.canScrollPrev());
            setCanScrollNext(emblaApi.canScrollNext());
        };

        emblaApi.on('select', updateState);
        emblaApi.on('reInit', updateState);
        updateState();

        return () => {
            emblaApi.off('select', updateState);
            emblaApi.off('reInit', updateState);
        };
    }, [emblaApi, isMobile]);

    useEffect(() => {
        if (!emblaApi || !isMobile) {
            return;
        }

        emblaApi.reInit();
        emblaApi.scrollTo(0, true);
    }, [emblaApi, isMobile, slideCount, slideKeys]);

    const handlePrev = () => {
        emblaApi?.scrollPrev();
    };

    const handleNext = () => {
        emblaApi?.scrollNext();
    };

    return {
        emblaRef,
        emblaApi,
        isMobile,
        activeIndex,
        canScrollPrev,
        canScrollNext,
        showControls: isMobile && slideCount > 1,
        handlePrev,
        handleNext,
    };
}
