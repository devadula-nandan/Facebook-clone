import { useState, useEffect, useRef } from "react";

const Carousel = ({ items, autoSlide = true, Button }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [responsiveItems, setResponsiveItems] = useState(1);
    const carouselRef = useRef(null);

    useEffect(() => {
        const carouselEl = carouselRef.current;
        if (!carouselEl) return;
        const updateResponsiveItems = () => {
            const carouselWidth = carouselEl.offsetWidth;
            setResponsiveItems(
                carouselWidth >= 1200 ? 4
                    : carouselWidth >= 900 ? 3
                        : carouselWidth >= 576 ? 2
                            : 1
            );
        };
        updateResponsiveItems();
        window.addEventListener("resize", updateResponsiveItems);
        return () => window.removeEventListener("resize", updateResponsiveItems);
    }, [carouselRef]);


    useEffect(() => {
        const slideInterval = autoSlide
            ? setInterval(() => {
                setCurrentIndex((prevIndex) =>
                    prevIndex === items.length - responsiveItems ? 0 : prevIndex + 1
                );
            }, 5000)
            : null;
        return () => clearInterval(slideInterval);
    }, [items.length, autoSlide, responsiveItems]);

    const handlePrevClick = () =>
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? items.length - responsiveItems : prevIndex - 1
        );

    const handleNextClick = () =>
        setCurrentIndex((prevIndex) =>
            prevIndex === items.length - responsiveItems ? 0 : prevIndex + 1
        );

    return (
        <div style={{ overflow: "hidden" }} ref={carouselRef}>
            {items.length > responsiveItems && (
                <div style={{ margin: "0 0.8rem", display: 'flex', gap: '0.6rem', justifyContent: 'end' }}>
                    <Button onClick={handlePrevClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                        </svg></Button>
                    <Button onClick={handleNextClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </Button>
                </div>
            )}

            <div style={{ width: "100%", display: "flex", transition: "transform 0.5s ease-in-out", transform: `translateX(-${currentIndex * (100 / responsiveItems)}%)`, }}>
                {items.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            width: `${100 / responsiveItems}%`,
                            flexShrink: 0,
                        }}
                    >
                        {item}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Carousel;

