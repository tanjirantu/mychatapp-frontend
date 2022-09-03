import React from 'react';
import AppHeaderWrapper from '../../../common/components/AppHeaderWrapper';
import SearchInput from '../../../common/components/SearchInput';
import HeaderMenu from '../../../common/components/HeaderMenu';
const Header = () => {
    return (
        <AppHeaderWrapper height={80}>
            <div className="w-full flex px-5 h-full items-center gap-5">
                <div className="w-9/12 flex items-center gap-5">
                    <h2 className="text-white w-6/12">Conversations</h2>
                    <div className="w-6/12 relative h-10">
                        <SearchInput />
                    </div>
                </div>
                <div className="w-3/12 flex justify-end">
                    <HeaderMenu />
                </div>
            </div>
        </AppHeaderWrapper>
    );
};

export default Header;
