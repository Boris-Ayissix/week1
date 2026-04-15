import profileImage from "../../assets/Boris-profile.png";

const ProfileCard = () => {
  return (
    /**
     * OUTER CONTAINER
     * - relative → defines positioning boundary
     *
     *  
     * GROUP WRAPPER
     * Enables synchronized hover effects
     */
    
    <div className="relative bg-white shadow-xl rounded-2xl p-6 w-80 text-center group">
      

    {/* ========================= */}
      {/* GLOW EFFECT (BACKGROUND) */}
      {/* ========================= */}
      {/* <div className="
        absolute 
        w-40 h-40 
        rounded-full 
        bg-gradient-to-r from-purple-200 to-pink-200 
        blur-2xl 
        opacity-30 
        animate-glow
        transition-all duration-500
        group-hover:scale-110
        group-hover:opacity-80
        " />     */}

    {/* ========================= */}
      {/* PROFILE CARD */}
      {/* - Added relative wrapper
          - Added group hover for coordinated animations
          - Added micro-interactions (scale + glow)
      {/* ========================= */}
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full text-center z-10
      transition-all duration-300
      group-hover:scale-105
      group-hover:shadow-2xl">

        {/* IMAGE */}
      <img
        src={profileImage}
        alt="profile"
        className=" rounded-xl mb-4"
      />
        {/* NAME */}
        <h2 className="text-xl font-semibold">Boris Ayissi</h2>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-600 mt-2">
          Builds fast, simple web apps that help businesses grow
        </p>

        <p className="text-xs text-gray-500 mt-2">
          From idea to live product — simple, fast, reliable
        </p>
      </div>

      {/* ========================= */}
      {/* FLOATING FUN FACTS */}
      {/* ========================= */}

      {/* TOP LEFT */}

      <div className="absolute -top-6 -left-6
    bg-white shadow-md px-3 py-1 rounded-full text-xs
      transition-all duration-300
      group-hover:scale-110 group-hover:shadow-xl">
            500+ Helped
      </div>

      {/* TOP RIGHT */}
      <div className="absolute -top-6 -right-6
    bg-white shadow-md px-3 py-1 rounded-full text-xs
      transition-all duration-300
      group-hover:scale-110 group-hover:shadow-xl">
            10+ Industries
      </div>

      {/* BOTTOM LEFT */}      
      <div className=" absolute -bottom-6 -left-6
    bg-white shadow-md px-3 py-1 rounded-full text-xs
      transition-all duration-300
      group-hover:scale-110 group-hover:shadow-xl">
              100+ Projects
      </div>
      
      {/* BOTTOM RIGHT */}

      <div className="absolute -bottom-6 -right-6
    bg-white shadow-md px-3 py-1 rounded-full text-xs
      transition-all duration-300
      group-hover:scale-110 group-hover:shadow-xl">

      80% Return Clients
      </div>
    </div>
  );
};


export default ProfileCard;