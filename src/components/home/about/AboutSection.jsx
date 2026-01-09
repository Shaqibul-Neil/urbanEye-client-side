import { useEffect, useState, createContext, useContext } from "react";
import ppl from "../../../assets/ppl.jpg";
import hand from "../../../assets/hand.jpg";
import student from "../../../assets/student.jpg";
import skyline from "../../../assets/skyline.jpg";
import useEditorMode from "../../../hooks/page builder/useEditorMode";
import useAxios from "../../../hooks/auth & role/useAxios";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import Swal from "sweetalert2";

// Create context for AboutSection data
const AboutSectionContext = createContext();

export const useAboutSectionData = () => {
  const context = useContext(AboutSectionContext);
  if (!context) {
    throw new Error(
      "useAboutSectionData must be used within AboutSectionProvider"
    );
  }
  return context;
};

const AboutSection = () => {
  const [aboutData, setAboutData] = useState({
    content: {
      mainHeading: "",
      highlightText: "",
      paragraph1: "",
      paragraph2: "",
      strongText: "",
    },
    styles: {
      mainHeading: {
        fontSize: "text-3xl md:text-5xl",
        fontWeight: "font-extrabold",
        textAlign: "text-right",
        color: "text-primary",
        padding: "",
        margin: "",
      },
      highlightText: {
        color: "text-secondary",
      },
      paragraph1: {
        fontSize: "",
        color: "text-gray-700",
        textAlign: "text-right",
        padding: "",
        margin: "",
      },
      paragraph2: {
        fontSize: "",
        color: "text-gray-700",
        textAlign: "text-right",
        padding: "pl-14",
        margin: "",
      },
    },
  });

  const { editMode } = useEditorMode();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchAboutSection = async () => {
      try {
        const { data } = await axiosInstance.get("/contents/about-section");
        if (data?.message) {
          setAboutData(data.message);
        }
      } catch (err) {
        console.error("Failed to fetch about section:", err);
      }
    };
    fetchAboutSection();
  }, [axiosInstance]);

  const handleSave = async () => {
    try {
      const payload = {
        content: aboutData.content,
        styles: aboutData.styles,
      };

      await axiosSecure.patch("/contents/about-section", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      await Swal.fire({
        timer: 2000,
        position: "center",
        icon: "success",
        title: "About section saved successfully!",
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Failed to save about section:", err);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to save about section",
        text: "Please try again later",
        showConfirmButton: true,
      });
    }
  };

  const updateContent = (field, value) => {
    setAboutData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value,
      },
    }));
  };

  const updateStyle = (element, property, value) => {
    setAboutData((prev) => ({
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
    const style = aboutData.styles[element];
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

  // Store data and functions in window for AboutSectionEditor access
  useEffect(() => {
    window.aboutSectionData = {
      aboutData,
      updateContent,
      updateStyle,
      handleSave,
    };
  }, [aboutData]);

  return (
    <AboutSectionContext.Provider
      value={{ aboutData, updateContent, updateStyle, handleSave }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        {/* Left Side - Images (unchanged) */}
        <div className="relative">
          <div>
            <img
              src={skyline}
              alt=""
              className="w-44 h-40 object-cover absolute top-40 right-20 border-12 border-white z-10"
            />
          </div>
          <div>
            <img
              src={ppl}
              alt=""
              className="w-96 h-96 object-cover  overflow-hidden border-white border-12"
            />
          </div>
          <div>
            <img
              src={hand}
              alt=""
              className="w-64 h-64 absolute -top-20 right-50 border-12 border-white object-cover"
            />
          </div>
          <div>
            <img
              src={student}
              alt=""
              className="w-48 h-48 absolute top-20 right-40 border-12 border-white object-cover"
            />
          </div>
        </div>

        {/* Right side - Content Display Only */}
        <div className="space-y-4 px-5 relative">
          <h2 className={`tracking-tight ${getClassName("mainHeading")}`}>
            {aboutData.content.mainHeading || "URBANi is a"}{" "}
            <span className={getClassName("highlightText")}>
              {aboutData.content.highlightText || "citizen-focused platform"}
            </span>{" "}
            that lets residents
          </h2>

          <p className={`leading-relaxed ${getClassName("paragraph1")}`}>
            {aboutData.content.paragraph1 ||
              "report public issues directly to local authorities. From potholes and broken streetlights to stray animals and pollution hazards, every report is tracked for timely resolution."}
          </p>

          <p className={`leading-relaxed ${getClassName("paragraph2")}`}>
            {aboutData.content.paragraph2 || "Our mission is simple:"}{" "}
            <strong>
              {aboutData.content.strongText || "empower communities"}
            </strong>{" "}
            to actively improve their neighborhoods, ensure transparency, and
            make cities safer and cleaner for everyone.
          </p>
        </div>
      </div>
    </AboutSectionContext.Provider>
  );
};

export default AboutSection;
