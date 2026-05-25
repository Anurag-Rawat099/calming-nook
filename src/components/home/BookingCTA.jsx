export default function BookingCTA() {
  return (<section className="section pt-0">
    <div className="container-custom">
      <div className=" relative overflow-hidden theme-card p-10 lg:p-16 text-center ">
        {/* background texture circles */}
        <div className="   absolute   -top-20   -left-20   h-52   w-52   rounded-full   bg-[var(--primary)]/10   blur-3xl   " />
        <div className="   absolute   -bottom-20   -right-20   h-52   w-52   rounded-full   bg-black/5   blur-3xl   " />
        <div className="relative z-10">
          <p className="uppercase tracking-[6px] text-[var(--primary)] text-2xl">   Reserve Your Escape </p>
          <h2 className="heading-lg mt-4">   Slow Down & Stay A Little Longer </h2>
          <p className="text-muted mt-6 max-w-2xl mx-auto">   Experience warm hospitality, scenic trails,   peaceful mornings, and memorable evenings at   Calming Nook. </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <button className="primary-btn"> Book Your Stay   </button>
            <button className="secondary-btn"> Contact Us   </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}