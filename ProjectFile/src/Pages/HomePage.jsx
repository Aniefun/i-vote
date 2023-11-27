import HomeNav from "../Components/HomeNav";
import ArticleOne from "../Components/Article-1";
import ArticleTwo from "../Components/Article-2";
import ArticleThree from "../Components/Article-3";
import ArticleFour from "../Components/Article-4";
import Footer from "../Components/Common/Footer";

export default function HomePage() {
    return (
        <div className="homepage">
            <HomeNav />
            <ArticleOne />
            <ArticleTwo />
            <ArticleThree />
            <ArticleFour />
            <Footer />
        </div>
    )
}