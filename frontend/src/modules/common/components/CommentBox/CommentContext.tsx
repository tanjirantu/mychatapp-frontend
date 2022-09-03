import React, { RefObject, useRef } from 'react';

interface ICommentContext {
    ref: RefObject<HTMLDivElement>;
    scrollToBottom: () => void;
}

const CommentContext = React.createContext<ICommentContext | null>(null);

const CommentContextProvider = ({ children }: { children: React.ReactChild }) => {
    const ref = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
    };

    const sampleAppContext: ICommentContext = {
        ref: ref,
        scrollToBottom,
    };

    return <CommentContext.Provider value={sampleAppContext}>{children}</CommentContext.Provider>;
};

export const useComment = () => {
    const context = React.useContext(CommentContext);
    if (context === undefined) {
        throw new Error('useCount must be used within a CountProvider');
    }
    return context as ICommentContext;
};

export default CommentContextProvider;
