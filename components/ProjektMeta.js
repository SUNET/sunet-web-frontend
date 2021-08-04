import ProjektMetaPerson from './ProjektMetaPerson.js';
import ProjektMetaWiki from './ProjektMetaWiki.js';
import ProjektMetaPrice from './ProjektMetaPrice.js';

const ProjektMeta = ({ projekt, person }) => {

    return (
        <div className="service">
            <ProjektMetaPerson
                projekt={ projekt }
                person={ person }
            />
            <ProjektMetaWiki 
                projekt={ projekt } 
            />
            <ProjektMetaPrice 
                projekt={ projekt } 
            />
        </div>
    )
}

export default ProjektMeta;
