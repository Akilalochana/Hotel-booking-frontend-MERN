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
    <div className="w-full min-h-screen flex flex-col items-center px-4">
      {/* Header Section */}
      <div className="mt-20 text-center">
        <section id="header">
          <BlurFade delay={0.25} inView>
            <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl">
              Welcome to 👋
            </h2>
          </BlurFade>
          <BlurFade delay={0.5} inView>
            <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl">
              Hotel Win Win
            </h1>
          </BlurFade>
        </section>
      </div>

      {/* Gallery Section */}
      <div className="w-full max-w-screen-xl mt-10">
        <section id="photos">
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
            {images.map((imageUrl, idx) => (
              <BlurFade key={imageUrl} delay={0.25 + idx * 0.05} inView>
                <img
                  className="mb-4 w-full rounded-lg object-cover"
                  src={imageUrl}
                  alt={`Hotel image ${idx + 1}`}
                />
              </BlurFade>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
