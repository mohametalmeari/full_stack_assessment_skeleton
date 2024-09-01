export const Button = ({
  variant = "primary",
  onClick,
  disabled = false,
  children,
}) => {
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-500/80 text-white",
    secondary: "bg-gray-300 hover:bg-gray-300/80 text-black",
    pagination: "text-gray-500 hover:text-black px-0 underline",
    close:
      "bg-red-500 rounded-full aspect-square text-white px-0 py-0 w-[1.5rem] m-2 before:w-[60%] before:bg-white before:h-[0.2rem] before:inline-block before:absolute before:top-[0.5] before:right-[0.5] before:-translate-x-[50%] before:-translate-y-[50%] before:rotate-45 after:w-[60%] after:bg-white after:h-[0.2rem] after:inline-block after:absolute after:top-[0.5] after:right-[0.5] after:-translate-x-[50%] after:-translate-y-[50%] after:-rotate-45",
  };
  return (
    <button
      onClick={onClick}
      className={`relative px-3 py-2 rounded-md mt-2 text-sm disabled:bg-slate-400 disabled:cursor-not-allowed transition-all ${variants[variant]}`}
      disabled={disabled}
    >
      <span className={variant === "close" ? "sr-only" : ""}>{children}</span>
    </button>
  );
};
