import React from 'react';
import OverflowSlider from '../../../common/components/OverflowSlider';
import useScrollPosition from '../../../common/hooks/useScrollPosition';
import LeftIcon from '../../../common/icons/LeftIcon';
import { Tag } from '../../../../api/tags/Tag';
import styles from './ManufectureProfiles.module.scss';

interface IFilterTags {
    tags: Tag[];
    activeTag: string;
    setActiveTag: (tag: string) => void;
}

const FilterTags: React.FC<IFilterTags> = ({ tags, activeTag, setActiveTag }) => {
    const { ref, position } = useScrollPosition();

    return (
        <div
            ref={ref}
            className={`py-3.5 -mx-12 px-12 sticky  top-20 z-50 flex-shrink-0  transition-all gap-2.5 flex ${
                styles.root
            } ${
                position.top !== undefined && position.top <= 80
                    ? `${styles.top} bg-opacity-80 border-b border-t border-white bg-white  backdrop-blur`
                    : ''
            }`}
        >
            <div className="max-w-7xl mx-auto w-full">
                <OverflowSlider
                    slidesToShow={2}
                    className="flex flex-nowrap w-full -mx-2.5"
                    nextBtn={({ handleNext, activeNext }) =>
                        activeNext ? (
                            <div
                                onClick={handleNext}
                                className={`absolute cursor-pointer z-50 top-0 right-0 bottom-0 flex items-center justify-end ${styles.navBtn}`}
                            >
                                <LeftIcon className="text-dh-green-700 w-6 h-6 rotate-180 transform" />
                            </div>
                        ) : (
                            <></>
                        )
                    }
                    prevBtn={({ handlePrev, activePrev }) =>
                        activePrev ? (
                            <div
                                onClick={handlePrev}
                                className={`absolute transform rotate-180 cursor-pointer z-50 top-0 left-0 bottom-0 flex items-center justify-end ${styles.navBtn}`}
                            >
                                <LeftIcon className="text-dh-green-700 w-6 h-6 rotate-180 transform" />
                            </div>
                        ) : (
                            <></>
                        )
                    }
                >
                    {tags.map((tag, index) => {
                        return (
                            <div className="px-2.5 flex-shrink-0 select-none" key={index}>
                                <button
                                    onClick={() => setActiveTag(tag.uid)}
                                    className={`  rounded-md flex-shrink-0 cursor-pointer px-4  flex items-center transition-all text-sm font-semibold justify-center ${
                                        styles.tag
                                    } ${activeTag === tag.uid ? styles.activeTag : ''}`}
                                >
                                    {tag.name}
                                </button>
                            </div>
                        );
                    })}
                </OverflowSlider>
            </div>
        </div>
    );
};

export default FilterTags;
