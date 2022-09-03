import classNames from 'classnames';
import React from 'react';
import TickIcon from '../../../common/icons/TickIcon';
import styles from './ServiceModal.module.scss';

interface IStepProps {
    target: number;
}

const Step: React.FC<IStepProps> = ({ target }) => {
    return (
        <>
            <div className="flex ">
                <div
                    className={classNames(
                        `${
                            target === 1 ? styles.stepCircleFill : styles.stepCircleLight
                        } flex justify-center items-center cursor-pointer`
                    )}
                >
                    <TickIcon className="w-3 h-3" fill={target === 1 ? '#d3d3d3' : '#01896a'} />
                </div>
                <div className="flex justify-center items-center ml-2.5">
                    <div
                        className={
                            target === 2
                                ? styles.circleLeftFill
                                : target > 2
                                ? styles.circleLeftFill
                                : styles.circleLeftDefault
                        }
                    ></div>
                    <div
                        className={classNames(
                            `${
                                target === 2
                                    ? styles.stepCircleFill
                                    : target < 2
                                    ? styles.stepCircleDefault
                                    : styles.stepCircleLight
                            } flex justify-center items-center cursor-pointer`
                        )}
                    >
                        <TickIcon
                            className="w-3 h-3"
                            fill={target === 2 ? '#d3d3d3' : target < 2 ? '#d3d3d3' : '#01896a'}
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center ml-2.5">
                    <div
                        className={
                            target === 3
                                ? styles.circleLeftFill
                                : target > 3
                                ? styles.circleLeftFill
                                : styles.circleLeftDefault
                        }
                    ></div>
                    <div
                        className={classNames(
                            `${
                                target === 3
                                    ? styles.stepCircleFill
                                    : target < 3
                                    ? styles.stepCircleDefault
                                    : styles.stepCircleLight
                            } flex justify-center items-center cursor-pointer`
                        )}
                    >
                        <TickIcon
                            className="w-3 h-3"
                            fill={target === 3 ? '#d3d3d3' : target < 3 ? '#d3d3d3' : '#01896a'}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Step;
