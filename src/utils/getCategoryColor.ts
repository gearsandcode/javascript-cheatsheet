// Category color mapping
export const getCategoryColor = (
  category: string
): { bg: string; text: string } => {
  switch (category.toLowerCase()) {
    // Core language features - warm colors
    case "arrays":
      return { bg: "bg-red-100", text: "text-red-800" };
    case "objects":
      return { bg: "bg-rose-100", text: "text-rose-800" };
    case "strings":
      return { bg: "bg-orange-100", text: "text-orange-800" };
    case "numbers":
      return { bg: "bg-amber-100", text: "text-amber-800" };
    case "fundamentals":
      return { bg: "bg-yellow-100", text: "text-yellow-800" };
    case "state management":
      return { bg: "bg-lime-100", text: "text-lime-800" };

    // Advanced features - cool colors
    case "async":
      return { bg: "bg-purple-100", text: "text-purple-800" };
    case "es6":
      return { bg: "bg-indigo-100", text: "text-indigo-800" };
    case "oop":
      return { bg: "bg-blue-100", text: "text-blue-800" };
    case "patterns":
      return { bg: "bg-cyan-100", text: "text-cyan-800" };

    // Web specific
    case "dom":
      return { bg: "bg-lime-100", text: "text-lime-800" };
    case "performance":
      return { bg: "bg-emerald-100", text: "text-emerald-800" };

    // Framework specific
    case "react":
      return { bg: "bg-sky-100", text: "text-sky-800" };
    case "typescript":
      return { bg: "bg-violet-100", text: "text-violet-800" };

    // Meta categories
    case "best practices":
      return { bg: "bg-green-100", text: "text-green-800" };
    case "error handling":
      return { bg: "bg-rose-100", text: "text-rose-800" };
    case "debugging":
      return { bg: "bg-pink-100", text: "text-pink-800" };
    case "architecture":
      return { bg: "bg-fuchsia-100", text: "text-fuchsia-800" };

    // TypeScript specific
    case "types":
      return { bg: "bg-slate-100", text: "text-slate-800" };
    case "generics":
      return { bg: "bg-teal-100", text: "text-teal-800" };

    // Comparison categories
    case "comparison":
      return { bg: "bg-zinc-100", text: "text-zinc-800" };
    case "frameworks":
      return { bg: "bg-neutral-100", text: "text-neutral-800" };

    default:
      return { bg: "bg-gray-100", text: "text-gray-800" };
  }
};
