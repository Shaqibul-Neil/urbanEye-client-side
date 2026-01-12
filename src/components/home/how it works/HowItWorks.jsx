import { useEffect, useState } from "react";
import { UserPlus, FileText, Eye, MapPin } from "lucide-react";
import useEditorMode from "../../../hooks/page builder/useEditorMode";
import useAxios from "../../../hooks/auth & role/useAxios";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const HowItWorks = () => {
  const [howItWorksData, setHowItWorksData] = useState({
    content: {
      mainHeading: "",
      highlightText: "",
      description: "",
      steps: [],
    },
    styles: {
      mainHeading: {
        fontSize: "text-4xl md:text-5xl",
        fontWeight: "font-extrabold",
        gradient:
          "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent",
        color: "text-primary",
      },
      highlightText: {
        color: "text-secondary",
      },
      description: {
        color: "text-gray-600",
      },
    },
  });

  const { editMode } = useEditorMode();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchHowItWorksSection = async () => {
      try {
        const { data } = await axiosInstance.get(
          "/contents/how-it-works-section"
        );
        if (data?.message) {
          setHowItWorksData(data.message);
        }
      } catch (err) {
        toast.error("Failed to fetch how it works section:", err);
      }
    };
    fetchHowItWorksSection();
  }, [axiosInstance]);

  const handleSave = async () => {
    try {
      const payload = {
        content: howItWorksData.content,
        styles: howItWorksData.styles,
      };

      await axiosSecure.patch("/contents/how-it-works-section", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      await Swal.fire({
        timer: 2000,
        position: "center",
        icon: "success",
        title: "How It Works section saved successfully!",
        showConfirmButton: false,
      });
    } catch (err) {
      //console.error("Failed to save how it works section:", err);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to save how it works section",
        text: "Please try again later",
        showConfirmButton: true,
      });
    }
  };

  const updateContent = (field, value) => {
    setHowItWorksData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value,
      },
    }));
  };

  const updateStep = (index, field, value) => {
    setHowItWorksData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        steps: prev.content.steps.map((step, i) =>
          i === index ? { ...step, [field]: value } : step
        ),
      },
    }));
  };

  const updateStyle = (element, property, value) => {
    setHowItWorksData((prev) => ({
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
    const style = howItWorksData.styles[element];
    if (!style) return "";

    // Priority: gradient > color > default
    let colorClass = "";
    if (style.gradient) {
      colorClass = style.gradient;
    } else if (style.color) {
      colorClass = style.color;
    }
    return [
      style.fontSize,
      style.fontWeight,
      style.textAlign,
      colorClass,
      style.padding,
      style.margin,
    ]
      .filter(Boolean)
      .join(" ");
  };

  // Store data and functions in window for HowItWorksSectionEditor access
  useEffect(() => {
    window.howItWorksSectionData = {
      howItWorksData,
      updateContent,
      updateStep,
      updateStyle,
      handleSave,
    };
  }, [howItWorksData]);

  const icons = [
    <UserPlus className="lg:w-7 w-5 h-5 lg:h-7 text-indigo-600" />,
    <FileText className="lg:w-7 w-5 h-5 lg:h-7 text-indigo-600" />,
    <Eye className="lg:w-7 w-5 h-5 lg:h-7 text-indigo-600" />,
    <MapPin className="lg:w-7 w-5 h-5 lg:h-7 text-indigo-600" />,
  ];

  const steps =
    howItWorksData.content.steps.length > 0
      ? howItWorksData.content.steps
      : [
          {
            title: "Registration",
            description: "Sign up to start reporting and track issues.",
          },
          {
            title: "Post an Issue",
            description: "Submit any public issue with details and location.",
          },
          {
            title: "View Issues",
            description:
              "See issues reported by other citizens for transparency.",
          },
          {
            title: "Track Issues",
            description:
              "Monitor updates and see real-time progress of issues.",
          },
        ];

  return (
    <div>
      {/* Title Section */}
      <div className="text-center px-3">
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`tracking-tight ${getClassName("mainHeading")}`}
        >
          Our{" "}
          <span className={getClassName("highlightText")}>
            {howItWorksData.content.highlightText || "Proven"}
          </span>{" "}
          Work Process
        </motion.h2>
        <motion.p
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className={`mt-4 text-center ${getClassName("description")}`}
        >
          {howItWorksData.content.description ||
            "Our platform is designed to make reporting public issues simple, transparent, and effective. From the moment you register, you gain the ability to submit detailed reports, view problems reported by others in your community, and track progress in real time."}
        </motion.p>
      </div>

      {/* How it works */}
      <div>
        <div className="flex items-center justify-between w-full max-w-6xl mx-auto lg:px-6 px-2 py-16 overflow-x-auto">
          {steps.map((item, index) => (
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: index * 0.4,
              }}
              key={index}
              className="relative flex-1 flex flex-col items-center"
            >
              {/* Card */}
              <div className="flex flex-col items-center bg-white lg:p-6 p-3 rounded-2xl lg:w-52 w-36 relative">
                <div className="lg:w-14 lg:h-14 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  {icons[index] || icons[0]}
                </div>
                <div className="absolute top-5 right-9 w-6 h-6 lg:w-8 lg:h-8 lg:right-14 rounded-full bg-primary flex justify-center items-center">
                  <p className="text-white text-xs">{index + 1}</p>
                </div>
                <h3 className="lg:text-lg text-base font-bold text-secondary mb-1 text-center">
                  {item.title}
                </h3>
                <p className="lg:text-sm text-xs text-gray-600 text-center">
                  {item.description}
                </p>
              </div>

              {/* Connector line */}
              {index !== steps.length - 1 && (
                <div className="absolute top-1/2 right-0 w-full h-1 bg-secondary -z-10 transform translate-x-1/2"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
