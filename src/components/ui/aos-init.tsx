"use client";

import { useEffect } from "react";
import AOS from "aos";

export default function AosInit() {
  useEffect(() => {
    AOS.init({
      duration: 750,
      easing: "ease-out-cubic",
      once: true,
      offset: 70,
      mirror: false,
    });
  }, []);

  return null;
}
