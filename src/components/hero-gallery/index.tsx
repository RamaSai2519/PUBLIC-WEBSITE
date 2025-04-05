import React from "react";

const HeroGallery = () => {
  const bgSettings = {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="inline-flex grid-cols-1 gap-2 m-auto size-60">
      <div
        className="rounded-sm w-full"
        style={{
          backgroundImage: "url(/main-background-light.png)",
          ...bgSettings,
        }}
      />
      
    </div>
  );
};

export default HeroGallery;
