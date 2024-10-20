import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const testimonials = [
  {
    name: "Jackson Hopkins",
    text: "I’ve used Serwaverse for a variety of services, from home cleaning to graphic design, and overall, I’ve been very impressed. The range of services is extensive, and the quality is generally high. My only gripe is that the service reviews can sometimes be a bit inconsistent. Still, it’s a fantastic resource for all kinds of needs.",
    rating: 5,
    image: "/jackson.png",
  },
  {
    name: "Marinda Walkers",
    text: "Serwaverse has been a game-changer for me! From finding a reliable plumber to booking a last-minute dog walker, this platform does it all.",
    rating: 4.5,
    image: "/marinda.png",
  },
  {
    name: "Jensony Kennedy",
    text: "Serwaverse is a decent platform with a lot of potential. I found the service I needed, but the booking process was a bit clunky. It took longer than expected to get a confirmation.",
    rating: 4,
    image: "/jensony.png",
  },
  {
    name: "Sophia Tank",
    text: "I’m absolutely thrilled with Serwaverse! I needed help with everything from fixing my car to setting up a home office, and this site had experts for every task. The service providers are top-notch, and the convenience of managing everything through one platform is unbeatable. I’ll definitely be using Serwaverse for all my future needs!",
    rating: 4.5,
    image: "/sophia.png",
  },
];

export default function Testimonials() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold">
          Don’t take our word, trust the real stories
        </h2>
        <p className="text-gray-600">
          Their experiences offer honest insights and a true picture of what to
          expect. Discover the difference through their voices.
        </p>
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="h-12 w-12 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="font-bold text-lg">{testimonial.name}</h3>
                <div className="flex">
                  {Array.from({ length: Math.floor(testimonial.rating) }).map(
                    (_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    )
                  )}
                  {testimonial.rating % 1 !== 0 && (
                    <FaStarHalfAlt className="text-yellow-500" />
                  )}
                </div>
              </div>
            </div>
            <p className="text-gray-600">{testimonial.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center text-sm">
        <a href="#" className="text-gray-600 hover:text-gray-900 mx-4">
          Privacy Policy
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900 mx-4">
          Terms of Service
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900 mx-4">
          Site Map
        </a>
      </div>
    </section>
  );
}
