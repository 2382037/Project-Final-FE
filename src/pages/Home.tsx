import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Check, ChevronRight, Star } from "lucide-react";
// Removed: import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      

      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white via-gray-50 to-gray-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-3">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-900">
                    Shoes Shop
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    Find Your Best Shoes For Every Way Of Your Life.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Button size="lg" className="bg-black text-white hover:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
                    Explore Our Shoes
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
          
            </div>
          </div>
        </section>

        {/* Testimonials Section - No Links to change here */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                 <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">Testimonials</div>
                 <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">What Our Clients Say</h2>
                 <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                   Don't just take our word for it. Here's what our clients have to say about our shop.
                 </p>
               </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2 lg:gap-6">
              <Card className="border-gray-200 shadow-lg">
                 <CardHeader>
                   <div className="flex items-center gap-4">
                     <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-200 to-red-200 flex items-center justify-center">
                       <span className="text-xl font-semibold text-red-700">JD</span>
                     </div>
                     <div>
                       <CardTitle>Jane Doe</CardTitle>
                       <CardDescription>Lawyer</CardDescription>
                     </div>
                   </div>
                 </CardHeader>
                 <CardContent>
                   <div className="flex mb-3">
                     {[...Array(5)].map((_, i) => (
                       <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-500" />
                     ))}
                   </div>
                   <blockquote className="text-gray-600 border-l-4 border-gray-200 pl-4 italic">
                     "Their attention to detail and creative approach helped us stand out in a crowded market."
                   </blockquote>
                 </CardContent>
              </Card>
              <Card className="border-gray-200 shadow-lg">
                 <CardHeader>
                   <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center">
                       <span className="text-xl font-semibold text-blue-700">JS</span>
                     </div>
                     <div>
                       <CardTitle>John Smith</CardTitle>
                       <CardDescription>Artist</CardDescription>
                     </div>
                   </div>
                 </CardHeader>
                 <CardContent>
                   <div className="flex mb-3">
                     {[...Array(5)].map((_, i) => (
                       <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-500" />
                     ))}
                   </div>
                   <blockquote className="text-gray-600 border-l-4 border-gray-200 pl-4 italic">
                     "The level of professionalism and expertise is unmatched. They delivered a website that exceeded our expectations and has significantly improved our conversion rates."
                   </blockquote>
                 </CardContent>
              </Card>
            </div>
          </div>
        </section>

      
      </main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-12 px-4 md:px-6">
          <div className="col-span-2 lg:col-span-1 space-y-3">
            <h3 className="text-lg font-semibold">Shoe Shop</h3>
            <p className="text-sm text-gray-500">Creating exceptional digital experiences since 2010.</p>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-800">Company</h4>
            <ul className="space-y-2">
              <li>
                {/* Use <a> for standard links */}
                <a href="/about" className="text-sm text-gray-500 hover:text-gray-900 hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/careers" className="text-sm text-gray-500 hover:text-gray-900 hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="/blog" className="text-sm text-gray-500 hover:text-gray-900 hover:underline">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-800">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="/services/web-design" className="text-sm text-gray-500 hover:text-gray-900 hover:underline">
                  Web Design
                </a>
              </li>
              <li>
                <a href="/services/branding" className="text-sm text-gray-500 hover:text-gray-900 hover:underline">
                  Branding
                </a>
              </li>
              <li>
                <a href="/services/marketing" className="text-sm text-gray-500 hover:text-gray-900 hover:underline">
                  Digital Marketing
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-800">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="/portfolio" className="text-sm text-gray-500 hover:text-gray-900 hover:underline">
                  Portfolio
                </a>
              </li>
               <li>
                <a href="/contact" className="text-sm text-gray-500 hover:text-gray-900 hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/faq" className="text-sm text-gray-500 hover:text-gray-900 hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
           <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-800">Connect</h4>
            <ul className="space-y-2">
              <li>
                 {/* Use <a> for external links, add target blank */}
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-900 hover:underline">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-900 hover:underline">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-900 hover:underline">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="border-t bg-gray-50 py-4">
          <div className="container flex flex-col gap-2 items-center justify-between px-4 md:px-6 sm:flex-row">
            <p className="text-xs text-gray-500">© {new Date().getFullYear()} Shoe Shop. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="/privacy-policy" className="text-xs text-gray-500 hover:text-gray-900 hover:underline">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="text-xs text-gray-500 hover:text-gray-900 hover:underline">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}