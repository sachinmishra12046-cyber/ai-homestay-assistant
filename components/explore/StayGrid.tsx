import StayCard from "./StayCard";
import { Stay } from "./types";

interface StayGridProps {
  stays: Stay[];
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  showAiBadge?: boolean;
}

export default function StayGrid({
  stays,
  wishlist,
  onToggleWishlist,
  showAiBadge = true,
}: StayGridProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {stays.map((stay, index) => (
        <StayCard
          key={stay.id}
          stay={stay}
          index={index}
          showAiBadge={showAiBadge}
          isWishlisted={wishlist.includes(stay.id)}
          onToggleWishlist={onToggleWishlist}
        />
      ))}
    </div>
  );
}
