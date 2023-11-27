import PropTypes from 'prop-types';
export default function Button({ title }) {
    return (
        <div><button className="register_home_page">{title}</button></div>
    )
}
Button.propTypes = {
    title: PropTypes.string.isRequired,
};