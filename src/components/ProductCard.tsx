import { ShoppingCart, Heart, Eye, Star, Check } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

interface ProductVariant {
  color: string;
  colorHex: string;
  material?: string;
}

interface ProductSize {
  label: string;
  dimensions?: string;
  priceAdjustment?: number;
}

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
  reviewCount?: number;
  badge?: "New" | "Sale" | "Bestseller";
  discount?: number;
  variants?: ProductVariant[];
  sizes?: ProductSize[];
  inStock?: boolean;
  onAddToCart?: (options: {
    variant?: ProductVariant;
    size?: ProductSize;
    quantity: number;
  }) => void;
}

export function ProductCard({
  name,
  price,
  image,
  category,
  rating = 5,
  reviewCount = 0,
  badge,
  discount,
  variants = [],
  sizes = [],
  inStock = true,
  onAddToCart,
}: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    variants.length > 0 ? variants[0] : undefined
  );
  const [selectedSize, setSelectedSize] = useState<ProductSize | undefined>(
    sizes.length > 0 ? sizes[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const finalPrice = selectedSize?.priceAdjustment
    ? price + selectedSize.priceAdjustment
    : price;
  const discountedPrice = discount ? finalPrice * (1 - discount / 100) : finalPrice;

  const handleAddToCart = () => {
    if (!inStock) {
      toast.error("This item is currently out of stock");
      return;
    }
    
    onAddToCart?.({
      variant: selectedVariant,
      size: selectedSize,
      quantity,
    });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  return (
    <>
      <div className="group">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted mb-4">
          <ImageWithFallback
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className="bg-white/90 backdrop-blur-sm text-foreground px-3 py-1.5 rounded-full text-xs">
              {category}
            </span>
            {badge && (
              <Badge
                className={`
                  ${badge === "New" ? "bg-blue-500" : ""}
                  ${badge === "Sale" ? "bg-red-500" : ""}
                  ${badge === "Bestseller" ? "bg-amber-500" : ""}
                  text-white rounded-full px-3 py-1.5 text-xs
                `}
              >
                {badge}
              </Badge>
            )}
            {discount && discount > 0 && (
              <Badge className="bg-red-500 text-white rounded-full px-3 py-1.5 text-xs">
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="secondary"
              className="h-10 w-10 rounded-full shadow-lg"
              onClick={toggleFavorite}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-10 w-10 rounded-full shadow-lg"
              onClick={() => setIsQuickViewOpen(true)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          {/* Stock Status Overlay */}
          {!inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white px-4 py-2 bg-black/80 rounded-lg">
                Out of Stock
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="space-y-3">
          {/* Rating */}
          {reviewCount > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < rating ? "fill-amber-400 text-amber-400" : "text-stone-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({reviewCount})</span>
            </div>
          )}

          {/* Product Info */}
          <div>
            <h3 className="mb-1.5">{name}</h3>
            <div className="flex items-baseline gap-2">
              {discount && discount > 0 ? (
                <>
                  <p className="text-lg">
                    ${discountedPrice.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground line-through">
                    ${finalPrice.toLocaleString()}
                  </p>
                </>
              ) : (
                <p className="text-muted-foreground text-lg">
                  ${finalPrice.toLocaleString()}
                </p>
              )}
            </div>
          </div>

          {/* Color Variants */}
          {variants.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">
                Color: {selectedVariant?.color}
              </p>
              <div className="flex gap-2">
                {variants.map((variant) => (
                  <button
                    key={variant.color}
                    onClick={() => setSelectedVariant(variant)}
                    className={`
                      w-8 h-8 rounded-full border-2 transition-all
                      ${
                        selectedVariant?.color === variant.color
                          ? "border-stone-900 scale-110"
                          : "border-stone-300 hover:border-stone-400"
                      }
                    `}
                    style={{ backgroundColor: variant.colorHex }}
                    title={variant.color}
                  >
                    {selectedVariant?.color === variant.color && (
                      <Check className="h-4 w-4 text-white mx-auto drop-shadow" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Options */}
          {sizes.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Size</p>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      px-3 py-1.5 rounded-lg border text-xs transition-all
                      ${
                        selectedSize?.label === size.label
                          ? "border-stone-900 bg-stone-900 text-white"
                          : "border-stone-300 hover:border-stone-400"
                      }
                    `}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <Button
            className="w-full gap-2 rounded-full h-11"
            size="lg"
            onClick={handleAddToCart}
            disabled={!inStock}
          >
            <ShoppingCart className="h-4 w-4" />
            {inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </div>

      {/* Quick View Dialog */}
      <Dialog open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription className="sr-only">
            Quick view of {name} with detailed options
          </DialogDescription>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <ImageWithFallback
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <Badge variant="outline">{category}</Badge>
                {reviewCount > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < rating ? "fill-amber-400 text-amber-400" : "text-stone-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({reviewCount} reviews)
                    </span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                {discount && discount > 0 ? (
                  <>
                    <p className="text-3xl">${discountedPrice.toLocaleString()}</p>
                    <p className="text-xl text-muted-foreground line-through">
                      ${finalPrice.toLocaleString()}
                    </p>
                    <Badge className="bg-red-500 text-white">-{discount}%</Badge>
                  </>
                ) : (
                  <p className="text-3xl">${finalPrice.toLocaleString()}</p>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                Premium quality furniture crafted with attention to detail. Perfect for
                modern living spaces seeking both style and comfort.
              </p>

              {/* Variants */}
              {variants.length > 0 && (
                <div>
                  <p className="mb-3">
                    Color: <span className="font-medium">{selectedVariant?.color}</span>
                    {selectedVariant?.material && (
                      <span className="text-muted-foreground">
                        {" "}
                        • {selectedVariant.material}
                      </span>
                    )}
                  </p>
                  <div className="flex gap-3">
                    {variants.map((variant) => (
                      <button
                        key={variant.color}
                        onClick={() => setSelectedVariant(variant)}
                        className={`
                          w-12 h-12 rounded-lg border-2 transition-all flex items-center justify-center
                          ${
                            selectedVariant?.color === variant.color
                              ? "border-stone-900 scale-105"
                              : "border-stone-300 hover:border-stone-400"
                          }
                        `}
                        style={{ backgroundColor: variant.colorHex }}
                        title={`${variant.color}${variant.material ? ` - ${variant.material}` : ""}`}
                      >
                        {selectedVariant?.color === variant.color && (
                          <Check className="h-5 w-5 text-white drop-shadow" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {sizes.length > 0 && (
                <div>
                  <p className="mb-3">Size</p>
                  <div className="grid grid-cols-2 gap-3">
                    {sizes.map((size) => (
                      <button
                        key={size.label}
                        onClick={() => setSelectedSize(size)}
                        className={`
                          p-4 rounded-xl border text-left transition-all
                          ${
                            selectedSize?.label === size.label
                              ? "border-stone-900 bg-stone-50"
                              : "border-stone-300 hover:border-stone-400"
                          }
                        `}
                      >
                        <p className="font-medium text-sm">{size.label}</p>
                        {size.dimensions && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {size.dimensions}
                          </p>
                        )}
                        {size.priceAdjustment && size.priceAdjustment !== 0 && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {size.priceAdjustment > 0 ? "+" : ""}$
                            {size.priceAdjustment}
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <p className="mb-3">Quantity</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-stone-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-stone-100 transition-colors"
                    >
                      −
                    </button>
                    <span className="px-6 py-2 border-x border-stone-300 min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-stone-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  {inStock ? (
                    <span className="text-sm text-green-600 flex items-center gap-1">
                      <Check className="h-4 w-4" />
                      In Stock
                    </span>
                  ) : (
                    <span className="text-sm text-red-600">Out of Stock</span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  className="flex-1 gap-2 rounded-full h-12"
                  onClick={() => {
                    handleAddToCart();
                    setIsQuickViewOpen(false);
                  }}
                  disabled={!inStock}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-12 w-12 rounded-full"
                  onClick={toggleFavorite}
                >
                  <Heart
                    className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
                  />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
