import React from 'react';
import classNames from 'classnames';
import { IOrderStatusStepperProps } from './IOrderStatusStepperProps';
import { translateEnumToText } from '../../../../helpers/utils';

const OrderStatusStepper: React.FC<IOrderStatusStepperProps> = ({ steps, activeStep }) => {
    return (
        <div className="flex px-10 py-3.5 relative bg-white overflow-hidden shadow-sm rounded-md justify-between">
            <div className="absolute h-3 border-t-2  border-dashed top-[27px] left-16 right-16"></div>
            {steps.map((step, index) => {
                return (
                    <div className="flex flex-col items-center relative" key={index}>
                        <div className="bg-white w-14 h-7 flex mb-2 items-center justify-center">
                            <div
                                className={classNames('w-7 h-7 rounded-full flex items-center justify-center', {
                                    'bg-dh-red-500': activeStep === index,
                                    'bg-dh-gray-700 bg-opacity-60': activeStep < index,
                                    'bg-dh-green-700': activeStep > index,
                                })}
                            >
                                <step.icon />
                            </div>
                        </div>

                        <h5 className={`  mb-1 ${activeStep === index ? 'text-dh-red-500' : 'text-dh-gray-800'}`}>
                            {translateEnumToText(step.status)}
                        </h5>
                        <p className="text-dh-gray-700 text-opacity-60">{step.date}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default OrderStatusStepper;
