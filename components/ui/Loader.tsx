type LoaderSize = "sm" | "md" | "lg";

interface LoaderProps {
  size?: LoaderSize;
  label?: string;
  className?: string;
}

const sizeStyles: Record<LoaderSize, string> = {
  sm: "h-5 w-5 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-[3px]",
};

export default function Loader({
  size = "md",
  label = "Loading...",
  className = "",
}: LoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={["inline-flex flex-col items-center gap-3", className].join(" ")}
    >
      <div
        className={[
          "rounded-full border-gray-200 border-t-[#16a34a] animate-spin",
          sizeStyles[size],
        ].join(" ")}
        aria-hidden="true"
      />

      {label ? (
        <span className="text-sm text-gray-600">{label}</span>
      ) : (
        <span className="sr-only">Loading</span>
      )}
    </div>
  );
}
