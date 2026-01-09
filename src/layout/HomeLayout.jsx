import Footer from "../components/common/footer/Footer";
import Banner from "../components/home/banner/Banner";
import Home from "../pages/home/Home";

const HomeLayout = () => {
  return (
    <div>
      {/* Navbar + Banner together */}
      <section className="relative">
        <Banner />
        <Home />
      </section>
      <Footer />
    </div>
  );
};

export default HomeLayout;
