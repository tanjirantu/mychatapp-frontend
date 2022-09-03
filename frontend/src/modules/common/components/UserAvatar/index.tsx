import React from 'react';
import CustomImage from '../CustomImage';
interface IUserAvatarProps {
    height: number;
    width: number;
    className?: string;
    name: string;
    src: string;
    activeIndicator?: boolean;
    isActive?: boolean;
}
const UserAvatar: React.FC<IUserAvatarProps> = ({ height, width, name, src, className, activeIndicator, isActive }) => {
    const getActiveIndicatorPosition = ({ width, height }: { width: number; height: number }) => {
        const half = (length: number) => length / 2;
        return {
            width: half(width) + (half(half(width)) - half(width) / 10),
            height: half(height) + (half(half(height)) - half(height) / 10),
        };
    };

    return (
        <div style={{ height: `${height}px`, width: `${width}px` }} className={` ${className}  rounded-full`}>
            <div className="w-full h-full relative flex justify-center items-center ">
                <div
                    className={`flex justify-center  items-center rounded-full h-full w-full  bg-dh-gray-200 overflow-hidden`}
                >
                    <CustomImage className="min-h-full object-cover object-center  min-w-full" src={src} alt={name} />
                </div>

                {activeIndicator ? (
                    <div className="absolute w-full h-full inset-0 flex justify-center items-center ">
                        <div
                            className="relative h-full w-full flex justify-end items-end"
                            style={{ ...getActiveIndicatorPosition({ height, width }) }}
                        >
                            <div
                                className={`absolute  w-3 h-3 rounded-full -bottom-1.5 -right-1.5    ${
                                    isActive ? 'bg-dh-green-500 border-2 border-white' : ''
                                }`}
                            ></div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};
UserAvatar.defaultProps = {
    height: 38,
    width: 38,
    className: '',
};
export default UserAvatar;
