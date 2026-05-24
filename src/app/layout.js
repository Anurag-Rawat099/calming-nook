import "./globals.css";

export const metadata = {
  title: "Calming Nook",
  description: "A peaceful boutique homestay experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">

       

       
          {children}
        

        

      </body>
    </html>
  );
}