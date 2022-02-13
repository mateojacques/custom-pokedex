import React from "react";

const ThemeSwitch = ({ isOpen, setThemeColors }) => {
  return (
    <div className={`theme-switch ${isOpen && "menu-open"}`}>
      <button
        className="theme-switch__btn theme-light"
        onClick={() => setThemeColors("light", "#222", "#ccc", "#fff", "#888")}
      ></button>
      <button
        className="theme-switch__btn theme-dark"
        onClick={() =>
          setThemeColors("dark", "#b8b8b8", "#999", "#222", "#fff")
        }
      ></button>
      <button
        className="theme-switch__btn theme-grass"
        onClick={() =>
          setThemeColors("grass", "#9bcc50", "#378e8e", "#2a513f", "#cef79f")
        }
      ></button>
      <button
        className="theme-switch__btn theme-fire"
        onClick={() =>
          setThemeColors("fire", "#e53800", "#fbc204", "#5a1a09", "#fff")
        }
      ></button>
      <button
        className="theme-switch__btn theme-water"
        onClick={() =>
          setThemeColors("water", "#93c8d0", "#5a9ca4", "#e9f4f5", "#000")
        }
      ></button>
      <button
        className="theme-switch__btn theme-rock"
        onClick={() =>
          setThemeColors("rock", "#C0B8B8", "#867878", "#544C4C", "#fff")
        }
      ></button>
      <button
        className="theme-switch__btn theme-fairy"
        onClick={() =>
          setThemeColors("fairy", "#E3ABB5", "#F5D9E2", "#fff", "#040405")
        }
      ></button>
    </div>
  );
};

export default ThemeSwitch;
