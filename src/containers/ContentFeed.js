import React from 'react'
import ContentItem from '../components/ContentItem'

const server_name = "http://localhost:5000/";
const username = "rjvanvoorhis";

class ContentFeed extends React.Component {
    constructor() {
        super();

        this.state = {
            'items': []
        }
    }
    componentDidMount() {
        this.getItems();
    }

    getItems(){
        fetch(server_name + 'content/users/' + username)
            .then(results => results.json())
            .then(results => this.setState({"items": results }))
    }
    render() {
        return (
            <ul>
                {this.state.items.map(function(item, index) {
                    return <ContentItem item={item} key={index} />
                })}
            </ul>

        );
    }
}

export default ContentFeed