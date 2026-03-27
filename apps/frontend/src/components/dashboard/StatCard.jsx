import PropTypes from "prop-types";

export const StatCard = ({ title, value }) => {
    console.log("StatCard rendered");
        
  return (
    <div className="bg-white shadow-md rounded-xl p-6 text-center">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
 
  );
};
StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};