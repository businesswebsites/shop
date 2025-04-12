// app/address/page.js
import AddressComponent from '@/components/AddressComponent'

export default function AddressPage({ orderSummary, user }) {
  return <AddressComponent orderSummary={orderSummary} user={user} />
}
