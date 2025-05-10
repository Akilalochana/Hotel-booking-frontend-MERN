import { ScratchToReveal } from "./magicui/scratch-to-reveal";


export function ScratchToRevealDemo() {
  return (
    <ScratchToReveal
      width={150}
      height={150}
      minScratchPercentage={70}
      className="flex items-center justify-center overflow-hidden rounded-2xl border-2 bg-gray-100"
      gradientColors={["#A97CF8", "#F38CB8", "#FDCC92"]}
    >
      <p className="text-9xl">OFF 50%</p>
    </ScratchToReveal>
  );
}
