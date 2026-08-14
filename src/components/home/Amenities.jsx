"use client";

import amenities from "@/data/amenities";
import {
  Wifi,
  ParkingCircle,
  Bath,
  Coffee,
  BedDouble,
  Tv,
  Utensils,
  Mountain,
  Trees,
  Flame,
  Snowflake,
  ShieldCheck,
} from "lucide-react";

const icons = {
  Wifi,
  ParkingCircle,
  Bath,
  Coffee,
  BedDouble,
  Tv,
  Utensils,
  Mountain,
  Trees,
  Flame,
  Snowflake,
  ShieldCheck,
};

export default function Amenities() {
  return (
    <section className="section">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto">
          <p className="uppercase tracking-[6px] text-[var(--primary)] text-sm">
            Amenities
          </p>

          <h2 className="heading-md mt-2">
            Everything You Need For A Comfortable Stay
          </h2>

          <p className="text-muted mt-2 leading-7">
            Experience modern comforts blended with the warmth of
            traditional mountain hospitality.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 mt-14">
          {amenities.map((item) => {
            const Icon = icons[item.icon];

            return (
              <div
                key={item.id}
                className="theme-card p-5 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
<<<<<<< HEAD

                <p className="text-white/70 text-xs uppercase tracking-[4px]">
                  {item.duration}
                </p>

                <h3 className="text-white text-2xl font-bold mt-2">
                  {item.title}
                </h3>

              </div>

              {/* Hover Content */}

              <div
                className="
                absolute
                inset-0
                z-20
                flex
                flex-col
                items-center
                justify-center
                text-center
                px-6
                opacity-0
                translate-y-10
                transition-all
                duration-700
                group-hover:opacity-100
                group-hover:translate-y-0
                "
              >

                <span
                  className="
                  px-4
                  py-2
                  rounded-full
                  bg-white/15
                  backdrop-blur-md
                  text-white
                  text-xs
                  tracking-[3px]
                  uppercase
                  "
                >
                  {item.level}
                </span>

                <h3 className="text-white text-4xl font-bold mt-5">
                  {item.title}
                </h3>

                <p className="text-white/80 text-sm leading-7 mt-5 max-w-[320px]">
                  {item.desc}
                </p>

                <div className="flex gap-3 mt-6">

                  <span
                    className="
                    px-4  
                    py-2
                    rounded-full
                    bg-white/10
                    backdrop-blur-md
                    text-white
                    text-xs
                    "
                  >
                    {item.duration}
                  </span>

                  <span
                    className="
                    px-4
                    py-2
                    rounded-full
                    bg-white/10
                    backdrop-blur-md
                    text-white
                    text-xs
                    "
                  >
                    {item.level}
                  </span>

=======
                <div className="w-14 h-14 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4">
                  <Icon
                    size={28}
                    className="text-[var(--primary)]"
                  />
>>>>>>> 9c24fb5328c00a0cf531f335c222cc659609f7be
                </div>

                <h3 className="text-sm font-semibold leading-6">
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}