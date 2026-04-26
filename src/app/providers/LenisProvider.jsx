import Lenis from "lenis";
import { useEffect, useRef } from "react";

function LenisProvider({ children }) {

    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1,
            easing: (t) => 1 - Math.pow(1 - t, 4),
        });

        lenisRef.current = lenis;

        let rafId;

        const raf = (time) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return children

}

export default LenisProvider;