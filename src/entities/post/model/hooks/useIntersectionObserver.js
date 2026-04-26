import { useEffect, useRef, useState } from "react";

export const useIntersectionObserver = ({
    threshold = 0.1,
    rootMargin = '100px',
    triggerOnce = true
} = {}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);

                    if (triggerOnce) {
                        observer.disconnect();
                    }
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [threshold, rootMargin, triggerOnce]);

    return { isVisible, ref };
};