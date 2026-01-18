import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import SliderCard from "./SliderCard";
import { useEffect, useState } from "react";

const testimonials = [
  {
    rating: 5,
    desc: "The platform made it incredibly easy to report and track issues in my area. Updates are real-time, and authorities respond quickly to each report.",
    image: "https://i.pravatar.cc/150?img=1",
    name: "Sarah J.",
    company: "City Council",
  },
  {
    rating: 4,
    desc: "Submitting an issue is simple and transparent. I can see other reports and track the progress, which makes me feel involved in improving our community.",
    image: "https://i.pravatar.cc/150?img=2",
    name: "Amir K.",
    company: "Urban Volunteers",
  },
  {
    rating: 5,
    desc: "I appreciate the accountability this platform brings. Knowing that each issue is tracked encourages me to report problems actively.",
    image: "https://i.pravatar.cc/150?img=3",
    name: "Lina R.",
    company: "Community Watch NGO",
  },
  {
    rating: 4,
    desc: "The system bridges the gap between citizens and municipal staff. I can submit, track, and monitor issues with ease, ensuring timely resolutions.",
    image: "https://i.pravatar.cc/150?img=4",
    name: "Rafiq M.",
    company: "City Development Org",
  },
  {
    rating: 5,
    desc: "Real-time updates and transparency make this platform trustworthy. It empowers citizens to actively participate in community improvement and ensures issues are handled efficiently.",
    image: "https://i.pravatar.cc/150?img=5",
    name: "Tania S.",
    company: "Neighborhood Alliance",
  },
];

const FeedbackSlider = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Swiper
        key={isMobile ? "mobile" : "desktop"}
        direction={isMobile ? "horizontal" : "vertical"}
        slidesPerView={isMobile ? 1 : 3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper lg:h-[560px] h-60"
      >
        {" "}
        {testimonials.map((testimony, i) => (
          <SwiperSlide key={i} className="h-52 flex justify-center">
            <SliderCard testimony={testimony} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default FeedbackSlider;
