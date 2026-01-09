import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import AuthProvider from "../context/AuthProvider";
import PaymentProvider from "../context/PaymentProvider";
import SubscriptionPopup from "../components/home/popup/SubscriptionPopup";
import Loading from "../components/loading/Loading";
import { EditModeProvider } from "../context/EditModeProvider";

const queryClient = new QueryClient();

const AppProviders = ({ children }) => {
  const [loadingOnLoad, setLoadingOnLoad] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");

    const timer = setTimeout(() => {
      setLoadingOnLoad(false);
      if (!hasSeenPopup) {
        setShowPopup(true);
        sessionStorage.setItem("hasSeenPopup", true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loadingOnLoad && <Loading />}

      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <PaymentProvider>
            <EditModeProvider>
              {children}
              <Toaster
                position="top-right"
                toastOptions={{
                  success: {
                    style: {
                      background: "linear-gradient(90deg, #006400, #008000)",
                      color: "#fff",
                      fontWeight: "600",
                    },
                  },
                  error: {
                    style: {
                      background: "linear-gradient(90deg, #cc0000, #ff004c)",
                      color: "#fff",
                      fontWeight: "600",
                    },
                  },
                }}
              />

              {showPopup && (
                <SubscriptionPopup
                  isOpen={showPopup}
                  onClose={() => setShowPopup(false)}
                />
              )}
            </EditModeProvider>
          </PaymentProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default AppProviders;
