import PropTypes from 'prop-types';

const SectionTitle = ({ heading, subHeding }) => {
    return (
        <div className="mx-auto text-center md:w-4/12 my-8">
            <p className="text-yellow-600 mb-2">~~~ {subHeding} ~~~</p>
            <h3 className="uppercase text-3xl border-y-4 py-4">{heading}</h3>
        </div>
    );
};

SectionTitle.propTypes = {
    heading: PropTypes.any,
    subHeding: PropTypes.any,
}

export default SectionTitle;