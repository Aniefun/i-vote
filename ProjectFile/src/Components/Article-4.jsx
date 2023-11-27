
export default function ArticleFour() {
    return (
        <article className="fourth_article">
            <h2>News and Updates</h2>
            <h5>Latest election news and updates for you</h5>
            <div className="news_updates">
                <a href="">
                    <figure style={{ margin: "10px" }}>
                        <img id="first_image" src="/assets/image 22.svg" alt="Voters" />
                        <p></p>
                        <figcaption>
                            Rights and responsibilities of the voter during the upcoming general elections
                        </figcaption>
                    </figure>
                </a>
                <a href="">
                    <figure style={{ margin: "10px" }}>
                        <img src="./assets/image 20.svg" alt="Inec Chairperson" />
                        <p></p>
                        <figcaption>
                            INEC Announces Dates for Edo Governorship Elections
                        </figcaption>
                    </figure>
                </a>
                <a href="">
                    <figure style={{ margin: "10px" }}>
                        <img src="./assets/image 21.svg" alt="PVCs" />
                        <p></p>
                        <figcaption>
                            PVC collection resumes in Bayelsa, Imo and Kogi
                        </figcaption>
                    </figure>
                </a>
            </div>
            <button id="view_more">
                <a>View More</a>
            </button>
        </article>
    );
}
