import { AcceptedBrands } from "@/components/sections/AcceptedBrands"
import { Hero } from "@/components/sections/Hero"
import { Machines } from "@/components/sections/Machines"

export default function Home() {
  return (
    <>
      <Hero />
      <Machines />
      <AcceptedBrands />
    </>
  )
}