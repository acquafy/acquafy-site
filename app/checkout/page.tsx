import { permanentRedirect } from "next/navigation";

// The cart and this page were replaced by the order page of the Acquafy Account: one product per order,
// configured on its product page. Old links land on the catalog (which follows the Buy Now flag).
export default function CheckoutPage() {
  permanentRedirect("/buy");
}
