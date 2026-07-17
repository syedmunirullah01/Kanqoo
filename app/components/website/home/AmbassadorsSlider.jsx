// "use client";
// import React, { useState, useEffect } from 'react';

// const imagesCol1 = [
//   '/image-abs-1.png',
//   '/image-abs-2.png',
//   '/image-abs-3.png',
//   '/image-abs-4.png',
// ];

// const imagesCol2 = [
//   '/image-abs-4.png',
//   '/image-abs-3.png',
//   '/image-abs-2.png',
//   '/image-abs-1.png',
// ];

// const testimonials = [
//   {
//     title: "Increased Our Reach by 500%",
//     text: "Working with Kanqoo's network of influencers has been a game-changer. We've seen a massive increase in brand awareness and our social media engagement is at an all-time high.",
//     author: "Jane Doe",
//     company: "FashionForward"
//   },
//   {
//     title: "Authentic & Engaging Content",
//     text: "The content created by the influencers is authentic and resonates with our target audience. It doesn't feel like advertising, it feels like a genuine recommendation.",
//     author: "John Smith",
//     company: "TechGadgets"
//   },
//   {
//     title: "Seamless Collaboration",
//     text: "The platform makes it incredibly easy to find and collaborate with influencers. The entire process is streamlined and efficient, saving us a lot of time and effort.",
//     author: "Emily White",
//     company: "EcoWellness"
//   }
// ];

// const MediaItem = ({ src }) => {
//   const isVideo = src.endsWith('.mp4');
//   return (
//     <div className="w-full h-auto object-cover rounded-lg shadow-md overflow-hidden bg-gray-200">
//       {isVideo ? (
//         <video src={src} autoPlay loop muted playsInline className="w-full h-full object-cover" />
//       ) : (
//         <img src={src} alt="" className="w-full h-full object-cover" />
//       )}
//     </div>
//   );
// };

// const ScrollingColumn = ({ images, animationClass }) => (
//   <div className="w-1/2 px-2">
//     <div className={`flex flex-col gap-4 ${animationClass}`}>
//       {[...images, ...images].map((src, index) => (
//         <MediaItem key={index} src={src} />
//       ))}
//     </div>
//   </div>
// );

// const AmbassadorsSlider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
//     }, 5000); // Change text every 5 seconds

//     return () => clearInterval(interval);
//   }, []);

//   const currentTestimonial = testimonials[currentIndex];

//   return (
//     <>
//       <section className="bg-[--color-white] py-16 md:py-24">
//         <div className="mx-auto max-w-6xl px-6">
//           <div className="text-center mb-12">
//             <h1 className="text-4xl md:text-5xl font-bold leading-tight">
//               <span className="text-[--color-primary] unbounded-600">Get genuine hype from creators</span>
//               <br />
//               <span className="text-[--color-secondary] unbounded-600">your audience already trusts</span>
//             </h1>
//           </div>
//           <div className="rounded-xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
//             {/* Left Side: Scrolling Images */}
//             <div className="relative h-[600px] md:h-auto overflow-hidden">
//               <div className="absolute inset-0 flex">
//                 {/* inner wrapper clipped, columns animate vertically using global classes */}
//                 <div className="w-1/2 px-2 overflow-hidden">
//                   <div className="scroll-up">
//                     {[...imagesCol1, ...imagesCol1, ...imagesCol1].map((src, index) => (
//                       <div key={index}>
//                         <img src={src} alt="" className="w-full h-40 md:h-48 object-cover rounded-lg shadow-md" />
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="w-1/2 px-2 overflow-hidden">
//                   <div className="scroll-down">
//                     {[...imagesCol2, ...imagesCol2, ...imagesCol2].map((src, index) => (
//                       <div key={index}>
//                         <img src={src} alt="" className="w-full h-40 md:h-48 object-cover rounded-lg shadow-md" />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Side: Changing Text */}
//             <div className="p-8 md:p-12 flex flex-col justify-center bg-slate-900 text-white">
//               <div key={currentIndex} className="testimonial-fade-enter-active">
//                 <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[--color-secondary]">
//                   {currentTestimonial.title}
//                 </h2>
//                 <p className="text-gray-300 text-lg mb-6">
//                   {currentTestimonial.text}
//                 </p>
//                 <div>
//                   <p className="font-bold text-white">{currentTestimonial.author}</p>
//                   <p className="text-gray-400">{currentTestimonial.company}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default AmbassadorsSlider;