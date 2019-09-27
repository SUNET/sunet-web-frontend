export default ({ tjanst }) => {
    if (!tjanst.acf.segment_support) return '';

    return (
        <div className="meta-wiki">
            <h2>Support, teknisk dokumentation, wiki</h2>
            <div 
                dangerouslySetInnerHTML={ { __html: tjanst.acf.segment_support } } 
            />
        </div>
    )
}