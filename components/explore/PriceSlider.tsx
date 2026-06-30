import { PRICE_MAX, PRICE_MIN } from "./types";

interface PriceSliderProps {
  minPrice: number;
  maxPrice: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}

export default function PriceSlider({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
}: PriceSliderProps) {
  const minPercent = ((minPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const maxPercent = ((maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-500">Price Range</span>
        <span className="font-bold text-emerald-700">
          ₹{minPrice.toLocaleString("en-IN")} – ₹{maxPrice.toLocaleString("en-IN")}
        </span>
      </div>

      <div className="relative h-2 rounded-full bg-gray-100">
        <div
          className="absolute h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-200"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="min-price" className="mb-1.5 block text-xs font-medium text-gray-500">
            Minimum
          </label>
          <input
            id="min-price"
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={100}
            value={minPrice}
            onChange={(e) => onMinChange(Math.min(Number(e.target.value), maxPrice - 100))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
          <p className="mt-1 text-xs font-semibold text-gray-700">
            ₹{minPrice.toLocaleString("en-IN")}
          </p>
        </div>

        <div>
          <label htmlFor="max-price" className="mb-1.5 block text-xs font-medium text-gray-500">
            Maximum
          </label>
          <input
            id="max-price"
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={100}
            value={maxPrice}
            onChange={(e) => onMaxChange(Math.max(Number(e.target.value), minPrice + 100))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
          <p className="mt-1 text-xs font-semibold text-gray-700">
            ₹{maxPrice.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </div>
  );
}
