import React, { Fragment, useState } from 'react';
import { Carousel, CarouselControl, CarouselIndicators, CarouselItem } from 'reactstrap';
import { Link } from "react-router-dom";

export default function CarouselComponent(props) {
    const dataCarousel = props.dataCarousel;
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === dataCarousel.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };
    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? dataCarousel.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };
    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = dataCarousel.map((item) => {
        // const slugId = ToSlug(item.lowerCase)+'-'+item.ID_BaiViet;
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item._id}
            >
                <Link to={'/baiviet/' + item._id}>
                    <img src={item.img} alt={item.lowerCase} className="d-block w-100 " style={{ width: '100%', maxHeight: 250 }} />
                </Link>
            </CarouselItem>
        );
    });
    
    return (
        <Fragment>
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
            >
                <CarouselIndicators items={dataCarousel} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>

        </Fragment>
    )
}


