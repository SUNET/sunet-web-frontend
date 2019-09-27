import ExternalHref from '../components/ExternalHref.js';

const TjanstRelatedLinks = ({ tjanst }) => {
    if (!tjanst.acf.links) return '';

    function renderLinks() {
        return tjanst.acf.links.map(item => (
            <li key={ item.name }>
                { item.name }: 
                <ExternalHref
                    href={`http://${ item.url }`}
                    text={ item.url }
                />
            </li>
        ))
    }

    return (
        <div className="container-fluid related-segment bg-orange">
            <div className="row justify-content-center">
                <div className="col-lg-7">
                    <h2>Relaterade länkar</h2>
                    <ul>
                        { renderLinks() }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TjanstRelatedLinks;