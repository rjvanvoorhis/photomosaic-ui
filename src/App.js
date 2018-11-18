import React, { Component } from 'react';
import './styles.css';
import FormContainer from './containers/FormContainer';
import ContentFeed from './containers/ContentFeed';

import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';


const user = 'rjvanvoorhis';

class App extends Component {
    render() {
        return (
             <div id="content">
                 <div id="left">
                     <ContentFeed/>
                 </div>
                 <div id="right">
                     <FormContainer/>
                     <FilePond
                         server= {"http://localhost:5000/uploads/users/"+ user+ "/files"}
                         name="file"
                     />
                 </div>
             </div>
/*            <div className="container">
                <div className="columns">
                    <div className="col-md-9 centered">
                        <h3>React.js Controlled Form Components</h3>
                        <ContentFeed />
                        <FormContainer />
                    </div>
                </div>
            </div>*/
        );
    }
}

export default App;
