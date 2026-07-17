// app\page.js
"use client";
import Hero2 from "@/app/components/website/home/Hero2.jsx";
import SmartLinks from "@/app/components/website/home/SmartLinks.jsx";
import FAQSection from "@/app/components/website/home/FAQSection.jsx";
import HowItWorks from "@/app/components/website/home/HowItWorks.jsx";
import CreatorCommunity from "@/app/components/website/home/CreatorCommunity.jsx";
import GetStarted from "@/app/components/website/home/GetStarted.jsx";
import PartnershipCTA from "@/app/components/website/home/PartnershipCTA.jsx";
import AdvertiserSection from "@/app/components/website/home/AdvertiserSection.jsx";

export default function Home() {
  return (
    <div className="bg-white">
      <Hero2 />
      <HowItWorks />
      <AdvertiserSection />
      <CreatorCommunity />
      <SmartLinks />
      <PartnershipCTA />
      <FAQSection />
    </div>
  );
}
