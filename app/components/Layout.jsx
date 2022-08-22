import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[url('/images/parchment.jpeg')] bg-fixed bg-center bg-no-repeat">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
