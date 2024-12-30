import AvailableBlood from "@/components/available-chart";

import Link from "next/link";
import HomeCommunity from "@/components/ui/home-comm";

export default function Home() {
  return (
    <>
      <header
        className="relative h-[calc(100dvh-96px)] w-dvw bg-no-repeat bg-contain bg-bottom flex flex-col justify-between items-start space-y-4 p-12"
        style={{
          backgroundImage: `url("/assets/home-bg2.webp")`,
        }}
      >
        <div className="">
          <h3 className="text-4xl font-bold">Your Contribution Saves Lives</h3>
          <p className="w-1/3 pt-4">
            Join the mission to make a difference in countless lives. Blood
            donation is not just a noble act; it’s a lifeline for those facing
            emergencies, surgeries, and chronic illnesses. Whether you’re here
            to give blood or find a donor, every action matters. Your small step
            today can bring immense hope and healing to those in need. Together,
            we can create a healthier, united, and more compassionate community.
          </p>
        </div>
        <div className="pb-8 w-full flex flex-row justify-around items-center">
          <Link
            href="/find-donator"
            className="bg-primary text-background px-6 py-4 text-xl hover:scale-110 transition-transform"
          >
            Find a donator
          </Link>
          <Link
            href="/donate"
            className="bg-primary text-background px-6 py-4 text-xl hover:scale-110 transition-transform"
          >
            Donate blood
          </Link>
        </div>
        <div className="absolute -z-10 h-1/3 w-dvw bg-background left-0 bottom-0"></div>
      </header>
      <main className="font-open">
        {/* <div
        className="w-dvw h-[180px] bg-cover bg-top overflow-hidden"
        style={{ backgroundImage: `url("/assets/wave.svg")` }}
      ></div> */}
        <div className="h-auto w-full py-12">
          <h2 className="mb-4 text-center text-4xl font-semibold">
            We form a community of
          </h2>
          <HomeCommunity />
        </div>
        <div className="block w-1/2 mx-auto text-center py-12">
          <h2 className="text-4xl font-semibold mb-12">About Us</h2>
          <p>
            At RoktoDaan, we are dedicated to making a lasting impact by
            connecting generous donors with those in need. Our mission is to
            ensure that every person has access to life-saving blood when they
            need it most. Through our platform, we empower individuals to give
            back to their communities, fostering a culture of kindness and
            selflessness. Whether you’re a first-time donor or a regular
            supporter, together, we can help save lives and make a difference in
            the world, one donation at a time.
          </p>
        </div>

        <div className="py-12 w-full text-center">
          <h2 className="text-4xl font-semibold mb-16 text-center w-full">
            Available blood bags at the moment
          </h2>
          <AvailableBlood />
        </div>
        <div className="h-[400px] w-full bg-primary"></div>
      </main>
    </>
  );
}
