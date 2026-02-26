import * as React from "react";
import { createPortal } from "react-dom";
const MapContent = React.lazy(() => import("./mapContent"));

export default function Map() {
  const mapElement = document.getElementById("map")!;
  if (!mapElement) {
    return null;
  }
  return createPortal(<MapContent />, mapElement);
}
