import { BlurFade } from "@/components/magicui/blur-fade";


const images = [
  "/hotelImages/hotelImg1.jpg",
  "/hotelImages/hotelImg2.jpg",
  "/hotelImages/hotelImg3.jpg",
  "/hotelImages/hotelImg4.jpg",
  "/hotelImages/hotelImg5.jpg",
  "/hotelImages/hotelImg6.jpg",
  "/hotelImages/hotelImg7.jpg",
  "/hotelImages/hotelImg8.jpg",
  "/hotelImages/hotelImg9.jpg",
  "/hotelImages/hotelImg10.jpg",
  "/hotelImages/hotelImg11.jpg",
  "/hotelImages/hotelImg12.jpg",
  "/hotelImages/hotelImg13.jpg",
  "/hotelImages/hotelImg14.jpg",
];

export default function GalleryPage() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-auto h-[150px] mt-[80px]">
          <section id="header">
            <BlurFade delay={0.25} inView>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                welcome to 👋
              </h2>
            </BlurFade>
            <BlurFade delay={0.25 * 2} inView>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Hotel Win Win
              </h1>
            </BlurFade>
          </section>
      </div>


      <div className="w-[1200px] mt-[50px]">
        <section id="photos">
          <div className="columns-2 gap-4 sm:columns-3">
            {images.map((imageUrl, idx) => (
              <BlurFade key={imageUrl} delay={0.25 + idx * 0.05} inView>
                <img
                  className="mb-4 size-full rounded-lg object-contain"
                  src={imageUrl}
                  alt={`Random stock image ${idx + 1}`}
                />
              </BlurFade>
            ))}
          </div>
        </section>
      </div>
      
    </div>
  )
}