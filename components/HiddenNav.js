import { Component } from 'react';

/*
    The hidden navigation will be shown on focus (using tab).
    Add the attribute 'data-hidden-nav-name' to the element/s
    you wish to be available to navigate to with the hidden nav.
*/

class HiddenNav extends Component {

    state = {
        elements: [],
        isOpen: false
    }

    componentDidMount() {
        const elements = Array.from(
            document.querySelectorAll('[data-hidden-nav-name]')
        );
        this.setState({ elements });
    }

    handleOnFocus = () => this.setState({ isOpen: true });

    handleOnBlur = () => {
        setTimeout(() => {
            const child = document.querySelector('.hidden-nav a:focus');
            if (!child) this.onClose(); 
        }, 0)
    }

    handleOnHrefClick = (event, element) => {
        event.preventDefault();

        element.scrollIntoView({ behavior: 'smooth' });
        this.onClose();
    }

    onClose = () => this.setState({ isOpen: false });

    setHrefElements() {
        return this.state.elements.map((element, index) => (
            <a 
                href=""
                key={index} 
                onFocus={index === 0 ? this.handleOnFocus : null}
                onBlur={this.handleOnBlur}
                onClick={event => this.handleOnHrefClick(event, element)}
            >
                { element.getAttribute('data-hidden-nav-name') }
            </a>
        ));
    }

    render() {
        if (this.state.elements.length === 0) return null;

        return (
            <div className={`hidden-nav${this.state.isOpen ? ' open' : ''}`}>
                { this.setHrefElements() }
            </div>
        )
    }
}

export default HiddenNav;