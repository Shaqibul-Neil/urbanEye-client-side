import { useEffect, useState } from "react";
import { ShieldCheck, MapPin, Bell, PhoneCall } from "lucide-react";
import useEditorMode from "../../../hooks/page builder/useEditorMode";
import useAxios from "../../../hooks/auth & role/useAxios";
import useAxiosSecure from "../../../hooks/auth & role/useAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function FeaturesSection() {
  const [featuresData, setFeaturesData] = useState({
    content: {
      mainHeading: "",
      highlightText: "",
      description: "",
      buttonText: "",
      features: [],
    },
    styles: {
      mainHeading: {
        fontSize: "text-4xl md:text-5xl",
        fontWeight: "font-extrabold",
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
    const fetchFeaturesSection = async () => {
      try {
        const { data } = await axiosInstance.get("/contents/features-section");
        if (data?.message) {
          setFeaturesData(data.message);
        }
      } catch (err) {
        toast.error("Failed to fetch features section:", err);
      }
    };
    fetchFeaturesSection();
  }, [axiosInstance]);

  const handleSave = async () => {
    try {
      const payload = {
        content: featuresData.content,
        styles: featuresData.styles,
      };

      await axiosSecure.patch("/contents/features-section", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      await Swal.fire({
        timer: 2000,
        position: "center",
        icon: "success",
        title: "Features section saved successfully!",
        showConfirmButton: false,
      });
    } catch (err) {
      //console.error("Failed to save features section:", err);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to save features section",
        text: "Please try again later",
        showConfirmButton: true,
      });
    }
  };

  const updateContent = (field, value) => {
    setFeaturesData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value,
      },
    }));
  };

  const updateFeature = (index, field, value) => {
    setFeaturesData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        features: prev.content.features.map((feature, i) =>
          i === index ? { ...feature, [field]: value } : feature
        ),
      },
    }));
  };

  const updateStyle = (element, property, value) => {
    setFeaturesData((prev) => ({
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
    const style = featuresData.styles[element];
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

  // Store data and functions in window for FeaturesSectionEditor access
  useEffect(() => {
    window.featuresSectionData = {
      featuresData,
      updateContent,
      updateFeature,
      updateStyle,
      handleSave,
    };
  }, [featuresData]);

  const icons = [
    <ShieldCheck className="w-8 h-8 text-indigo-600" />,
    <MapPin className="w-8 h-8 text-indigo-600" />,
    <Bell className="w-8 h-8 text-indigo-600" />,
    <PhoneCall className="w-8 h-8 text-indigo-600" />,
  ];

  return (
    <section className="lg:py-24 py-16 relative overflow-hidden">
      <div className="lg:px-6 px-5 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="max-w-md space-y-4">
          <motion.h2
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`tracking-tight ${getClassName("mainHeading")}`}
          >
            {featuresData.content.mainHeading || "Build a"}{" "}
            <span className={getClassName("highlightText")}>
              {featuresData.content.highlightText || "Safer Community"}
            </span>{" "}
            with Our Public Reporting System
          </motion.h2>

          <motion.p
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className={`mb-6 leading-relaxed ${getClassName("description")}`}
          >
            {featuresData.content.description ||
              "A powerful and transparent platform where citizens can report issues, track progress, and help improve their city with ease."}
          </motion.p>
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          >
            <button className="px-6 py-3 border border-primary text-primary rounded-full shadow-md hover:bg-primary hover:text-white cursor-pointer transition-all duration-300">
              {featuresData.content.buttonText || "Report an Issue"}
            </button>
          </motion.div>
        </div>

        {/* Right Features Grid */}
        <div className="features grid grid-cols-1 md:grid-cols-2 gap-6">
          {(featuresData.content.features.length > 0
            ? featuresData.content.features
            : [
                {
                  title: "Verified Staff Handling",
                  description:
                    "Every report is managed by authorized municipal staff, ensuring accountability and quality response.",
                },
                {
                  title: "Location-Based Tracking",
                  description:
                    "Browse reported problems around your area and monitor progress in real time.",
                },
                {
                  title: "Instant Status Notifications",
                  description:
                    "Get notified whenever your submitted issue is assigned, reviewed, or resolved.",
                },
                {
                  title: "Emergency Priority System",
                  description:
                    "Critical public safety concerns are auto-flagged and forwarded to emergency teams instantly.",
                },
              ]
          ).map((item, index) => (
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
              className={`feature bg-linear-to-br from-white via-[#f8f9ff] to-white backdrop-blur-xl rounded-2xl p-6 shadow-md border border-white transition-transform duration-300 ${
                index % 2 === 1 ? "md:translate-y-8" : ""
              } hover:scale-110`}
            >
              <div className="mb-4">{icons[index] || icons[0]}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
