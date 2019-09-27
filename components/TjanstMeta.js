import TjanstMetaPerson from './TjanstMetaPerson.js';
import TjanstMetaWiki from './TjanstMetaWiki.js';
import TjanstMetaPrice from './TjanstMetaPrice.js';

const TjanstMeta = ({ tjanst, person }) => {

    return (
        <div className="service">
            <TjanstMetaPerson
                tjanst={ tjanst }
                person={ person }
            />
            <TjanstMetaWiki 
                tjanst={ tjanst } 
            />
            <TjanstMetaPrice 
                tjanst={ tjanst } 
            />
        </div>
    )
}

export default TjanstMeta;