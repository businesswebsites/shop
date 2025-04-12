// app/cart/page.js
import CartComponent from '@/components/CartComponent'

export default function CartPage({ cartData, user }) {
  return <CartComponent cartData={cartData} user={user} />
}
