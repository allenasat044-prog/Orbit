import SiteHeader from "@/components/site-header";
import Faqs02 from "@/components/ui/faqs-02";

export default function Faqs() {
  return (
    <div
      className="dark min-h-screen text-foreground"
      style={{
        backgroundColor: "#0a0a0b",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px), radial-gradient(ellipse at 85% 40%, rgba(255,255,255,0.05), transparent 55%)",
        backgroundSize: "64px 64px, 64px 64px, 100% 100%",
      }}
    >
      <SiteHeader />
      <Faqs02 />
    </div>
  );
}
