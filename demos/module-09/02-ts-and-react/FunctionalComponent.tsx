import * as React from 'react';

type Props = {
    title: string
};

const FunctionalComponent: React.FC<Props> = ({title, children}) => {
    return (
        <article>
            <h3>{title}</h3>
            {children}
        </article>
    );
};

export default FunctionalComponent;
