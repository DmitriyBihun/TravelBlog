function HoverImageFollower({ imageUrl }) {
    const wrapperRef = useRef(null);
    const animationRef = useRef(null);
    const targetPos = useRef({ x: 0, y: 0 });
    const currentPos = useRef({ x: 0, y: 0 });

    const dimensionsRef = useRef({ width: 340, height: 420 });

    const [dimensions, setDimensions] = useState({ width: 340, height: 420 });
    const [isVisible, setIsVisible] = useState(false);

    const multiplyColor = '#fde863';
    const screenColor = '#3558a2';

    // ========== Стабільний handler миші ==========
    const handleMouseMove = useCallback((e) => {
        targetPos.current = {
            x: e.clientX - dimensionsRef.current.width * 0.38,
            y: e.clientY - dimensionsRef.current.height * 0.42,
        };
    }, []);

    // ========== Плавний lerp (завжди працює доки компонент mounted) ==========
    const updatePosition = useCallback(() => {
        const lerpFactor = 0.14;

        currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerpFactor;
        currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerpFactor;

        if (wrapperRef.current) {
            wrapperRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
        }

        animationRef.current = requestAnimationFrame(updatePosition);
    }, []);

    // ========== Завантаження зображення ==========
    useEffect(() => {
        if (!imageUrl) {
            setIsVisible(false);
            return;
        }

        const img = new Image();
        img.src = imageUrl;

        img.onload = () => {
            const maxWidth = Math.min(380, window.innerWidth * 0.28);
            const aspect = img.height / img.width || 1.25;

            const newWidth = maxWidth;
            const newHeight = Math.round(maxWidth * aspect);

            dimensionsRef.current = { width: newWidth, height: newHeight };
            setDimensions({ width: newWidth, height: newHeight });
            setIsVisible(true);
        };
    }, [imageUrl]);

    // ========== Запуск анімації ==========
    // Запускається відразу при монтуванні і працює весь час, доки компонент живе
    // (точно як у твоєму оригіналі, але з іншими оптимізаціями)
    useEffect(() => {
        animationRef.current = requestAnimationFrame(updatePosition);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
        };
    }, [updatePosition]);

    // ========== Listener миші (один раз за життя компонента) ==========
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    // Додатково скидаємо видимість при зміні imageUrl
    useEffect(() => {
        if (!imageUrl) setIsVisible(false);
    }, [imageUrl]);

    if (!imageUrl) return null;

    return (
        <div
            ref={wrapperRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: dimensions.width,
                height: dimensions.height,
                zIndex: 9999,
                pointerEvents: 'none',
                opacity: isVisible ? 0.95 : 0,
                transition: `
                    width 280ms cubic-bezier(0.4, 0, 0.2, 1),
                    height 280ms cubic-bezier(0.4, 0, 0.2, 1),
                    opacity 180ms ease-out
                `,
                willChange: 'transform',
                mixBlendMode: 'difference',
                filter: 'invert(1)',
            }}
        >
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    backgroundColor: multiplyColor,
                    display: 'flex',
                }}
            >
                <img
                    src={imageUrl}
                    alt="hover preview"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'grayscale(100%)',
                        mixBlendMode: 'multiply',
                    }}
                />

                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: screenColor,
                        mixBlendMode: 'screen',
                        pointerEvents: 'none',
                        zIndex: 1,
                    }}
                />
            </div>
        </div>
    );
}

export default HoverImageFollower;