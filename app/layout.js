// import './globals.css';
// import Navbar from '../components/Navbar';
// import Head from 'next/head';
// import AuthProvider from '../components/SessionProvider';
// import Footer from '@/components/Footer';

// export const metadata = {
//   title: 'Shop Homepage - Dekolust',
//   description: 'Der Ort, wo du deine Wunschdeko findest!',
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="de">
//       <Head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/assets/favicon.ico" />
//       </Head>
//       <body className="pt-16 bg-cover bg-repeat" style={{ backgroundImage: "url('/images/fliesen_1.jpg')" }}>
//         <AuthProvider>
//           <Navbar />
//           <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
//         </AuthProvider>
//         <Footer/>
//       </body>
//     </html>
//   );
// }



// app/layout.js
import './globals.css';
import Navbar from '../components/Navbar';
import Head from 'next/head';
import AuthProvider from '../components/SessionProvider';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/Toaster';

export const metadata = {
  title: 'Dekolust',
  description: 'Der Ort, wo du deine Wunschdeko findest!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      <body
        className="flex flex-col min-h-screen pt-16 bg-cover bg-repeat"
        style={{ backgroundImage: "url('/images/fliesen_1.jpg')" }}
      >
        <AuthProvider>
          <Navbar />
          <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </AuthProvider>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}