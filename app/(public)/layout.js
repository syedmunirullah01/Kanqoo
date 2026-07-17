import Navbar from "@/app/components/website/layout/Navbar";
import Footer from "@/app/components/website/layout/Footer";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
