import React from 'react';

interface IStepsControllerProps {
    onClick: () => void;
    backToPrevious: () => void;
}

const StepController: React.FC<IStepsControllerProps> = ({ onClick, backToPrevious }) => {
    return (
        <div className="flex justify-between items-center bottom-0 left-0 right-0 border-t-2 py-4">
            <div className="cursor-pointer text-base font-semibold text-dh-gray-600" onClick={backToPrevious}>
                Back
            </div>
            <div className="flex">
                {/* <div className=" text-base font-semibold text-dh-gray-600">Skip</div> */}
                <div className="cursor-pointer text-base font-semibold text-dh-green-800" onClick={onClick}>
                    Save & Continue
                </div>
            </div>
        </div>
    );
};

export default StepController;
