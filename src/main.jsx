import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import AuthProvider from "./context/AuthProvider";
import { RouterProvider } from "react-router";
import router from "./routes/Router";
import { Toaster } from "react-hot-toast";
import SubscriptionPopup from "./components/home/popup/SubscriptionPopup";
import Loading from "./components/loading/Loading";

const queryClient = new QueryClient();

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");
    //console.log("yes", hasSeenPopup);
    const timer = setTimeout(() => {
      setLoading(false);
      //only show popup once per session
      if (!hasSeenPopup) {
        //console.log("no", hasSeenPopup);
        setShowPopup(true);
        sessionStorage.setItem("hasSeenPopup", true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loader on initial load */}
      {loading && <Loading />}
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              success: {
                style: {
                  background: "linear-gradient(90deg, #006400, #008000)",
                  color: "#fff",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "600",
                },
              },
              error: {
                style: {
                  background: "linear-gradient(90deg, #cc0000, #ff004c)",
                  color: "#fff",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "600",
                },
              },
            }}
          />
          {/* Subscription Popup */}
          {showPopup && (
            <SubscriptionPopup
              isOpen={showPopup}
              onClose={() => setShowPopup(false)}
            />
          )}
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

createRoot(document.getElementById("root")).render(<Main />);
