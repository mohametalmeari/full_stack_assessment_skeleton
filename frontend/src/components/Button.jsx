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
      "bg-red-500 rounded-full aspect-square text-white px-0 py-0 w-[1.5rem] m-2",
  };
  return (
    <button
      onClick={onClick}
      className={`relative px-3 py-2 rounded-md mt-2 text-sm disabled:bg-slate-400 disabled:cursor-not-allowed transition-all ${variants[variant]}`}
      disabled={disabled}
    >
      <span className={variant === "close" ? "sr-only" : ""}>{children}</span>
      {variant === "close" && (
        <>
          <div className="w-[60%] bg-white h-[0.2rem] inline-block absolute top-[0.5] right-[0.5] -translate-x-[50%] -translate-y-[50%] rotate-45" />
          <div className="w-[60%] bg-white h-[0.2rem] inline-block absolute top-[0.5] right-[0.5] -translate-x-[50%] -translate-y-[50%] -rotate-45" />
        </>
      )}
    </button>
  );
};
