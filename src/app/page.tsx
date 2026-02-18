import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Sagar Harsora",
  openGraph: {
    title: "Sagar Harsora",
  },
};

function SectionTitle(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className="text-primary md:text-opacity-40 col-span-2 text-lg font-semibold md:text-right md:text-base md:font-normal"
      {...props}
    />
  );
}

function SectionContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="col-span-10" {...props} />;
}

interface TableRowProps {
  href: string;
  title: ReactNode;
  subtitle?: string;
  date?: string;
}

function TableRow({ href, title, subtitle, date }: TableRowProps) {
  return (
    <a href={href} className="group flex items-center space-x-4">
      <strong className="text-primary flex-none font-medium group-hover:text-indigo-600">
        {title}
      </strong>
      <span className="w-full shrink border-t border-dashed border-gray-300" />
      {subtitle && (
        <span className="text-tertiary flex-none text-sm md:text-base">
          {subtitle}
        </span>
      )}
      {date && (
        <span className="text-quaternary hidden flex-none font-mono md:flex">
          {date}
        </span>
      )}
    </a>
  );
}

function SectionContainer(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="grid grid-cols-1 items-start gap-3 md:grid-cols-12 md:gap-6"
      {...props}
    />
  );
}

export default function Home() {
  return (
    <div className="scrollbar-hide relative flex h-full w-full flex-col overflow-y-scroll">
      <div className="mx-auto w-full max-w-3xl px-4 pb-32 md:px-8 md:pt-2">
        <div className="mb-6 p-4 flex justify-center md:ml-20">
          <Image
            src="/static/img/avatar.png"
            alt="Sagar Harsora"
            width={300}
            height={300}
            priority
            className="rounded-lg"
          />
        </div>

        <div className="space-y-12 pb-24 md:space-y-16 md:pb-4">
          <SectionContainer>
            <SectionTitle />
            <SectionContent>
              <div className="text-secondary -mb-6 leading-relaxed">
                <p className="mb-3">
                  Hey, I'm Sagar, Software Engineer at{" "}
                  <Link
                    href="https://vibe-engine.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center font-medium text-indigo-500 hover:text-indigo-700"
                  >
                    Vibe Engine
                  </Link>{" "}
                  other than that i enjoy sidequesting and building things with LLMs.
                </p>
                <p className="mb-5">
                  I'm based in Mumbai and love meeting people from the
                  Internet. You should absolutely{" "}
                  <Link
                    href="mailto:harsorasagar04@gmail.com"
                    className="group inline-flex items-center font-medium text-indigo-500 hover:text-indigo-700"
                  >
                    reach out
                  </Link>{" "}
                  if you want to chat!
                </p>
              </div>
            </SectionContent>
          </SectionContainer>

          <SectionContainer>
            <SectionTitle>Work</SectionTitle>
            <SectionContent>
              <div className="flex flex-col space-y-3">
                <TableRow
                  href="https://vibe-engine.ai/"
                  title="Vibe Engine"
                  subtitle="Generative Engine Optimization"
                />
                <TableRow
                  href="https://networkscience.ai/"
                  title="Network Science"
                  subtitle=" AI Productivity Suite"
                />
                <TableRow
                  href="https://arconnet.com/"
                  title={
                    <>
                      Arcon
                     
                    </>
                  }
                  subtitle="Securing Data,Systems and identities"
                />
              
              </div>
              
            </SectionContent>
          </SectionContainer>

          

          <SectionContainer>
            <SectionTitle>Online</SectionTitle>
            <SectionContent>
              <div className="flex flex-col space-y-3">
               
                <TableRow
                  href={"mailto:harsorasagar04@gmail.com"}
                  title={"Email"}
                  subtitle={"Send"}
                  date={""}
                />
                <TableRow
                  href={"https://github.com/sagarrh"}
                  title={"Github"}
                  subtitle={"Follow"}
                  date={""}
                />
                <TableRow
                  href={"https://twitter.com/SagarHarsora13"}
                  title={"Twitter"}
                  subtitle={"Follow"}
                  date={""}
                />
                 <TableRow
                  href={"https://instagram.com/sagarr.h"}
                  title={"Instagram"}
                  subtitle={"Follow"}
                  date={""}
                />
              </div>
            </SectionContent>
          </SectionContainer>

          <SectionContainer>
            <SectionTitle>Music</SectionTitle>
            <SectionContent>
              <iframe
                className="rounded-xl"
                src="https://open.spotify.com/embed/playlist/2a18vHH0uJsjNHgcUE2nVX?utm_source=generator"
                width="100%"
                height="380"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              ></iframe>
              
            </SectionContent>
          </SectionContainer>

          {/* <SectionContainer>
            <SectionTitle>
            <SectionContent>
              <div className="text-secondary -mb-6 leading-relaxed">
                <p className="mb-3"><pre className="space-y-12 pb-24 md:space-y-16 md:pb-4">© 2026 Sagar Harsora</pre></p>
                </div>
              
           </SectionContent>
           </SectionTitle>
          </SectionContainer> */}
           <SectionContainer>
            <SectionTitle />
            <SectionContent>
              <div className="text-secondary -mb-6 leading-relaxed">
                <p className="mb-3">
                  © 2026 Sagar Harsora
                </p>
               
              </div>
            </SectionContent>
          </SectionContainer>
        
       
        </div>
        
      </div>
      
    </div>
  );
}
