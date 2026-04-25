import PropTypes from "prop-types";

export const StatCard = ({ title, value, icon }) => {
    console.log("StatCard rendered");
    const Icon = icon;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4">
      
      {/* Icon */}
    <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md">
      <Icon className="w-5 h-5" />
    </div>

      {/* Text */}
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>

    </div>
  );
 
};
StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.elementType.isRequired,
};