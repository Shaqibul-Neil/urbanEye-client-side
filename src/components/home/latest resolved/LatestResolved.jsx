import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/auth & role/useAxios";
import Loading from "../../loading/Loading";
import IssueCard from "../../common/card/issue card/IssueCard";
import ErrorComponent from "../../error/error page/ErrorComponent";
import { motion } from "framer-motion";

const LatestResolved = () => {
  const axiosInstance = useAxios();

  const {
    data: issues = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-issues"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/issues/latest/resolved-issues`);
      return res?.data?.issue;
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorComponent />;
  return (
    <div className="space-y-16">
      {/* Title and subtitle */}
      <div className="space-y-4 text-center">
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }} // Automatic trigger
          viewport={{ once: true, amount: 0.3 }} // 30% screen trigger
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-extrabold text-primary tracking-tight text-4xl md:text-5xl"
        >
          Latest <span className="text-secondary">Resolved</span> Issues
        </motion.h2>
        <motion.p
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-gray-600 max-w-5xl mx-auto leading-relaxed font-medium"
        >
          Stay updated with the latest resolved issues across the city.
          Instantly see which civic concerns have been addressed, track
          resolution times, and understand how efficiently services are
          responding. Gain a clear picture of progress and community impact in
          real time, all at a glance.
        </motion.p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {issues.map((issue, i) => (
          <IssueCard key={issue._id} issue={issue} delay={i * 200} />
        ))}
      </div>
    </div>
  );
};

export default LatestResolved;
