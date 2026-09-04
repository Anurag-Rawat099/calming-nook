"use client";

import amenities from "@/data/amenities";
import { Wifi, ParkingCircle, Bath, Coffee, BedDouble, Tv, Utensils, Mountain, Trees, Flame, Snowflake, ShieldCheck } from "lucide-react";

const icons = { Wifi, ParkingCircle, Bath, Coffee, BedDouble, Tv, Utensils, Mountain, Trees, Flame, Snowflake, ShieldCheck };

export default function Amenities() {
  return (
    <section className="section">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto">
          <p className="uppercase tracking-[6px] text-[var(--primary)] text-sm">Amenities</p>
          <h2 className="heading-md mt-2">Everything You Need For A Comfortable Stay</h2>
          <p className="text-muted mt-2 leading-7">Experience modern comforts blended with the warmth of traditional mountain hospitality.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 mt-14">
          {amenities.map((item) => {
            const Icon = icons[item.icon];

            return (
              <div key={item.id} className="group relative overflow-hidden theme-card p-5 min-h-[190px] flex flex-col items-center justify-center text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                <div className="relative z-10 flex flex-col items-center justify-center transition-all duration-500 group-hover:opacity-0 group-hover:scale-90">
                  <div className="w-14 h-14 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4">
                    {Icon && <Icon size={28} className="text-[var(--primary)]" />}
                  </div>
                  <h3 className="text-sm font-semibold leading-6">{item.title}</h3>
                </div>

                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 opacity-0 translate-y-10 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 bg-[var(--primary)]/90">
                  {item.level && <span className="px-4 py-2 rounded-full bg-white/15 backdrop-blur-md text-white text-xs tracking-[3px] uppercase">{item.level}</span>}
                  <h3 className="text-white text-2xl font-bold mt-4">{item.title}</h3>
                  {item.desc && <p className="text-white/80 text-sm leading-6 mt-3 max-w-[320px]">{item.desc}</p>}
                  {item.duration && <span className="px-4 py-2 mt-4 rounded-full bg-white/10 backdrop-blur-md text-white text-xs">{item.duration}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}