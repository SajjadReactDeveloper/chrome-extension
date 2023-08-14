import React from "react";
import { createRoot } from "react-dom/client";
import '../assets/tailwind.css'

const Popup = (
  <div>
    <h1 className="text-3xl font-bold underline text-green-500">
    ABout Page
  </h1>
  <img src="icon.png" alt="" />
  </div>
);

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(Popup);
