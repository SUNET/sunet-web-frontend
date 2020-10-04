import React, { Component } from 'react';
import { MdAdd, MdRemove } from 'react-icons/md';

class Accordion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            elementDefaultHeight: '0px',
            elementFullHeight: '0px',
            isOpen: false
        }
        this.accordionRef = React.createRef();
    }

    componentDidMount () {
        const element = this.accordionRef.current;
        const elementDefaultHeight = getComputedStyle(element).height;
        const elementFullHeight = element.scrollHeight + 'px';

        this.setState({ 
            elementDefaultHeight,
            elementFullHeight
        });
    }

    onOpenClose = () => {
        this.state.isOpen ? this.close() : this.open();
    }

    open() {
        this.setState({ isOpen: true });
        const element = this.accordionRef.current;
        element.style.height = this.state.elementFullHeight;
    }

    close() {
        this.setState({ isOpen: false });
        const element = this.accordionRef.current;
        element.style.height = this.state.elementDefaultHeight;
    }

    handleKeyPress = e => {
        if(e.key === 'Enter') this.onOpenClose();
    }

    render () {
        const { isOpen } = this.state;
        const { title, text } = this.props;
        const tabIndex = isOpen ? "": { "aria-hidden": true, tabIndex: -1 }

        return (
            <div 
                className={ `accordion${ isOpen ? ' open' : '' }` } 
                onClick={ this.onOpenClose } 
                onKeyPress={ this.handleKeyPress }
                ref={ this.accordionRef }
            >
                <div className="top">
                    <div>{ title }</div>
                    { isOpen ? <MdRemove aria-label="Dölj text" /> : <MdAdd aria-label="Visa text" /> }
                </div>
               <div {...tabIndex} dangerouslySetInnerHTML={{ __html: text }} />
            </div>
        )
    }
}

export default Accordion;