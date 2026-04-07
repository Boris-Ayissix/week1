import profileImage from "../../assets/Boris-profile.png";

const ProfileCard = () => {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 w-80 text-center">
      
      <img
        src={profileImage}
        alt="profile"
        
      />

      <h2 className="text-xl font-semibold">Boris Ayissi</h2>

      <p className="text-sm text-gray-600 mt-2">
        Builds fast, simple web apps that help businesses grow
      </p>

      <p className="text-xs text-gray-500 mt-2">
        From idea to live product — simple, fast, reliable
      </p>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
          20+ Projects
        </span>
        <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
          10+ Clients
        </span>
        <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
          Trusted and Reliable
        </span>
         <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
          Multi-Industry Experience
        </span>
      </div>
    </div>
  );
};


export default ProfileCard;