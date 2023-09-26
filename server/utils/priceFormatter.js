export function formatPrice(price) {
    if (price < 0.05) return "Free";
    if (price < 0.1) return "$";
    if (price < 0.2) return "$$";
    if (price <= 0.5) return "$$$";
    return "$$$$";
  }
  