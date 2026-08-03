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
                <div className="w-14 h-14 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4">
                  <Icon
                    size={28}
                    className="text-[var(--primary)]"
                  />
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