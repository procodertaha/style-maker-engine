import { createFileRoute, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Star } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getProductBySlug, type Product } from "@/lib/products";
import { submitOrder } from "@/lib/order.functions";

function ProductDetailsPage() {
  const location = useLocation();
  const pathSlug = location.pathname.split("/").pop();
  const slug = pathSlug ?? undefined;
  const product = getProductBySlug(slug);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] ?? "");
  const [selectedImage, setSelectedImage] = useState(product?.gallery[0] ?? product?.image ?? "");
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  useEffect(() => {
    if (!product) return;
    const colorIndex = product.colors.findIndex((color) => color === selectedColor);
    const galleryIndex = colorIndex >= 0 && colorIndex < product.gallery.length ? colorIndex : 0;
    setSelectedImage(product.gallery[galleryIndex] ?? product.image);
  }, [product, selectedColor]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  const getColorStyle = (color: string) => {
    const value = color.toLowerCase();
    if (value.includes("black")) return { backgroundColor: "#111" };
    if (value.includes("white")) return { backgroundColor: "#f9fafb", borderColor: "#d1d5db" };
    if (value.includes("ivory")) return { backgroundColor: "#f8f0e3" };
    if (value.includes("champagne")) return { backgroundColor: "#f3e1c6" };
    if (value.includes("blush") || value.includes("pink")) return { backgroundColor: "#f4d6dd" };
    if (value.includes("mint") || value.includes("green")) return { backgroundColor: "#b7d8c6" };
    if (value.includes("navy")) return { backgroundColor: "#1f3a74" };
    if (value.includes("dusty rose")) return { backgroundColor: "#d9a5a3" };
    if (value.includes("gold")) return { backgroundColor: "#d4af37" };
    if (value.includes("coral")) return { backgroundColor: "#f88f70" };
    if (value.includes("olive")) return { backgroundColor: "#7f8a4f" };
    if (value.includes("taupe")) return { backgroundColor: "#b4a79a" };
    if (value.includes("beige")) return { backgroundColor: "#d8c6b9" };
    return { backgroundColor: "#cbd5e1" };
  };
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const submit = useServerFn(submitOrder);
  const mutation = useMutation({
    mutationFn: (data: unknown) => submit({ data }),
    onSuccess: () => {
      setIsOrderOpen(false);
      setShowSuccess(true);
      setOrderError(null);
      setCustomerName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setCity("");
      setQuantity(1);
      setNotes("");
    },
    onError: (err: Error) => {
      setOrderError(err.message || "Something went wrong while sending your order.");
    },
  });

  if (!product) {
    return (
      <main className="min-h-screen bg-surface font-sans text-ink">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-ink-soft">Product not found</p>
          <h1 className="mt-4 font-serif text-4xl">Sorry, this product is unavailable.</h1>
          <a
            href="/"
            className="mt-10 inline-flex items-center justify-center rounded-md bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-surface hover:bg-ink/90"
          >
            Back home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface font-sans text-ink">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">Home / Collections / Fashion</p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{product.name}</h1>
          </div>
          <a
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full border border-ink/10 bg-white px-6 text-sm font-semibold uppercase tracking-[0.3em] text-ink transition hover:border-ink/20 hover:bg-muted"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to shop
          </a>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-start">
            <div className="hidden lg:grid lg:grid-rows-5 lg:gap-3">
              {product.gallery.map((src, index) => (
                <button
                  key={`${product.slug}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(src)}
                  className={`overflow-hidden rounded-3xl border transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gold ${
                    selectedImage === src ? "border-ink bg-surface" : "border-ink/10 bg-muted"
                  }`}
                >
                  <img
                    src={src}
                    alt={`${product.name} gallery ${index + 1}`}
                    className="h-24 w-24 object-cover transition-transform duration-200 ease-in-out hover:scale-105"
                  />
                </button>
              ))}
            </div>

            <div className="overflow-hidden rounded-[2rem] bg-muted shadow-lg ring-1 ring-ink/5 max-h-[38rem]">
              <div className="relative aspect-[4/3] w-full lg:aspect-[16/11] xl:aspect-[4/3]">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 lg:hidden">
              {product.gallery.map((src, index) => (
                <button
                  key={`mobile-${product.slug}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(src)}
                  className={`overflow-hidden rounded-3xl border transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gold ${
                    selectedImage === src ? "border-ink bg-surface" : "border-ink/10 bg-muted"
                  }`}
                >
                  <img
                    src={src}
                    alt={`${product.name} gallery ${index + 1}`}
                    className="h-24 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <aside className="space-y-8 rounded-[2rem] border border-ink/5 bg-white p-8 shadow-sm">
            {showSuccess && (
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Success</p>
                <p className="mt-3 text-sm leading-6">
                  Thank you! Your order has been received. We will contact you shortly.
                </p>
              </div>
            )}

            <div className="space-y-6 border-b border-ink/10 pb-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-ink/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-ink">Premium</span>
                <span className="text-sm text-ink-soft">New season styles</span>
              </div>

              <div className="space-y-4">
                <div className="grid gap-2">
                  <p className="text-4xl font-semibold tracking-tight">{product.price}</p>
                  <p className="text-sm text-ink-soft">A timeless look with effortless tailoring.</p>
                </div>

                <div className="flex items-center gap-4 text-sm text-ink-soft">
                  <span className="inline-flex items-center gap-2 text-ink">
                    <Star className="h-4 w-4 text-gold" /> 4.8 • 122 reviews
                  </span>
                  <span className="inline-flex items-center gap-2">Free shipping</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm uppercase tracking-[0.35em] text-ink-soft">Color</p>
                  <span className="text-sm font-medium text-ink">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => {
                        setSelectedColor(color);
                        setSelectedImage(product.gallery[index] ?? product.image);
                      }}
                      className={`flex h-11 w-11 items-center justify-center rounded-full border transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gold ${
                        selectedColor === color
                          ? "border-ink shadow-sm"
                          : "border-ink/10"
                      }`}
                      style={getColorStyle(color)}
                      aria-label={`Select ${color}`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm uppercase tracking-[0.35em] text-ink-soft">Size</p>
                  <a href="#" className="text-sm font-medium text-ink-soft underline">Size guide</a>
                </div>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${
                        selectedSize === size
                          ? "border-ink bg-ink text-surface"
                          : "border-ink/10 bg-surface text-ink"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <div className="flex items-center gap-2 rounded-3xl border border-ink/10 bg-surface px-3 py-2 text-sm text-ink">
                  <button
                    type="button"
                    onClick={() => setQuantity((qty) => Math.max(1, qty - 1))}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition hover:border-ink/20"
                  >
                    -
                  </button>
                  <span className="min-w-[2.25rem] text-center text-base font-semibold">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((qty) => qty + 1)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition hover:border-ink/20"
                  >
                    +
                  </button>
                </div>

                <Dialog open={isOrderOpen} onOpenChange={setIsOrderOpen}>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex h-12 w-full items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold uppercase tracking-[0.3em] text-surface transition hover:bg-ink/90"
                    >
                      Order Now
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <div className="space-y-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-ink-soft">Order Form</p>
                          <h2 className="mt-2 text-2xl font-semibold">Submit your order</h2>
                        </div>
                      </div>

                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          setOrderError(null);
                          mutation.mutate({
                            name: customerName,
                            phone,
                            email,
                            city,
                            address,
                            productName: product.name,
                            size: selectedSize,
                            color: selectedColor,
                            quantity,
                            notes,
                          });
                        }}
                        className="space-y-4"
                      >
                        <div className="grid gap-4 sm:grid-cols-2">
                          <label className="space-y-2 text-sm text-ink">
                            <span className="font-semibold">Name</span>
                            <input
                              value={customerName}
                              onChange={(event) => setCustomerName(event.target.value)}
                              required
                              className="w-full rounded-3xl border border-ink/10 bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-ink"
                            />
                          </label>
                          <label className="space-y-2 text-sm text-ink">
                            <span className="font-semibold">Phone</span>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(event) => setPhone(event.target.value)}
                              required
                              className="w-full rounded-3xl border border-ink/10 bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-ink"
                            />
                          </label>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <label className="space-y-2 text-sm text-ink">
                            <span className="font-semibold">Email</span>
                            <input
                              type="email"
                              value={email}
                              onChange={(event) => setEmail(event.target.value)}
                              required
                              className="w-full rounded-3xl border border-ink/10 bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-ink"
                            />
                          </label>
                          <label className="space-y-2 text-sm text-ink">
                            <span className="font-semibold">City</span>
                            <input
                              value={city}
                              onChange={(event) => setCity(event.target.value)}
                              required
                              className="w-full rounded-3xl border border-ink/10 bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-ink"
                            />
                          </label>
                        </div>

                        <label className="space-y-2 text-sm text-ink">
                          <span className="font-semibold">Address</span>
                          <textarea
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            required
                            rows={3}
                            className="w-full rounded-3xl border border-ink/10 bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-ink"
                          />
                        </label>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <label className="space-y-2 text-sm text-ink">
                            <span className="font-semibold">Quantity</span>
                            <input
                              type="number"
                              min={1}
                              value={quantity}
                              onChange={(event) => setQuantity(Number(event.target.value))}
                              required
                              className="w-full rounded-3xl border border-ink/10 bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-ink"
                            />
                          </label>
                          <label className="space-y-2 text-sm text-ink">
                            <span className="font-semibold">Notes</span>
                            <input
                              value={notes}
                              onChange={(event) => setNotes(event.target.value)}
                              className="w-full rounded-3xl border border-ink/10 bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-ink"
                            />
                          </label>
                        </div>

                        {orderError ? (
                          <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
                            {orderError}
                          </div>
                        ) : null}

                        <div className="rounded-3xl border border-ink/10 bg-surface p-4">
                          <p className="text-xs uppercase tracking-[0.3em] text-ink-soft">Order details</p>
                          <p className="mt-2 text-sm text-ink">Product: {product.name}</p>
                          <p className="text-sm text-ink">Size: {selectedSize}</p>
                          <p className="text-sm text-ink">Color: {selectedColor}</p>
                          <p className="text-sm text-ink">Quantity: {quantity}</p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                          <button
                            type="submit"
                            className="inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-surface transition hover:bg-ink/90 sm:w-auto"
                          >
                            Submit Order
                          </button>
                        </div>
                      </form>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="rounded-[2rem] border border-ink/10 bg-surface p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">Product details</p>
              <p className="mt-4 text-sm leading-7 text-ink-soft">{product.description}</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export const Route = createFileRoute("/product/$slug")({
  component: ProductDetailsPage,
});
