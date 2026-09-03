import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto group overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-300 rounded-2xl bg-white">
      <div>
        <div className="relative overflow-hidden">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <CardContent className="p-4 space-y-2">
          <h2 className="text-lg font-semibold text-gray-900 line-clamp-1 tracking-tight">
            {product?.title}
          </h2>

          <div className="flex items-center gap-2 pt-1">
            <span
              className={`${
                product?.salePrice > 0
                  ? "line-through text-gray-400 text-sm"
                  : "text-gray-900 text-xl"
              } font-bold`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-xl font-bold text-emerald-600">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex justify-between items-center gap-3">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
            variant="outline"
            className="flex-1 rounded-xl gap-2 font-semibold border-gray-300 hover:bg-gray-900 hover:text-white transition-all duration-200 active:scale-95"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(product?._id)}
            variant="outline"
            className="flex-1 rounded-xl gap-2 font-semibold border-red-200 text-red-600 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200 active:scale-95"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;