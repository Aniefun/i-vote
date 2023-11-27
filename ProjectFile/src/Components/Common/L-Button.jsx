import PropTypes from 'prop-types';

export default function LButton({ onClick }) {
    return (
        <div><button className="login_home_page" onClick={onClick}>Login</button></div>
    )
}
LButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};
