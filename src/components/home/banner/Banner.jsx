import { useEffect, useState, createContext, useContext } from "react";
import { motion } from "framer-motion";
import { Radar, ArrowRight } from "lucide-react";
import useEditorMode from "../../../hooks/page builder/useEditorMode";
import useAxios from "../../../hooks/auth & role/useAxios";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import Swal from "sweetalert2";
import HomeNavbar from "../../common/navbar/HomeNavbar";
import CTA from "./CTA";
import toast from "react-hot-toast";

// Create context for Banner data
const BannerSectionContext = createContext();

export const useBannerSectionData = () => {
  const context = useContext(BannerSectionContext);
  if (!context) {
    throw new Error(
      "useBannerSectionData must be used within BannerSectionProvider"
    );
  }
  return context;
};

const pulseVariants = {
  animate: {
    scale: [1, 2.5],
    opacity: [0.6, 0],
  },
};

const Banner = () => {
  const [bannerData, setBannerData] = useState({
    content: {
      mainHeading: "The City",
      highlightText1: "Speaks.",
      highlightText2: "Listen.",
      description:
        "A living civic intelligence system that tracks, visualizes, and resolves urban issues in real time — powered by community data.",
      primaryButtonText: "Explore Issues",
      secondaryButtonText: "Report an Issue",
      stat1Value: "2.4K+",
      stat1Label: "Issues Tracked",
      stat2Value: "87%",
      stat2Label: "Resolution Rate",
    },
    styles: {
      mainHeading: {
        fontSize: "text-4xl md:text-5xl",
        fontWeight: "font-extrabold",
        color: "text-white",
        textAlign: "leading-tight",
      },
      highlightText1: {
        color: "text-blue-400",
      },
      highlightText2: {
        color: "text-purple-400",
      },
      description: {
        fontSize: "text-lg",
        color: "text-gray-400",
        maxWidth: "max-w-xl",
      },
    },
  });
  const [scrolled, setScrolled] = useState(false);
  const { editMode } = useEditorMode();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 400 ? setScrolled(true) : setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchBannerSection = async () => {
      try {
        const { data } = await axiosInstance.get("/contents/banner-section");
        if (data?.message) {
          setBannerData(data.message);
          //console.log("bannerData", data.message);
        }
      } catch (err) {
        toast.error("Failed to fetch banner section:", err);
      }
    };
    fetchBannerSection();
  }, [axiosInstance]);
  //console.log("bannerData2", bannerData);
  const handleSave = async () => {
    try {
      //console.log("Banner data to save:", bannerData);
      const payload = {
        content: bannerData.content,
        styles: bannerData.styles,
      };

      await axiosSecure.patch("/contents/banner-section", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      await Swal.fire({
        timer: 2000,
        position: "center",
        icon: "success",
        title: "Banner section updated successfully!",
        showConfirmButton: false,
      });
    } catch (err) {
      //console.error("Failed to save banner section:", err);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to save banner section",
        text: "Please try again later",
        showConfirmButton: true,
      });
    }
  };

  const updateContent = (field, value) => {
    setBannerData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value,
      },
    }));
  };

  const updateStyle = (element, property, value) => {
    setBannerData((prev) => ({
      ...prev,
      styles: {
        ...prev.styles,
        [element]: {
          ...prev.styles[element],
          [property]: value,
        },
      },
    }));
  };

  // Helper function to generate className from styles
  const getClassName = (element) => {
    const style = bannerData.styles[element];
    if (!style) return "";

    return [
      style.fontSize,
      style.fontWeight,
      style.textAlign,
      style.color,
      style.padding,
      style.margin,
      style.maxWidth,
    ]
      .filter(Boolean)
      .join(" ");
  };

  // Store data and functions in window for BannerEditor access
  useEffect(() => {
    window.bannerSectionData = {
      bannerData,
      updateContent,
      updateStyle,
      handleSave,
    };
  }, [bannerData]);

  return (
    <BannerSectionContext.Provider
      value={{ bannerData, updateContent, updateStyle, handleSave }}
    >
      <section className="relative overflow-hidden border border-gray-800 bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#0b1020] lg:h-[95vh] mb-24">
        {/* Animated Background Glow */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.12),transparent_40%)]"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <header className="fixed pt-2 left-0 top-0 z-[200] w-full">
          <div
            className={`container mx-auto lg:px-6 rounded-full w-full z-50 ${
              scrolled
                ? "bg-black/40 backdrop-blur-xl"
                : "bg-white/40 backdrop-blur-xl"
            }`}
          >
            <HomeNavbar variant="home" />
          </div>
        </header>
        {/* Content */}
        <div className="relative z-10 grid md:grid-cols-2 gap-10 p-10 md:p-16 items-center mt-20">
          {/* LEFT */}
          <div className="space-y-6">
            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className={getClassName("mainHeading")}
            >
              {bannerData.content.mainHeading || "The City"}{" "}
              <span className={getClassName("highlightText1")}>
                {bannerData.content.highlightText1 || "Speaks."}
              </span>
              <br />
              We{" "}
              <span className={getClassName("highlightText2")}>
                {bannerData.content.highlightText2 || "Listen."}
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className={getClassName("description")}
            >
              {bannerData.content.description ||
                "A living civic intelligence system that tracks, visualizes, and resolves urban issues in real time — powered by community data."}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 pt-4 flex-col lg:flex-row"
            >
              <CTA
                text={bannerData.content.primaryButtonText || "Explore Issues"}
              />

              <a
                href="#city-pulse"
                className="px-4 py-2 rounded-full w-48 border border-gray-700 text-gray-300 hover:border-indigo-500 transition flex justify-center items-center"
              >
                {bannerData.content.secondaryButtonText || "Report an Issue"}
              </a>
            </motion.div>

            {/* Micro Stats */}
            <div className="flex gap-6 pt-6">
              <div>
                <div className="text-2xl font-bold text-white">
                  {bannerData.content.stat1Value || "2.4K+"}
                </div>
                <div className="text-xs text-gray-500 uppercase">
                  {bannerData.content.stat1Label || "Issues Tracked"}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {bannerData.content.stat2Value || "87%"}
                </div>
                <div className="text-xs text-gray-500 uppercase">
                  {bannerData.content.stat2Label || "Resolution Rate"}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Sonar / City Radar */}
          <div className="relative h-[320px] flex items-center justify-center">
            {/* Radar Core */}
            <div className="relative w-40 h-40 rounded-full bg-indigo-500/10 border border-indigo-400/30 flex items-center justify-center">
              <Radar className="text-indigo-400 w-10 h-10 z-10" />

              {/* Sonar Waves */}
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  variants={pulseVariants}
                  animate="animate"
                  transition={{
                    duration: 4,
                    delay: i * 1.2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 rounded-full border border-indigo-400"
                />
              ))}
            </div>

            {/* Floating Issue Pings */}
            {[
              { top: "20%", left: "65%" },
              { top: "65%", left: "25%" },
            ].map((pos, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.3 }}
                className="absolute"
                style={pos}
              >
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_12px_#ef4444]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </BannerSectionContext.Provider>
  );
};

export default Banner;
