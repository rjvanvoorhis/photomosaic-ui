import React, {Component} from 'react'
import Select from '../components/Select'

const thumbnail = {
    height: 300,
};

const server_name = 'http://localhost:5000/';
const username = 'rjvanvoorhis';


class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            imageSelection: 'https://via.placeholder.com/150',
            path: '',
            tile_directory: 'tile_directories/characters',
            tile_rescale: 1.0,
            method: 'euclid',
            img_type: 'L',
            max_repeats: 0,
            frame_duration: 0.1,
            enlargement: 1,
            fileOptions: [],
            resizeOptions: [],
            tileDirectories: [],
            imageOptions: [],
            gifOptions: [],
            repeatOptions: [],
            methodOptions: []
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleFileOptionChange = this.handleFileOptionChange.bind(this);
        this.handleTileDirectoryChange = this.handleTileDirectoryChange.bind(this);
        this.handleImageResizeChange = this.handleImageResizeChange.bind(this);
        this.handleGifOptionChange = this.handleGifOptionChange.bind(this);
        this.handleImageRepeatsChange = this.handleImageRepeatsChange.bind(this);
    }

    componentDidMount() {
       this.getItems()
    }
    handleFileOptionChange(e) {
        this.setState({
            imageSelection: e.target.value,
            imageUrl: server_name + 'images/' + e.target.value,
        }, () => console.log('you chose ', this.state.imageSelection, 'and ',
            this.state.imageUrl));
    }

    handleTileDirectoryChange(e) {
        this.setState({
            tile_directory: e.target.value,
        }, () => console.log('tile_directory', this.state.tile_directory));
    }

    handleImageResizeChange(e) {
        this.setState({
            enlargement: e.target.value,
        }, () => console.log('enlargement', this.state.enlargement));
    }

    handleImageRepeatsChange(e) {
        this.setState({
            max_repeats: e.target.value,
        }, () => console.log('max_repeats', this.state.max_repeats));
    }

    handleGifOptionChange(e) {
        this.setState({
            frame_duration: e.target.value,
        }, () => console.log('frame duration', this.state.frame_duration));
    }

    getItems() {
        fetch(server_name + 'form_info/' + username)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    description: data.description,
                    fileOptions: data.fileOptions,
                    resizeOptions: data.resizeOptions,
                    tileDirectories: data.tileDirectories,
                    imageOptions: data.imageOptions,
                    gifOptions: data.gifOptions,
                    repeatOptions: data.repeatOptions,
                    methodOptions: data.methodOptions
                }, () => console.log(this));
            });
    }

    handleClearForm(e) {
        e.preventDefault();
        this.getItems();
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const formPayload = {
            enlargement: this.state.enlargement,
            tile_directory: this.state.tile_directory,
            frame_duration: this.state.frame_duration,
            tile_rescale: this.state.tile_rescale,
            img_type: this.state.img_type,
            max_repeats: this.state.max_repeats,
            method: this.state.method,
            path: this.state.imageSelection,
        };

        fetch(server_name + 'galleries/' + username + '/gallery', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formPayload)
        });

        console.log('Send this in a POST request:', formPayload);
        this.handleClearForm(e);
    };

    render() {
        return (
            <form className="container" onSubmit={this.handleFormSubmit}>
                <h5>Pet Adoption Form</h5>
                <img alt="Selected" style={thumbnail} src={this.state.imageUrl}/>
                <Select
                    name={'Image Selection'}
                    placeholder={'Choose an image'}
                    controlFunc={this.handleFileOptionChange}
                    options={this.state.fileOptions}
                    selectedOption={this.state.imageSelection} />
                <Select
                    name={'Rescale'}
                    placeholder={'Select a size'}
                    controlFunc={this.handleImageResizeChange}
                    options={this.state.resizeOptions}
                    selectedOption={this.state.enlargement} />
                <Select
                    name={'Tile Directory'}
                    placeholder={'Select a tile directory'}
                    controlFunc={this.handleTileDirectoryChange}
                    options={this.state.tileDirectories}
                    selectedOption={this.state.tile_directory} />
                <Select
                    name={'Repeats'}
                    placeholder={'Select Image Noise'}
                    controlFunc={this.handleImageRepeatsChange}
                    options={this.state.repeatOptions}
                    selectedOption={this.state.max_repeats} />
                <input
                    type="submit"
                    className="btn btn-primary float-right"
                    value="Submit"/>
                <button
                    className="btn btn-link float-left"
                    onClick={this.handleClearForm}>Clear form</button>
            </form>
        );
    }
}

export default FormContainer;