import { Box, Typography } from "@mui/material";

const WhoWeAre = () => {
  return (
    <Box
      id="who-we-are-section"
      className="bg-primaryYellow"
      sx={{
        display: "flex",
        alignItems: "stretch",
        borderRadius: "16px",
        overflow: "hidden",
        my: { xs: 3, sm: 4, md: 14 },
      }}
    >
      <Box
        sx={{
          width: "50%",
          minWidth: "50%",
          flex: 1,
          display: { xs: "none", md: "block" },
          backgroundImage: "url(/img-4.png)",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></Box>
      <Box
        sx={{
          widows: { xs: "100%", md: "50%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: { xs: 3, md: 4 },
          p: 4,
        }}
      >
        <h2 className="text-3xl font-bold">Who We Are</h2>
        <p className="text-base font-normalFont">
          At Sukoon Unlimited, we believe in the power of meaningful
          conversations, friendships, and shared joy. We are a community
          designed for seniors, where everyone feels connected, valued, and
          supported. Our platform brings together seniors from across India to
          share their experiences, build lasting friendships, and find a sense
          of belonging. Whether it’s enjoying a chat, learning something new, or
          simply spending time with like-minded people, Sukoon Unlimited is
          where seniors thrive and create joyful moments every day.
        </p>
      </Box>
    </Box>
  );
};

export default WhoWeAre;
