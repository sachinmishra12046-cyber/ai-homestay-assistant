export default function Card() {
  return (
    <div
      className="
        border
        rounded-xl
        p-4
        shadow-sm
        hover:shadow-md
        transition
      "
    >
      <h3 className="text-xl font-semibold">
        Mountain View Cottage
      </h3>
      <p className="text-gray-600">
        Dehradun
      </p>
      <p className="mt-2 font-bold">
        ₹2500/night
      </p>
    </div>
  );
}