import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { ShoppingCart } from "lucide-react";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full group overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-300 rounded-xl sm:rounded-2xl bg-white">
      <div
        onClick={() => handleGetProductDetails(product?._id)}
        className="cursor-pointer"
      >
        <div className="relative overflow-hidden">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 sm:top-3 sm:left-3 text-[10px] sm:text-xs bg-gray-900/90 hover:bg-gray-900 backdrop-blur-sm shadow-sm border-0">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 sm:top-3 sm:left-3 text-[10px] sm:text-xs bg-red-500/90 hover:bg-red-600 backdrop-blur-sm shadow-sm border-0 animate-pulse">
              {`Only ${product?.totalStock} left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 sm:top-3 sm:left-3 text-[10px] sm:text-xs bg-emerald-500/90 hover:bg-emerald-600 backdrop-blur-sm shadow-sm border-0">
              Sale
            </Badge>
          ) : null}
        </div>

        <CardContent className="p-3 sm:p-4 space-y-1.5 sm:space-y-2">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 line-clamp-1 tracking-tight">
            {product?.title}
          </h2>

          <div className="flex flex-wrap gap-1.5 justify-between items-center">
            <span className="text-[10px] sm:text-xs font-medium text-gray-500 bg-gray-100 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[10px] sm:text-xs font-medium text-gray-500 bg-gray-100 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <span
              className={`${
                product?.salePrice > 0
                  ? "line-through text-gray-400 text-xs sm:text-sm"
                  : "text-gray-900 text-base sm:text-lg md:text-xl"
              } font-bold`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-base sm:text-lg md:text-xl font-bold text-emerald-600">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>

      <CardFooter className="p-3 sm:p-4 pt-0">
        {product?.totalStock === 0 ? (
          <Button
            disabled
            className="w-full text-xs sm:text-sm rounded-lg sm:rounded-xl bg-gray-200 text-gray-500 cursor-not-allowed hover:bg-gray-200"
          >
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full text-xs sm:text-sm rounded-lg sm:rounded-xl gap-1.5 sm:gap-2 font-semibold shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
          >
            <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;