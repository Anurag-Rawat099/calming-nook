import Link from "next/link";

import {
  LayoutDashboard,
  BedDouble,
  CalendarCheck,
  CreditCard,
  Users,
  Settings,
  ImageIcon,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Rooms",
    href: "/admin/room",
    icon: BedDouble,
  },
  {
    name: "Bookings",
    href: "/admin/bookings",
    icon: CalendarCheck,
  },
  {
    name: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
    name: "Guests",
    href: "/admin/guests",
    icon: Users,
  },
  {
    name: "Gallery",
    href: "/admin/gallery",
    icon: ImageIcon,
  },
  {
    name: "Settings",
    href: "/admin/setting",
    icon: Settings,
  },
];

export default function AdminLayout({ children }) {
  return (
    <div
      className="
      min-h-screen
      bg-[#f8f5ef]
      flex
    "
    >
      {/* Sidebar */}

      <aside
        className="
w-[280px]
bg-white
border-r
border-black/5
p-6
flex
flex-col
justify-between
fixed
left-0
top-0
h-screen
      "
      >
        <div>
          {/* Logo */}

          <div className="mb-12">
            <p
              className="
              uppercase
              tracking-[6px]
              text-[var(--primary)]
              text-sm
            "
            >
              Calming Nook
            </p>

            <h1 className="text-3xl font-bold mt-3">
              Admin Panel
            </h1>
          </div>

          {/* Menu */}

          <div className="space-y-3">
            {menuItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <Link
                  key={index}
                  href={item.href}
                  className="
                  flex
                  items-center
                  gap-4
                  px-5
                  py-2
                  bg-[#faf7f2]
                  hover:bg-[var(--primary)]
                  hover:text-white
                  transition-all
                  duration-300
                  group
                "
                >
                  <Icon
                    size={22}
                    className="
                    text-[var(--primary)]
                    group-hover:text-white
                  "
                  />

                  <span className="font-medium">
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Logout */}

        <button
          className="
          flex
          items-center
          gap-3
          px-5
          py-4
          rounded-2xl
          bg-red-50
          text-red-500
        "
        >
          <LogOut size={20} />

          Logout
        </button>
      </aside>

      {/* Main Content */}

      <main
  className="
  flex-1
  ml-[280px]
  p-8
  min-h-screen
"
>
  {children}
</main>
    </div>
  );
}