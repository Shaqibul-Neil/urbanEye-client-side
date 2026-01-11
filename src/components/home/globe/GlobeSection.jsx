import { useEffect, useState } from "react";
import { Link } from "react-router";
import globe from "../../../assets/globe.png";
import CTA from "../banner/CTA";
import useEditorMode from "../../../hooks/page builder/useEditorMode";
import useAxios from "../../../hooks/auth & role/useAxios";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const GlobeSection = () => {
  const [globeData, setGlobeData] = useState({
    content: {
      mainTitle: "",
      subtitle: "",
      description: "",
      ctaText: "",
      ctaLink: "",
    },
    styles: {
      mainTitle: {
        fontSize: "md:text-5xl text-4xl",
        fontWeight: "font-bold",
        color: "text-white",
        textAlign: "text-center",
      },
      subtitle: {
        fontSize: "md:text-5xl text-4xl",
        fontWeight: "font-bold",
        color: "text-white",
        textAlign: "text-center",
      },
      description: {
        fontSize: "",
        color: "text-white/80",
        textAlign: "text-center",
      },
    },
  });

  const { editMode } = useEditorMode();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchGlobeSection = async () => {
      try {
        const { data } = await axiosInstance.get("/contents/globe-section");
        if (data?.message) {
          setGlobeData(data.message);
        }
      } catch (err) {
        toast.error("Failed to fetch globe section:", err);
      }
    };
    fetchGlobeSection();
  }, [axiosInstance]);

  const handleSave = async () => {
    try {
      const payload = {
        content: globeData.content,
        styles: globeData.styles,
      };

      await axiosSecure.patch("/contents/globe-section", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      await Swal.fire({
        timer: 2000,
        position: "center",
        icon: "success",
        title: "Globe section saved successfully!",
        showConfirmButton: false,
      });
    } catch (err) {
      //console.error("Failed to save globe section:", err);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to save globe section",
        text: "Please try again later",
        showConfirmButton: true,
      });
    }
  };

  const updateContent = (field, value) => {
    setGlobeData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value,
      },
    }));
  };

  const updateStyle = (element, property, value) => {
    setGlobeData((prev) => ({
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
    const style = globeData.styles[element];
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

  // Store data and functions in window for GlobeSectionEditor access
  useEffect(() => {
    window.globeSectionData = {
      globeData,
      updateContent,
      updateStyle,
      handleSave,
    };
  }, [globeData]);

  return (
    <>
      <div className="mx-auto md:w-[550px] w-full bg-white rounded-full md:h-[450px] h-84 flex justify-center items-center absolute -top-60 left-1/2 -translate-x-1/2">
        <div className="flex justify-center items-center">
          <img src={globe} alt="" className="w-full slow-rotate" />
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 lg:w-1/2 w-full space-y-4 px-5">
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }} // Automatic trigger
          viewport={{ once: true, amount: 0.3 }} // 30% screen trigger
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={getClassName("mainTitle")}
        >
          {globeData.content.mainTitle || "Urban Issues"}
          <br />
          {globeData.content.subtitle || "Shared Citizen Solutions"}
        </motion.h2>
        <motion.p
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className={getClassName("description")}
        >
          {globeData.content.description ||
            "URBANi empowers citizens to highlight issues, collaborate with neighbors, and see real solutions unfold. Together, we transform our city—one report, one upvote at a time."}
        </motion.p>
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex justify-center items-center rounded-full h-16"
        >
          <CTA
            text={globeData.content.ctaText || "Explore Issue"}
            link={globeData.content.ctaLink || "/all-issues"}
          />
        </motion.div>
      </div>
    </>
  );
};

export default GlobeSection;
