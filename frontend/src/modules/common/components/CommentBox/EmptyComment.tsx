import React from 'react';

const EmptyComment = () => {
    return (
        <div className="h-full w-full flex items-center justify-center flex-col -mt-7">
            <img src="/static/assets/images/empty-comment.svg" alt="no comments" />
            <h3 className="text-dh-gray-700 text-center max-w-sm font-normal leading-relaxed">
                <span className="font-medium text-lg">TRU Fabrics Limited</span> is looking for your queries. be the
                first to let them know your thoughts
            </h3>
        </div>
    );
};

export default EmptyComment;
