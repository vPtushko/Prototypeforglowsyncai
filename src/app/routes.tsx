import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Nutrition } from "./pages/Nutrition";
import { Skin } from "./pages/Skin";
import { Activity } from "./pages/Activity";
import { Scanner } from "./pages/Scanner";
import { Consultations } from "./pages/Consultations";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "nutrition", Component: Nutrition },
      { path: "skin", Component: Skin },
      { path: "activity", Component: Activity },
      { path: "scanner", Component: Scanner },
      { path: "consultations", Component: Consultations },
    ],
  },
]);
