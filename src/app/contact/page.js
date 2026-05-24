import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import BookingForm from "@/components/contact/BookingForm";

export default function ContactPage() {
  return (
    <main>

      <Navbar />

      {/* Hero */}

      <section className="pt-32 pb-20">

        <div className="
        container-custom
        text-center
        ">

          <p className="
          uppercase
          tracking-[6px]
          text-[var(--primary)]
          ">

            Contact Us

          </p>

          <h1 className="
          heading-xl
          mt-5
          ">

            Plan Your Stay

          </h1>

          <p className="
          text-muted
          mt-8
          max-w-3xl
          mx-auto
          ">

            Reach out for bookings, questions, experiences,
            or simply to know more about Calming Nook.

          </p>

        </div>

      </section>

      <BookingForm />

      <Footer />

    </main>
  );
}