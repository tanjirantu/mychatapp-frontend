import React, {
    useState,
    useRef,
    ReactElement,
    useEffect,
    useLayoutEffect,
    Children,
    MouseEvent,
    TouchEvent,
} from 'react';

import useInterval from '../../hooks/useInterval';

interface IOverflowSlider {
    children: JSX.Element[];
    className?: string;
    duration?: number;
    slidesToShow?: number;
    prevBtn: ({ activePrev, handlePrev }: { activePrev: boolean; handlePrev: () => void }) => ReactElement;
    nextBtn: ({ activeNext, handleNext }: { activeNext: boolean; handleNext: () => void }) => ReactElement;
    onSliderEnd?: () => void;
    autoPlay?: boolean;
    autoPlayDuration?: number;
}

const OverflowSlider: React.FC<IOverflowSlider> = ({
    children,
    className,
    slidesToShow = 1,
    duration = 500,
    autoPlayDuration = 2000,
    prevBtn,
    nextBtn,
    onSliderEnd,
    autoPlay = false,
}) => {
    const [activeItem, setActiveItem] = useState(1);
    const [positionX, setPostionX] = useState(0);
    const [extraPostionX, setExtraPostitionX] = useState(0);
    const [next, setNext] = useState(true);
    const [prev, setPrev] = useState(false);
    const [isMouseDown, setIsMoiseDown] = useState(false);
    const [mousePosition, setMousePosition] = useState(0);
    const [mousePostiionX, setMousePositionX] = useState(0);
    const [isMouseOver, setIsMouseOver] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const calculateNodes = () => {
        if (!ref.current) return;

        const totalSliderAvaialbeWidht = ref.current?.offsetWidth;
        const tatalSliderElementsWidth = calculateNodesWidth(Array.from(ref.current?.childNodes) as HTMLElement[]);
        if (tatalSliderElementsWidth <= totalSliderAvaialbeWidht) {
            onSliderEnd && onSliderEnd();
            setNext(false);
        } else {
            setNext(true);
        }
    };

    useLayoutEffect(() => {
        !!Children.count(children) && calculateNodes();
    }, [Children.count(children)]);

    const handleAutoSlide = () => {
        if (next) {
            handleNextSlide(activeItem + slidesToShow);
            return;
        }
        if (prev) {
            handlePreviousSlide(1);
        }
    };

    useInterval(handleAutoSlide, autoPlay && !isMouseOver ? autoPlayDuration : null);

    useEffect(() => {
        window.addEventListener('resize', calculateNodes);
        return () => window.removeEventListener('resize', calculateNodes);
    }, []);

    //calculate  html  elements width
    const calculateNodesWidth = (nodes: HTMLElement[]): number =>
        nodes.reduce((acc: number, curr: HTMLElement) => {
            return curr.offsetWidth + acc;
        }, 0);

    //slice html elements
    const sliceNodes = (nodes: HTMLElement[], start: number, end: number): HTMLElement[] => nodes.slice(start, end);

    const handleNextSlide = (slideTo: number): void => {
        if (!next) return;

        const childNodes = Array.from(ref.current?.childNodes || []) as HTMLElement[];
        const avaiableElementWidthForThisSlideAction: number = calculateNodesWidth(
            sliceNodes(childNodes, activeItem - 1, slideTo - 1)
        );

        const nextAvailbeElemenetsWidthAfterThisSlideAction: number = calculateNodesWidth(
            sliceNodes(childNodes, slideTo - 1, childNodes.length)
        );
        const totalSliderOffsetWidth: number = Number(ref.current?.offsetWidth) || 0;

        if (!!avaiableElementWidthForThisSlideAction && !!nextAvailbeElemenetsWidthAfterThisSlideAction) {
            const avaialbeMoveForNextSlide: number = positionX - avaiableElementWidthForThisSlideAction;

            if (nextAvailbeElemenetsWidthAfterThisSlideAction <= totalSliderOffsetWidth) {
                setNext(false);
                onSliderEnd && onSliderEnd();
            }

            setPostionX(avaialbeMoveForNextSlide);
            setPrev(true);
            setActiveItem(slideTo);
            return;
        }

        if (avaiableElementWidthForThisSlideAction > totalSliderOffsetWidth && next) {
            setPostionX((leftX) => leftX - (avaiableElementWidthForThisSlideAction - totalSliderOffsetWidth));
            setExtraPostitionX(avaiableElementWidthForThisSlideAction - totalSliderOffsetWidth);
            setNext(false);
            setPrev(true);
            onSliderEnd && onSliderEnd();
        }
    };

    const handlePreviousSlide = (slideTo: number) => {
        if (!prev) return;

        const childNodes = Array.from(ref.current?.childNodes || []) as HTMLElement[];
        const avaiableElementWidthForThisSlideAction = calculateNodesWidth(
            sliceNodes(childNodes, slideTo - 1, activeItem - 1)
        );

        if (extraPostionX) {
            positionX + extraPostionX === 0 && setPrev(false);
            setPostionX(positionX + extraPostionX);
            setExtraPostitionX(0);
            return;
        }

        slideTo === 1 && setPrev(false);

        setPostionX(positionX + avaiableElementWidthForThisSlideAction);
        setActiveItem(slideTo);
        setNext(true);
    };

    const handleMouseDown = (event: MouseEvent | TouchEvent) => {
        const screenXPostion = 'changedTouches' in event ? event.changedTouches[0].pageX : event.screenX;

        setMousePosition(screenXPostion);
        setIsMoiseDown(true);
    };

    const handlePositionAdjustmentAfterMouseMove = (totalMouseMove: number) => {
        if (totalMouseMove === 0) return;

        let slideCount = 1;
        let sliderRequiredPostiion = 0;
        const isRightMovement = totalMouseMove > 0 ? false : true;
        const childNodes = Array.from(ref.current?.childNodes || []) as HTMLElement[];
        const avaibleElementForMove = sliceNodes(
            childNodes,
            !isRightMovement ? 0 : activeItem - 1,
            !isRightMovement ? activeItem - 1 : childNodes.length
        );

        while (avaibleElementForMove.length > 0) {
            if (isRightMovement) {
                sliderRequiredPostiion += calculateNodesWidth(sliceNodes(avaibleElementForMove, 0, slidesToShow));
                avaibleElementForMove.splice(0, slidesToShow);
            } else {
                const reverseAvaibleElementForMove = avaibleElementForMove.reverse();
                sliderRequiredPostiion += calculateNodesWidth(
                    sliceNodes(reverseAvaibleElementForMove, 0, slidesToShow)
                );
                avaibleElementForMove.splice(avaibleElementForMove.length - slidesToShow, slidesToShow);
            }

            if (sliderRequiredPostiion > Math.abs(totalMouseMove)) {
                break;
            }

            slideCount++;
        }

        isRightMovement
            ? handleNextSlide(activeItem + slideCount * slidesToShow)
            : handlePreviousSlide(activeItem - slideCount * slidesToShow);
    };

    const handleMouseUp = () => {
        setMousePosition(0);
        setMousePositionX(0);
        setIsMoiseDown(false);
        handlePositionAdjustmentAfterMouseMove(mousePostiionX);
    };

    const handleMouseMove = (event: MouseEvent | TouchEvent) => {
        event.stopPropagation();
        if (!('changedTouches' in event)) {
            event.preventDefault();
        }
        if (!isMouseDown) return;
        const screenXPostion = 'changedTouches' in event ? event.changedTouches[0].pageX : event.screenX;
        setMousePositionX(screenXPostion - mousePosition);
    };

    const handleMouseEnter = () => setIsMouseOver(true);

    const handleMouseLeave = () => setIsMouseOver(false);

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="relative w-full">
            {prevBtn({ handlePrev: () => handlePreviousSlide(activeItem - slidesToShow), activePrev: prev })}
            <div
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchMove={handleMouseMove}
                onTouchStart={handleMouseDown}
                onTouchStartCapture={handleMouseDown}
                onTouchEnd={handleMouseUp}
                className="relative w-full"
            >
                <div style={{ overflow: 'clip visible' }}>
                    <div
                        style={{
                            transform: `translateX(${positionX + mousePostiionX}px)`,
                            transition: !isMouseDown ? `${duration}ms transform` : '',
                        }}
                        ref={ref}
                        className={`${className} `}
                    >
                        {children}
                    </div>
                </div>
            </div>
            {nextBtn({ handleNext: () => handleNextSlide(activeItem + slidesToShow), activeNext: next })}
        </div>
    );
};

OverflowSlider.defaultProps = {
    className: '',
    slidesToShow: 1,
    duration: 500,
    autoPlay: false,
};

export default OverflowSlider;
