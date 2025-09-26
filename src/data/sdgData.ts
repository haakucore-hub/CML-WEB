export interface SDG {
  id: number;
  title: string;
  color: string;
  icon: string;
}

export const sdgData: SDG[] = [
  { id: 1, title: "No Poverty", color: "#E5243B", icon: "👥" },
  { id: 2, title: "Zero Hunger", color: "#DDA63A", icon: "🍽️" },
  { id: 3, title: "Good Health", color: "#4C9F38", icon: "❤️" },
  { id: 4, title: "Quality Education", color: "#C5192D", icon: "📚" },
  { id: 5, title: "Gender Equality", color: "#FF3A21", icon: "⚖️" },
  { id: 6, title: "Clean Water", color: "#26BDE2", icon: "💧" },
  { id: 8, title: "Decent Work", color: "#A21942", icon: "💼" },
  { id: 10, title: "Reduced Inequalities", color: "#DD1367", icon: "🤝" },
  { id: 11, title: "Sustainable Cities", color: "#FD6925", icon: "🏙️" },
  { id: 15, title: "Life on Land", color: "#56C02B", icon: "🌱" },
];