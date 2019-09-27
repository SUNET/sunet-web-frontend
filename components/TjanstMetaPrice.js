export default ({ tjanst }) => {
    if (!tjanst.acf.segment_price) return '';

    return (
        <div className="meta-price">
            <h2>Pris</h2>
            <div 
                dangerouslySetInnerHTML={ { __html: tjanst.acf.segment_price } } 
            />
        </div>
    )
}