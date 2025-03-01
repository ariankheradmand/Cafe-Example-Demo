import React from "react";
import {
  Coffee,
  CupSoda,
  Coffee as CoffeeHot,
  Smile,
  Soup,
  Candy,
  Sun,
  Sprout,
  IceCream,
  Dessert,
  Cherry,
  FlaskConical,
  Milk,
  Leaf,
  Citrus,
  Cookie,
  HelpCircle,
  CakeSlice,
  IceCream2,
  Lollipop,
  DrumstickLeg,
  Apple,
  Banana,
  Beef,
  Utensils,
  Wine,
  BadgeDollarSign,
  Sparkles,
  ThermometerSun,
} from "lucide-react";

export default function CategoryIcon({
  category,
  itemName = "",
  className = "w-16 h-16",
}) {
  // Normalizamos el nombre del item para facilitar las comparaciones
  const name = itemName.toLowerCase();

  // Determinar qué icono de lucide-react mostrar según la categoría
  switch (category) {
    case "قهوه گرم و سرد": // Hot and cold coffee
      if (name.includes("سرد")) {
        return <CupSoda className={className} />; // Cold coffee
      } else {
        return <Coffee className={className} />; // Hot coffee
      }

    case "نوشیدنی های سرد": // Cold drinks
      if (name.includes("آب") || name.includes("لیموناد")) {
        return <Citrus className={className} />; // Lemonade or water
      } else if (name.includes("نوشابه")) {
        return <Wine className={className} />; // Soda
      } else {
        return <CupSoda className={className} />; // Default cold drink
      }

    case "نوشیدنی های گرم": // Hot drinks
      if (name.includes("چای")) {
        return <Soup className={className} />; // Tea
      } else if (name.includes("شکلات")) {
        return <Dessert className={className} />; // Hot chocolate
      } else {
        return <CoffeeHot className={className} />; // Default hot drink
      }

    case "دمی بار": // Brewing bar
      return <Soup className={className} />;

    case "شیک": // Shake
      if (name.includes("شکلات")) {
        return <IceCream2 className={className} />; // Chocolate shake
      } else if (name.includes("توت") || name.includes("میوه")) {
        return <Lollipop className={className} />; // Berry or fruit shake
      } else if (name.includes("کارامل") || name.includes("وانیل")) {
        return <DrumstickLeg className={className} />; // Caramel or vanilla shake
      } else {
        return <Milk className={className} />; // Default shake
      }

    case "فصلی": // Seasonal
      if (name.includes("تابستان") || name.includes("بهار")) {
        return <ThermometerSun className={className} />; // Summer or spring
      } else if (name.includes("زمستان") || name.includes("پاییز")) {
        return <Sparkles className={className} />; // Winter or fall
      } else {
        return <Sun className={className} />; // Default seasonal
      }

    case "تاپینگ": // Topping
      // Usar diferentes iconos según el nombre del topping
      if (name.includes("شکلات") || name.includes("کاکائو")) {
        return <Cookie className={className} />; // Chocolate or cocoa
      } else if (name.includes("توت") || name.includes("فرنگی")) {
        return <Cherry className={className} />; // Strawberry or berry
      } else if (name.includes("سیروپ") || name.includes("شربت")) {
        return <FlaskConical className={className} />; // Syrup
      } else if (name.includes("خامه") || name.includes("کرم")) {
        return <IceCream className={className} />; // Cream
      } else if (name.includes("نعناع") || name.includes("دارچین")) {
        return <Leaf className={className} />; // Mint or cinnamon
      } else if (name.includes("لیمو") || name.includes("پرتقال")) {
        return <Citrus className={className} />; // Lemon or orange
      } else if (name.includes("کیک") || name.includes("بیسکویت")) {
        return <CakeSlice className={className} />; // Cake or biscuit
      } else if (name.includes("آجیل") || name.includes("مغز")) {
        return <Apple className={className} />; // Nuts
      } else if (name.includes("شکر") || name.includes("قند")) {
        return <Candy className={className} />; // Sugar
      } else if (name.includes("عسل")) {
        return <BadgeDollarSign className={className} />; // Honey
      } else if (name.includes("موز")) {
        return <Banana className={className} />; // Banana
      } else if (name.includes("پنیر")) {
        return <Beef className={className} />; // Cheese
      } else if (name.includes("دانه")) {
        return <Sprout className={className} />; // Seeds/grains
      } else {
        return <Utensils className={className} />; // Default topping
      }

    default:
      // Icono genérico para categorías no definidas
      return <HelpCircle className={className} />;
  }
}
