import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import SliderCard from "./SliderCard";

const testimonials = [
  {
    rating: 5,
    desc: "The platform made it incredibly easy to report and track issues in my area. Updates are real-time, and I feel confident that authorities respond quickly to each report.",
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
    desc: "I appreciate the accountability this platform brings. Knowing that each issue is tracked encourages me to report problems actively and participate in better neighborhood management.",
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
  return (
    <>
      <Swiper
        direction="vertical"
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper h-full"
      >
        {" "}
        {testimonials.map((testimony, i) => (
          <SwiperSlide key={i}>
            <SliderCard testimony={testimony} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default FeedbackSlider;
