import { useEffect, useState } from "react";
import bannerImg from "../../../assets/banner.png";
import HomeNavbar from "../../common/navbar/HomeNavbar";
import BannerHeading from "./BannerHeading";
import CTA from "./CTA";
import RightCard from "./RightCard";
import UserStat from "./UserStat";
import useEditorMode from "../../../hooks/page builder/useEditorMode";
import useAxios from "../../../hooks/auth & role/useAxios";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import Swal from "sweetalert2";

const Banner = () => {
  const [banner, setBanner] = useState({
    content: {
      title: "",
      paragraph: "",
      ctaText: "",
      ctaLink: "",
      issueResolved: "",
      issuesReported: "",
    },
    styles: {
      title: {
        fontSize: "text-5xl",
        fontWeight: "font-black",
        color: "text-white",
      },
      paragraph: {
        fontSize: "text-lg md:text-xl",
        color: "text-white",
      },
    },
  });

  const { editMode } = useEditorMode();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const { data } = await axiosInstance.get("/contents/banners");
        if (data?.message) {
          // Transform old format to new format
          const transformedData = {
            content: {
              title: data.message.title || "",
              paragraph: data.message.paragraph || "",
              ctaText: data.message.ctaText || "",
              ctaLink: data.message.ctaLink || "",
              issueResolved: data.message.issueResolved || "",
              issuesReported: data.message.issuesReported || "",
            },
            styles: data.message.styles || {
              title: {
                fontSize: "text-5xl",
                fontWeight: "font-black",
                color: "text-white",
              },
              paragraph: {
                fontSize: "text-lg md:text-xl",
                color: "text-white",
              },
            },
          };
          setBanner(transformedData);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchBanner();
  }, [axiosInstance]);

  const handleSave = async () => {
    try {
      const payload = {
        title: banner.content.title,
        paragraph: banner.content.paragraph,
        ctaText: banner.content.ctaText,
        ctaLink: banner.content.ctaLink,
        issueResolved: banner.content.issueResolved,
        issuesReported: banner.content.issuesReported,
        userStats: banner.content.userStats,
        styles: banner.styles,
      };

      await axiosSecure.patch("/contents/banners", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      await Swal.fire({
        timer: 2000,
        position: "center",
        icon: "success",
        title: "Banner saved successfully!",
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to save banner",
        text: "Please try again later",
        showConfirmButton: true,
      });
    }
  };

  const updateContent = (field, value) => {
    setBanner((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value,
      },
    }));
  };

  const updateStyle = (element, property, value) => {
    setBanner((prev) => ({
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
    const style = banner.styles[element];
    if (!style) return "";

    return [
      style.fontSize,
      style.fontWeight,
      style.textAlign,
      style.color,
      style.padding,
      style.margin,
    ]
      .filter(Boolean)
      .join(" ");
  };

  // Store data and functions in window for BannerEditor access
  useEffect(() => {
    window.bannerData = {
      bannerData: banner,
      updateContent,
      updateStyle,
      handleSave,
    };
  }, [banner]);
  //console.log(banner);
  return (
    <section
      className="relative w-full bg-cover bg-center lg:mb-16 md:mb-20 mb-24 object-cover py-24"
      style={{
        backgroundImage: `url(${bannerImg})`,
      }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40"></div>
      <header className="fixed pt-2 left-0 top-0 z-[200] w-full">
        <div className="container mx-auto lg:px-6 rounded-full bg-black/40 backdrop-blur-xl  w-full z-50">
          <HomeNavbar variant="home" />
        </div>
      </header>
      <BannerHeading />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-8 md:px-16 pt-16 md:text-left text-center">
        {/* Left Content - Display Only */}
        <div className="text-white mb-8 md:mb-0 space-y-4">
          <p className={`tracking-tighter ${getClassName("title")}`}>
            {banner.content.title || "Your Banner Title Here"}
          </p>

          <p className={getClassName("paragraph")}>
            {banner.content.paragraph || "Your banner description goes here"}
          </p>

          <CTA
            text={banner.content.ctaText || "Get Started"}
            link={banner.content.ctaLink || "#"}
          />
        </div>

        {/* Right Content - Display Only */}
        <div className="text-white flex flex-col gap-4 md:items-end items-center">
          {/* Issue stats */}
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex flex-col text-center bg-white rounded-4xl p-4 w-48">
              <h3 className="text-4xl text-black font-bold text-center">
                {banner.content.issueResolved || "0"}
              </h3>
              <p className="text-center text-black font-semibold">
                Issues resolved <br /> last month
              </p>
            </div>

            {/* Issues Reported */}
            <div className="px-8 py-4 bg-white rounded-4xl">
              <div>
                <h3 className="text-4xl text-black font-bold text-center">
                  {banner.content.issuesReported || "0"}
                </h3>
                <p className="text-center text-black font-semibold">
                  Issues <br /> reported
                </p>
              </div>
            </div>
          </div>
          {/* user stats */}
          <UserStat />
        </div>
      </div>
    </section>
  );
};

export default Banner;
