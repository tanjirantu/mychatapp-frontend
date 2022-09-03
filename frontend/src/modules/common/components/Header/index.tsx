import React, { ReactNode } from 'react';
import AppHeaderWrapper from '../AppHeaderWrapper';
import SearchInput from '../SearchInput';
import HeaderMenu from '../HeaderMenu';
import { useRouter } from 'next/router';
import LeftIcon from '../../icons/LeftIcon';
interface IDashboadHeader {
    backOption?: boolean;
    title?: ReactNode | string;
    searchOption?: boolean;
    height?: number;
    style?: React.CSSProperties;
    middleNav?: ReactNode;
    rightNav?: ReactNode;
    leftNav?: ReactNode;
}

const DashboardHeader: React.FC<IDashboadHeader> = ({
    title,
    backOption = false,
    searchOption = true,
    style,
    height = 80,
    leftNav,
    middleNav,
    rightNav,
}) => {
    const router = useRouter();

    const handleGoBack = () => router.back();

    return (
        <AppHeaderWrapper height={height} style={style} className="sticky top-0">
            <nav className="w-full flex px-12 h-20  items-center gap-5 ">
                {!leftNav ? (
                    <div className="w-9/12 flex h-full items-center gap-5">
                        <div className="w-6/12 flex items-center">
                            {backOption ? (
                                <AppHeaderWrapper.IconWrapper
                                    className="mr-5"
                                    onClick={handleGoBack}
                                    backgroundColor="rgba(0, 0, 0, 0.1)"
                                >
                                    <LeftIcon className="w-5 h-5 stroke-current text-white" />
                                </AppHeaderWrapper.IconWrapper>
                            ) : null}
                            {typeof title === 'string' ? <h3 className="text-white text-[22px] ">{title}</h3> : title}
                        </div>
                        {middleNav ? middleNav : null}
                        {searchOption ? (
                            <div className="w-6/12 relative h-10">
                                <SearchInput />
                            </div>
                        ) : null}
                    </div>
                ) : (
                    leftNav
                )}
                {!rightNav ? (
                    <div className="w-3/12 h-full flex items-center justify-end">
                        <HeaderMenu />
                    </div>
                ) : (
                    rightNav
                )}
            </nav>
        </AppHeaderWrapper>
    );
};

export default DashboardHeader;
