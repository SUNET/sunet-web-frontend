import ProjektMetaPerson from './ProjektMetaPerson.js';
import ProjektMetaWiki from './ProjektMetaWiki.js';

const ProjektMeta = ({ projekt, person }) => {

    return (
        <div className="service">
            <ProjektMetaPerson
                projekt={ projekt }
                person={ person }
            />
        </div>
    )
}

export default ProjektMeta;
