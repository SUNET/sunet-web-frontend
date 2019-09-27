const TjanstMetaPerson = ({ tjanst, person }) => {
    if (!tjanst.acf.person[0]) return '';

    return (
        <div className="meta-contact">
            <img 
                src={person.acf.image} 
                alt={`bild på ${person.acf.title.rendered}`} 
            />
            <h2>{ person.title.rendered }</h2>
            <span className="meta-contact--title">{ person.acf.title }</span>
            <div>
                <a className="meta-contact--mail" href={`mailto: ${ person.acf.email }`}>
                    { person.acf.email }
                </a>
            </div>
            <div>
                <a className="meta-contact--phone" href={`tel: ${ person.acf.phone }`}>
                    { person.acf.phone }
                </a>
            </div>
        </div>
    )
}

export default TjanstMetaPerson;