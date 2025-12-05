import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthProvider from "./context/AuthProvider";
import { RouterProvider } from "react-router";
import router from "./routes/Router";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
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
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
