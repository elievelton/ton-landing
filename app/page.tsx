import { AcceptedBrands } from "@/components/sections/AcceptedBrands"
import { Hero } from "@/components/sections/Hero"
import { Machines } from "@/components/sections/Machines"
import { Plans } from "@/components/sections/Plans"
import { Benefits } from "@/components/sections/Benefits"
import { TapTon } from "@/components/sections/TapTon"
import { Consultant } from "@/components/sections/Consultant"
import { About } from "@/components/sections/About"
import { FAQ } from "@/components/sections/FAQ"
import { FinalCTA } from "@/components/sections/FinalCTA"

export default function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <Machines />
      <AcceptedBrands />
      <Plans />
      <TapTon />
      <Consultant />
      <About />
      <FAQ />
      <FinalCTA />
    </>
  )
}