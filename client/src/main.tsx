import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import "./samples/node-api";
import "styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import * as dotenv from "dotenv";

import { createTheme, NextUIProvider, Text } from "@nextui-org/react";

dotenv.config({ path: "../.env" });

const theme = createTheme({
  type: "dark", // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primaryLight: "#cec2fd",
      primaryLightHover: "#baa9fc",
      primaryLightActive: "#a691fb",
      primaryLightContrast: "#7f60f9",
      primary: "#9980FA",
      primaryBorder: "#9378fa",
      primaryBorderHover: "#7f60f9",
      primarySolidHover: "#6b47f8",
      primarySolidContrast: "$white",
      primaryShadow: "#9378fa",

      link: "#3b82f6",
      selection: "3882F6",

      background: "#242425",
      tertiary: "#393C40",

      "primary-base": "#9980FA",
    },
    space: {},
    fonts: {
      sans:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Montserrat', 'Inter', sans-serif;",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <NextUIProvider theme={theme}>
    <React.StrictMode>
      <Router>
        <App />
        <ToastContainer
          toastClassName="bg-red-500"
          position="bottom-right"
          theme="colored"
        />
      </Router>
    </React.StrictMode>
  </NextUIProvider>
);
