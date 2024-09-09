import { PortfolioCard } from "@/components/custom/portfolio-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

interface PortfolioSectionProps {
  sectionData: {
    data: [
      {
        id: number;
        Name: string;
        client: string;
        slug: string;
        short_description: string;
        featured: boolean;
        details: any[];
        media: {
          data: [
            {
              id: number;
              url: string;
              alternativeText: string;
            }
          ];
        };
      }
    ];
  };
}

export function PortfolioSection({
  sectionData,
}: Readonly<PortfolioSectionProps>) {
  const { data } = sectionData;
  const featuredProjects = data.filter((p) => p.featured);

  return (
    <section
      id="portfolio"
      className="h-screen w-screen mx-auto flex flex-col items-center justify-center md:w-2/3"
    >
      <div className="text-center flex flex-row items-center justify-center my-32 z-20">
        <Link href="/portfolio">
          <h1 className="text-3xl text-center text-fronzGold p-4 border-2 border-fronzGold hover:border-fronzBlue rounded-sm">
            View Project Gallery
          </h1>
        </Link>
      </div>
      <div className="w-screen text-center flex flex-row items-start justify-center m-4">
        <h1 className="text-fronzGold text-3xl md:text-5xl">Featured Work</h1>
      </div>
      <div className="h-content w-screen justify-center flex-wrap my-4 mx-auto p-8">
        <Carousel
          className="w-full h-content md:w-2/3"
          opts={{ align: "center", loop: true }}
        >
          <CarouselContent className="">
            {featuredProjects.map((p) => (
              <CarouselItem key={p.id} className="basis-full md:basis-1/2">
                <PortfolioCard
                  name={p.Name}
                  client={p.client}
                  //Uncomment the line below if you're in production. Comment it out if you're in development.
                  // imageUrl={p.media.data[0].url}

                  //Uncomment the line below if you're in development. Comment it out if you're in production.
                  imageUrl={p.media.data[0].url}
                  linkHref={`/portfolio/${p.slug}`}
                  description={p.short_description}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
