export default ({ projekt }) => {
    if (!projekt.acf.segment_price) return '';

    return (
        <div className="meta-price">
            <h2>Pris</h2>
            <div 
                dangerouslySetInnerHTML={ { __html: projekt.acf.segment_price } } 
            />
        </div>
    )
}
