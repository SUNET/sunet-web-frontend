import Link from "next/link";

const TjanstLink = ({ tjanst, category }) => {

    function getCategoryName() {
        return category ? category.name : '';
    }

    function getCategorySlugWithSpace() {
        return category ? ` ${category.slug}` : '';
    }

    return (
        <Link href={`/tjanster/${tjanst.slug}`}>
            <a className={`card${getCategorySlugWithSpace()}`} tabIndex={ 0 }>
                <div className="card-tags">
                    <span>{getCategoryName()}</span>
                </div>
                <div className="card-content">
                    <div className="header-container">
                        <h2>{tjanst.title.rendered}</h2>
                    </div>
                    <p className="card-intro">{tjanst.acf.intro}</p>
                </div>
            </a>
        </Link>
    )
}

export default TjanstLink;