import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-xl p-4 sm:p-6">
      <div className="grid gap-4 sm:gap-6">
        <div className="grid gap-1.5 sm:gap-2">
          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between mt-4 sm:mt-6 gap-0.5 xs:gap-2">
            <p className="font-medium text-sm sm:text-base">Order ID</p>
            <Label className="text-xs sm:text-sm break-all xs:text-right">
              {orderDetails?._id}
            </Label>
          </div>
          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between mt-1.5 sm:mt-2 gap-0.5 xs:gap-2">
            <p className="font-medium text-sm sm:text-base">Order Date</p>
            <Label className="text-xs sm:text-sm">
              {orderDetails?.orderDate.split("T")[0]}
            </Label>
          </div>
          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between mt-1.5 sm:mt-2 gap-0.5 xs:gap-2">
            <p className="font-medium text-sm sm:text-base">Order Price</p>
            <Label className="text-xs sm:text-sm">
              ${orderDetails?.totalAmount}
            </Label>
          </div>
          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between mt-1.5 sm:mt-2 gap-0.5 xs:gap-2">
            <p className="font-medium text-sm sm:text-base">Payment method</p>
            <Label className="text-xs sm:text-sm">
              {orderDetails?.paymentMethod}
            </Label>
          </div>
          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between mt-1.5 sm:mt-2 gap-0.5 xs:gap-2">
            <p className="font-medium text-sm sm:text-base">Payment Status</p>
            <Label className="text-xs sm:text-sm">
              {orderDetails?.paymentStatus}
            </Label>
          </div>
          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between mt-1.5 sm:mt-2 gap-0.5 xs:gap-2">
            <p className="font-medium text-sm sm:text-base">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 text-xs sm:text-sm ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-3 sm:gap-4">
          <div className="grid gap-1.5 sm:gap-2">
            <div className="font-medium text-sm sm:text-base">
              Order Details
            </div>
            <ul className="grid gap-2 sm:gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item, index) => (
                    <li
                      key={index}
                      className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-0.5 xs:gap-2 text-xs sm:text-sm border-b xs:border-b-0 pb-1.5 xs:pb-0"
                    >
                      <span>Title: {item.title}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span>Price: ${item.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-3 sm:gap-4">
          <div className="grid gap-1.5 sm:gap-2">
            <div className="font-medium text-sm sm:text-base">
              Shipping Info
            </div>
            <div className="grid gap-0.5 text-xs sm:text-sm text-muted-foreground break-words">
              <span>{user.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;