import React, { useEffect, useState } from "react";

export default function DarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  });

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (isDarkMode) {
      html.classList.add("dark");
      body.classList.add("body");
    } else {
      html.classList.remove("dark");
      body.classList.remove("body");
    }
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="checkbox-wrapper-54">
      <label className="switch">
        <input type="checkbox" checked={isDarkMode} onChange={handleToggle} />
        <span className="slider"></span>
      </label>
    </div>
  );
}
