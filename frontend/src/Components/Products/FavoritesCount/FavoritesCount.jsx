import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  return (
    <div className="absolute top-[23rem] md:top-8">
      {favoriteCount > 0 && (
        <span className="px-1 py-0 text-sm text-white rounded-full bg-red">
          {favoriteCount}
        </span>
      )}
    </div>
  );
};

export default FavoritesCount;
