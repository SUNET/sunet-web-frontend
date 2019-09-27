import { MdLaunch } from 'react-icons/md';

export default props => {
    return (
        <a 
            className="external" 
            href={props.href} 
            target="_blank"
        >
            { props.text } <MdLaunch />
        </a>
    )
}