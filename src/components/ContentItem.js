import React from 'react';

class ContentItem extends React.Component{

    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        return (
            <div>
                <img onClick={this.handleClick}
                     src={this.state.isToggleOn ? this.props.item.image : this.props.item.gif_url}
                     alt={this.props.item.title}
                />
            </div>
        );
    }
}

export default ContentItem;