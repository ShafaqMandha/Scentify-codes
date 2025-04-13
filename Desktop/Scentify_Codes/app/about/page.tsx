import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full">
        <Image
          src="/Perfume lab.jpg"
          alt="Perfume laboratory with glass bottles and ingredients"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Story</h1>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">The SCENTIFY Journey</h2>
            <p className="text-muted-foreground mb-4">
              Founded by three second-year Computer Systems Engineering students — Jannath Muheen, Shafaq 
              Mandha, and Muhammad Abdalla Bagosher — SCENTIFY started as a university project with a bold 
              vision: to redefine fragrance discovery using technology.
            </p>
            <p className="text-muted-foreground mb-4">
              Blending IoT, machine learning, and gas sensor technology, SCENTIFY transforms how perfumes are 
              identified and classified. By analyzing scent compositions with MQ sensors and AI-driven models, 
              our system delivers precise fragrance recommendations through an interactive web app.
            </p>
            <p className="text-muted-foreground mb-4">
              From a classroom idea to an innovative scent-matching experience, SCENTIFY bridges traditional 
              perfumery with cutting-edge technology, making fragrance selection smarter and more personalized 
              than ever.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/Nose.jpg"
              alt="Us"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 px-4 md:px-8 w-full bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission & Vision</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              At SCENTIFY, we believe that fragrance is more than just a scent—it's an experience, a memory, and a form
              of self-expression. Our mission is to revolutionize how people discover and experience fragrances through
              innovative technology and artisanal craftsmanship.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Artisanal Craftsmanship</h3>
              <p className="text-muted-foreground">
                Each fragrance is meticulously crafted by our team of skilled perfumers who blend traditional techniques
                with innovative approaches.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Technological Innovation</h3>
              <p className="text-muted-foreground">
                Our IoT-driven smart system uses MQ gas sensors and machine learning to analyze and classify perfumes,
                providing personalized recommendations based on molecular composition.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Inclusive Luxury</h3>
              <p className="text-muted-foreground">
                We believe that everyone deserves to experience exceptional fragrance, creating scents that transcend
                gender, age, and cultural boundaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Technology */}
      <section className="py-16 px-4 md:px-8 w-full bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center ombre-text">Our Technology</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">IoT-Driven Smart System</h3>
              <p className="text-muted-foreground mb-4">
                At the heart of SCENTIFY is our revolutionary smart system that uses MQ gas sensors (MQ-3, MQ-4, and
                MQ-135) to detect and classify volatile organic compounds (VOCs) in perfumes.
              </p>
              <p className="text-muted-foreground">
                These sensors continuously monitor fragrances in real-time, creating detailed scent profiles that are as
                unique as fingerprints. Our system can identify subtle notes and accords that might be imperceptible to
                the untrained nose.
              </p>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="/Iot sensors.jpg"
                alt="IoT sensor array for perfume detection"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[300px] rounded-lg overflow-hidden order-last md:order-first">
              <Image
                src="/ML_Firebase.jpg"
                alt="Machine learning analysis of perfume data"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Machine Learning & AI</h3>
              <p className="text-muted-foreground mb-4">
                Our system employs sophisticated machine learning algorithms, including Random Forest and SVM models, to
                analyze sensor data and identify patterns in scent compositions.
              </p>
              <p className="text-muted-foreground">
                This technology allows us to provide highly accurate fragrance recommendations based on molecular
                similarities rather than just marketing categories. The result is a personalized fragrance discovery
                experience that connects you with scents you'll truly love.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold mb-2">Hardware Components</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• MQ-3: Detects alcohol compounds</li>
                <li>• MQ-4: Detects methane & hydrocarbons</li>
                <li>• MQ-135: Detects VOCs & aromatics</li>
                <li>• ESP32 microcontroller for data processing</li>
              </ul>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold mb-2">Software Implementation</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Real-time data processing</li>
                <li>• Cloud-based storage with Firebase</li>
                <li>• Next.js & TypeScript web application</li>
                <li>• Responsive design with Tailwind CSS</li>
              </ul>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold mb-2">Key Features</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Accurate scent classification</li>
                <li>• Personalized recommendations</li>
                <li>• Real-time scent analysis</li>
                <li>• Continuously expanding fragrance database</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 px-4 md:px-8 w-full">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative h-[300px] w-[300px] mx-auto rounded-full overflow-hidden mb-4">
                <Image
                  src="/Janna_pic.jpg"
                  alt="Janna's Pic"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Jannath Muheen</h3>
              <p className="text-muted-foreground mb-2">AI & ML Engineer</p>
              <p className="text-sm text-muted-foreground">
                Jannath Muheen is a Computer Systems Engineering student with a strong interest in artificial intelligence and machine learning. 
                She contributed to the development of the machine learning models used in the Scentify platform, focusing on data preprocessing and model training.
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-[300px] w-[300px] mx-auto rounded-full overflow-hidden mb-4">
                <Image
                  src="/Mohd.B_pic.jpg"
                  alt="Mohd.B's Pic"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Muhammad Abdalla Bagosher</h3>
              <p className="text-muted-foreground mb-2">Hardware & Embedded Systems Engineer</p>
              <p className="text-sm text-muted-foreground">
                Muhammad Abdalla Bagosher is a Computer Systems Engineering student with a strong foundation in hardware design, embedded systems, 
                and IoT development. He played a crucial role in managing the hardware components of the Scentify project, ensuring seamless 
                integration between sensors, actuators, and the system's core functionalities.
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-[300px] w-[300px] mx-auto rounded-full overflow-hidden mb-4">
                <Image
                  src="/Shafaq_pic.jpg"
                  alt="Shafaq's Pic"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Shafaq Mandha</h3>
              <p className="text-muted-foreground mb-2">Software Engineer and Designer</p>
              <p className="text-sm text-muted-foreground">
                Shafaq is a Computer Systems Engineering student with a strong interest in software development and user experience. 
                She played a key role in designing and developing the Scentify platform, focusing on UI/UX and system integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Timeline */}
      <section className="py-16 px-4 md:px-8 w-full bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Current Project Timeline</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            We're currently developing the next generation of our scent detection technology. Follow our progress as we
            bring this innovative solution to life.
          </p>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-border transform md:-translate-x-1/2"></div>

            <div className="space-y-12">
              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                <div className="md:text-right md:pr-12">
                  <h3 className="text-xl font-semibold mb-2">March 9-19, 2025</h3>
                  <h4 className="text-lg font-medium mb-2 text-leaf-green">Research Phase</h4>
                  <p className="text-muted-foreground mb-2">
                    Initial brainstorming and idea development for our next-generation scent detection system.
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc md:list-none pl-4 md:pl-0 space-y-1">
                    <li>Brainstorming innovative approaches</li>
                    <li>Project proposal development</li>
                    <li>Hardware component research</li>
                  </ul>
                </div>
                <div className="hidden md:block"></div>
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-leaf-green rounded-full transform -translate-x-1.5 md:-translate-x-2 mt-1.5"></div>
              </div>

              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                <div className="hidden md:block"></div>
                <div className="md:pl-12">
                  <h3 className="text-xl font-semibold mb-2">March 19-April 3, 2025</h3>
                  <h4 className="text-lg font-medium mb-2 text-primary">Development Phase</h4>
                  <p className="text-muted-foreground mb-2">
                    Building and integrating the hardware and software components of our IoT-driven system.
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                    <li>Hardware design and development with MQ sensors</li>
                    <li>Software and ML algorithm implementation</li>
                    <li>Integration of hardware and software systems</li>
                  </ul>
                </div>
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1.5 md:-translate-x-2 mt-1.5"></div>
              </div>

              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                <div className="md:text-right md:pr-12">
                  <h3 className="text-xl font-semibold mb-2">April 3-10, 2025</h3>
                  <h4 className="text-lg font-medium mb-2 text-eucalyptus">Testing Phase</h4>
                  <p className="text-muted-foreground mb-2">
                    Final testing, refinement, and preparation for public demonstration.
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc md:list-none pl-4 md:pl-0 space-y-1">
                    <li>Prototype testing with various perfume samples</li>
                    <li>System refinement based on test results</li>
                    <li>Documentation and final demonstration preparation</li>
                  </ul>
                </div>
                <div className="hidden md:block"></div>
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-eucalyptus rounded-full transform -translate-x-1.5 md:-translate-x-2 mt-1.5"></div>
              </div>

              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                <div className="hidden md:block"></div>
                <div className="md:pl-12">
                  <h3 className="text-xl font-semibold mb-2">April 10, 2025</h3>
                  <h4 className="text-lg font-medium mb-2 text-accent">Launch Day</h4>
                  <p className="text-muted-foreground">
                    Official demonstration and launch of our next-generation scent detection technology, bringing
                    AI-powered fragrance recommendations to our customers.
                  </p>
                </div>
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-accent rounded-full transform -translate-x-1.5 md:-translate-x-2 mt-1.5"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 w-full">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 text-dark-forest dark:text-white">Experience SCENTIFY</h2>
          <p className="text-xl text-dark-forest/80 dark:text-white/80 mb-12 max-w-3xl mx-auto">
            Discover our collection of artisanal fragrances and find the scent that speaks to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Button
              asChild
              className="text-lg py-6 px-8 border-2 border-dark-forest text-dark-forest dark:border-white dark:text-white bg-transparent hover:bg-dark-forest hover:text-white dark:hover:bg-white dark:hover:text-dark-forest group"
            >
              <Link href="/products" className="flex items-center">
                Explore Our Collection
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild className="text-lg py-6 px-8 bg-blue-600 text-white hover:bg-blue-700">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

