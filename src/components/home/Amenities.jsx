import Image from "next/image";
import amenities from "@/data/amenities";

export default function Amenities() {
  return (
    <section className="section">

      <div className="container-custom">

<div className="
text-center
max-w-2xl
mx-auto
">

  <p className="
  uppercase
  tracking-[6px]
  text-[var(--primary)]
  ">

    Experiences

  </p>


  <h2 className="
  heading-lg
  mt-5
  ">

    Explore Beyond Your Stay

  </h2>

</div>


<div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-8
mt-16
">

  {amenities.map((item)=>(

    <div
    key={item.id}
    className="
    theme-card
    overflow-hidden
    "
    >

      <div className="
      relative
      h-[300px]
      ">

<Image
  src={item.image}
  fill
  alt={item.title}
  className="
  object-cover
  "
/>

      </div>


      <div className="p-6">

<h3 className="
text-2xl
font-bold
">

  {item.title}

</h3>


<div className="
flex
flex-wrap
gap-3
mt-4
">

  <span className="
  px-4
  py-2
  rounded-full
  bg-[var(--paper-dark)]
  text-sm
  ">

    {item.duration}

  </span>

  <span className="
  px-4
  py-2
  rounded-full
  bg-[var(--paper-dark)]
  text-sm
  ">

    {item.level}

  </span>

</div>


<p className="
text-muted
mt-5
">

  {item.desc}

</p>

      </div>

    </div>

  ))}

</div>

      </div>

    </section>
  );
}