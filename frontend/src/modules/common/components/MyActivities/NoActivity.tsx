import React from 'react';

const NoActivity = () => {
    return (
        <div className="p-9">
            <img className="mt-12 w-full" src="/static/assets/images/no-notifications.svg" alt="" />
            <h4 className="text-center mt-6 font-bold">No activity found</h4>
            <h5 className="text-center  mt-2 text-dh-gray-500">Stay tuned ! Your notifications show up here</h5>
        </div>
    );
};

export default NoActivity;
