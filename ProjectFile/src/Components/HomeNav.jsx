import RButton from "./Common/GlobalButton"
import LButton from "./Common/L-Button"
import { useNavigate } from "react-router-dom"
export default function HomeNav() {

    const navigate = useNavigate();
    const loginClicked = () => {
        navigate('/login');
    }
    return (

        <nav className="navigation_bar">
            <div>
                <img src="/assets/logo (1) 1.svg" alt="INEC" />
            </div>
            <div className="tabs">
                <div className="homeNav"><a href="">Home</a></div>
                <div className="aboutNav"><a href="">About</a></div>
                <div className="blogNav"><a href="">Blog</a></div>
                <div className="tokensNav"><a href="">Tokens</a></div>
                <div className="contact_usNav"><a href="">Contact Us</a></div>
            </div>
            <div className="login_register_tab">
                <div className="dropdown">
                    <select name="languages" id="lang">
                        <option value="english">English</option>
                        <option value="hausa">Hausa</option>
                        <option value="igbo">Igbo</option>
                        <option value="yoruba">Yoruba</option>
                    </select>
                </div>
                <LButton onClick={loginClicked} />
                <RButton title="Register" />

            </div>
        </nav>
    )
}