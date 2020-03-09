import * as React from 'react';

type Content = string[];

type Props = {
    title: string
};

type State = {
    content: Content | null,
};

class ClassComponent extends React.PureComponent<Props, State> {
    state: State;
    props: Props;

    constructor(props) {
        super(props);
        this.state = {
            content: null
        };
    }

    render() {
        const {title} = this.props;
        const {content} = this.state;
        return (
            <article>
                <h3>{title}</h3>
                {content}
            </article>
        );
    }
}

export default ClassComponent;
