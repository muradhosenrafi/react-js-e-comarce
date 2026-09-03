import {
  HousePlug,
  LogOut,
  ShoppingCart,
  UserCog,
  Search,
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import React, { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

// Only these categories show in the mobile top nav (everything except Search,
// which lives in the bottom bar instead)
const MOBILE_TOP_NAV_EXCLUDED_IDS = ["search"];

function navigateToMenuItem(
  getCurrentMenuItem,
  navigate,
  location,
  setSearchParams
) {
  sessionStorage.removeItem("filters");
  const currentFilter =
    getCurrentMenuItem.id !== "home" &&
    getCurrentMenuItem.id !== "products" &&
    getCurrentMenuItem.id !== "search"
      ? {
          category: [getCurrentMenuItem.id],
        }
      : null;

  sessionStorage.setItem("filters", JSON.stringify(currentFilter));

  location.pathname.includes("listing") && currentFilter !== null
    ? setSearchParams(
        new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
      )
    : navigate(getCurrentMenuItem.path);
}

// Desktop nav (unchanged) — shows every category from config
function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    navigateToMenuItem(getCurrentMenuItem, navigate, location, setSearchParams);
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

// Mobile-only top nav — all categories (Search lives in the bottom bar)
function MobileTopCategoryNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();

  const mobileItems = shoppingViewHeaderMenuItems.filter(
    (item) => !MOBILE_TOP_NAV_EXCLUDED_IDS.includes(item.id)
  );

  function handleNavigate(getCurrentMenuItem) {
    navigateToMenuItem(getCurrentMenuItem, navigate, location, setSearchParams);
  }

  return (
    <nav className="flex lg:hidden items-center justify-center gap-6 overflow-x-auto px-4 h-11 border-t">
      {mobileItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer whitespace-nowrap"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

// Desktop-only right side content (cart + account) — unchanged
function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// A single bottom-nav item, styled to match the reference: normally just the
// icon (muted gray, centered); when active, it becomes a tinted pill with
// the icon and label sitting side by side.
// Wrapped in forwardRef because it's used as the child of
// DropdownMenuTrigger asChild — Radix needs the ref to reach the real
// <button> element for click handling and positioning to work.
const BottomNavItem = React.forwardRef(
  ({ icon, label, active, badgeCount, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={`relative flex items-center justify-center gap-2 h-10 px-3 rounded-full transition-all duration-200 ${
          active
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:text-primary"
        }`}
        {...props}
      >
        <span className="relative flex items-center justify-center">
          {icon}
          {typeof badgeCount === "number" && badgeCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold leading-none">
              {badgeCount}
            </span>
          )}
        </span>
        {active && (
          <span className="text-sm font-medium whitespace-nowrap">
            {label}
          </span>
        )}
      </button>
    );
  }
);
BottomNavItem.displayName = "BottomNavItem";

// Mobile-only bottom bar — Search, Cart, Home (centered), Account
function MobileBottomNav() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  const isHomeActive = location.pathname === "/shop/home";
  const isSearchActive = location.pathname === "/shop/search";
  const isAccountActive =
    location.pathname === "/shop/account" || accountMenuOpen;
  const cartCount = cartItems?.items?.length || 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-3 items-center h-16 bg-background border-t lg:hidden">
      {/* left group: Search + Cart */}
      <div className="flex items-center justify-center gap-1">
        <BottomNavItem
          icon={<Search className="w-5 h-5" />}
          label="Search"
          active={isSearchActive}
          onClick={() => navigate("/shop/search")}
        />

        <Sheet
          open={openCartSheet}
          onOpenChange={() => setOpenCartSheet(false)}
        >
          <BottomNavItem
            icon={<ShoppingCart className="w-5 h-5" />}
            label="Cart"
            active={openCartSheet}
            badgeCount={cartCount}
            onClick={() => setOpenCartSheet(true)}
          />
          <UserCartWrapper
            setOpenCartSheet={setOpenCartSheet}
            cartItems={
              cartItems && cartItems.items && cartItems.items.length > 0
                ? cartItems.items
                : []
            }
          />
        </Sheet>
      </div>

      {/* center: Home */}
      <div className="flex items-center justify-center">
        <BottomNavItem
          icon={<HousePlug className="w-5 h-5" />}
          label="Home"
          active={isHomeActive}
          onClick={() => navigate("/shop/home")}
        />
      </div>

      {/* right group: Account */}
      <div className="flex items-center justify-center">
        <DropdownMenu onOpenChange={setAccountMenuOpen}>
          <DropdownMenuTrigger asChild>
            <BottomNavItem
              icon={<UserCog className="w-5 h-5" />}
              label="Account"
              active={isAccountActive}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="end" className="w-56">
            <DropdownMenuLabel>
              Logged in as {user?.userName}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/shop/account")}>
              <UserCog className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function ShoppingHeader() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <Link to="/shop/home" className="flex items-center gap-2">
            <HousePlug className="h-6 w-6" />
            <span className="font-bold">ARMANE</span>
          </Link>

          {/* Desktop nav & right content — unchanged */}
          <div className="hidden lg:block">
            <MenuItems />
          </div>

          <div className="hidden lg:block">
            <HeaderRightContent />
          </div>
        </div>

        {/* Mobile-only category row */}
        <MobileTopCategoryNav />
      </header>

      {/* Mobile-only bottom bar */}
      <MobileBottomNav />
    </>
  );
}

export default ShoppingHeader;