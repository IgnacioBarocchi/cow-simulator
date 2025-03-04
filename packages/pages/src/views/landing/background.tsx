import { Box } from "@mono/ui";
import landingVideo from "/videos/landing-video.mkv?url";

const Background = () => (
  <>
    <Box
      fill
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -2,
        overflow: "hidden",
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(10px)",
        }}
      >
        <source src={landingVideo} type="video/mp4" />
      </video>
    </Box>

    <Box
      fill
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(0deg, rgba(0,0,0,1) 10%, rgba(255,255,255,0) 50%, rgba(0,0,0,1) 90%)",
        zIndex: -1,
      }}
    />
  </>
);

export default Background;
// import landingImage from "/images/landing-image.jpg";
// import landingVideo from "/images/landing-video.mkv";

// const Background = () => (
//   <>
//     <Box
//       fill
//       style={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         background: `url(${landingImage}) center/cover no-repeat`,
//         filter: "blur(10px)",
//         zIndex: -2,
//       }}
//     />

//     <Box
//       fill
//       style={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         background:
//           "linear-gradient(0deg, rgba(0,0,0,1) 10%, rgba(255,255,255,0) 50%, rgba(0,0,0,1) 90%)",
//         zIndex: -1,
//       }}
//     />
//   </>
// );

// export default Background;
