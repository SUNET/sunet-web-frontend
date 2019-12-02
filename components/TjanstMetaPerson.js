const TjanstMetaPerson = ({ person }) => {
    if (!person || !person.acf) return null;

    return (
        <div className="meta-contact">
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