// // app/address/AddressComponent.js
// 'use client'
// import Head from 'next/head'

// export default function AddressComponent({ orderSummary, user }) {
//   if (!user || !user.id) {
//     return <div>Benutzer nicht gefunden</div>; // Oder eine andere Fehleranzeige
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = Object.fromEntries(new FormData(e.target));
//     const res = await fetch('/api/address/pay', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });
//     // Weiteres Fehlerhandling bzw. Weiterleitung
//   };

//   return (
//     <>
//       <Head>
//         <title>Dekolust Bezahl- und Versandinformationen</title>
//       </Head>
//       <section>
//         <div className="container">
//           <h1>Bezahl- und Versandinformationen</h1>
//           <form onSubmit={handleSubmit}>
//             <input type="hidden" name="user_id" value={user.id} />
//             <div>
//               <label htmlFor="vorname">Vorname</label>
//               <input type="text" id="vorname" name="vorname" required />
//             </div>
//             <div>
//               <label htmlFor="nachname">Nachname</label>
//               <input type="text" id="nachname" name="nachname" required />
//             </div>
//             <div>
//               <label htmlFor="address">Straße / Hausnummer</label>
//               <input type="text" id="address" name="address" required />
//             </div>
//             <div>
//               <label htmlFor="plz">Postleitzahl</label>
//               <input type="number" id="plz" name="plz" required />
//             </div>
//             <div>
//               <label htmlFor="ort">Ort</label>
//               <input type="text" id="ort" name="ort" required />
//             </div>
//             <div>
//               <label htmlFor="email">E-Mail</label>
//               <input type="email" id="email" name="email" required />
//             </div>
//             <div>
//               <label htmlFor="phone">Telefonnummer</label>
//               <input type="number" id="phone" name="phone" required />
//             </div>
//             <button type="submit">Bezahlung abschließen</button>
//           </form>
//           <div>
//             <h2>Bestellübersicht</h2>
//             <p>Produkte im Wert von: {orderSummary.sum} €</p>
//             <p>Versandkosten: {orderSummary.shipping}</p>
//             <p>Gesamtpreis: {orderSummary.total} €</p>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
