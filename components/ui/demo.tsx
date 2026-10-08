import { GradientButton } from "@/components/ui/gradient-button"

function Demo() {
  return (
    <div className="flex flex-wrap gap-4 p-6 bg-[#E4E8D6] rounded-2xl items-center">
      <GradientButton>Get Started</GradientButton>
      <GradientButton variant="variant">Variant Blue</GradientButton>
      <GradientButton variant="green">DesaWatt Hijau</GradientButton>
      <GradientButton variant="green-gold">Hijau & Emas</GradientButton>
      <GradientButton variant="green-outline">Hijau Outline</GradientButton>
    </div>
  )
}

export { Demo }
