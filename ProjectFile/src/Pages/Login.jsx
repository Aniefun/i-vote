export default function Login() {
    return (
        <>
            <header>
                <img id="inec_logo" src="./assets/logo (1) 1.svg" alt="" />
            </header>
            <main>
                <h2 className="h2-login">LOGIN</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input type="email" id="email" name="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <div className="forgotten_password">Forgot your password?</div>
                    <button type="submit" className='loginpage-button'>Login to your account</button>
                </form>
            </main>
            <div className="register">
                <a href="./">Don&apos;t have an account? Register</a>
            </div>
        </>
    );
}
