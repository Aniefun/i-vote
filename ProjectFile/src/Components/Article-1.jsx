import Button from "./Common/GlobalButton";
export default function ArticleOne() {
    const ButtonStyle = {
        paddingRight: '11rem',
        paddingTop: '3.5rem'

    }
    return (
        <article className="first_article">
            <div className="fa_left">
                <div>
                    <h1 className="fa_heading">Blockchain Voting System</h1>
                    <div className="fa_subheading">Welcome to the Future of Democracy! Our blockchain voting platform ensures a revolutionary, secure, and transparent voting experience. Your voice matters, and we have crafted a cutting-edge solution to safeguard your democratic rights.</div>
                </div>
                <div style={ButtonStyle}>
                    <Button title="Cast Vote" style={ButtonStyle} />
                </div>
            </div>
            <div className="fa_right"></div>
        </article>
    );
}
