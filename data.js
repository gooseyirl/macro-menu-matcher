// Nutritional data for fast food menu items.
// All values per serving. Sources: official chain nutrition pages.
// Fields: kcal, protein (g), carbs (g), fat (g), fibre (g)

const menuData = [
    // ── McDonald's ───────────────────────────────────────────────────────────
    // Source: https://www.mcdonalds.com/ie/en-ie/eat/nutritioninfo.html
    { chain: "McDonald's", item: "Big Mac",                kcal: 508, protein: 25, carbs: 43, fat: 25, fibre: 3 },
    { chain: "McDonald's", item: "Quarter Pounder with Cheese", kcal: 510, protein: 31, carbs: 40, fat: 25, fibre: 3 },
    { chain: "McDonald's", item: "McChicken Sandwich",    kcal: 388, protein: 19, carbs: 41, fat: 16, fibre: 2 },
    { chain: "McDonald's", item: "Filet-O-Fish",          kcal: 329, protein: 15, carbs: 34, fat: 14, fibre: 2 },
    { chain: "McDonald's", item: "Cheeseburger",          kcal: 297, protein: 15, carbs: 28, fat: 13, fibre: 2 },
    { chain: "McDonald's", item: "Double Cheeseburger",   kcal: 418, protein: 25, carbs: 29, fat: 21, fibre: 2 },
    { chain: "McDonald's", item: "McFlurry Oreo (Regular)", kcal: 340, protein: 8,  carbs: 52, fat: 11, fibre: 1 },
    { chain: "McDonald's", item: "Medium Fries",          kcal: 337, protein: 4,  carbs: 44, fat: 16, fibre: 4 },
    { chain: "McDonald's", item: "Chicken McNuggets x6",  kcal: 259, protein: 15, carbs: 16, fat: 15, fibre: 1 },
    { chain: "McDonald's", item: "Chicken McNuggets x9",  kcal: 389, protein: 23, carbs: 24, fat: 22, fibre: 1 },

    // ── Subway ───────────────────────────────────────────────────────────────
    // Source: https://www.subway.com/en-IE/MenuNutrition/Nutrition
    // 6-inch subs on Italian bread
    { chain: "Subway", item: "6\" Chicken Teriyaki",      kcal: 331, protein: 26, carbs: 48, fat: 5,  fibre: 3 },
    { chain: "Subway", item: "6\" Turkey Breast",         kcal: 280, protein: 22, carbs: 43, fat: 4,  fibre: 3 },
    { chain: "Subway", item: "6\" Veggie Delite",         kcal: 200, protein: 9,  carbs: 38, fat: 2,  fibre: 4 },
    { chain: "Subway", item: "6\" Meatball Marinara",     kcal: 480, protein: 23, carbs: 57, fat: 19, fibre: 4 },
    { chain: "Subway", item: "6\" Tuna",                  kcal: 430, protein: 22, carbs: 40, fat: 22, fibre: 3 },
    { chain: "Subway", item: "6\" BLT",                   kcal: 310, protein: 16, carbs: 40, fat: 10, fibre: 3 },
    { chain: "Subway", item: "6\" Steak & Cheese",        kcal: 380, protein: 30, carbs: 44, fat: 11, fibre: 3 },

    // ── Burger King ──────────────────────────────────────────────────────────
    // Source: https://www.burgerking.ie/nutrition
    { chain: "Burger King", item: "Whopper",              kcal: 657, protein: 31, carbs: 50, fat: 38, fibre: 3 },
    { chain: "Burger King", item: "Whopper Jr",           kcal: 379, protein: 19, carbs: 32, fat: 19, fibre: 2 },
    { chain: "Burger King", item: "Double Whopper",       kcal: 901, protein: 53, carbs: 51, fat: 57, fibre: 3 },
    { chain: "Burger King", item: "Chicken Royale",       kcal: 588, protein: 25, carbs: 56, fat: 31, fibre: 3 },
    { chain: "Burger King", item: "Veggie Bean Burger",   kcal: 466, protein: 17, carbs: 58, fat: 18, fibre: 7 },
    { chain: "Burger King", item: "Medium Onion Rings",   kcal: 320, protein: 5,  carbs: 40, fat: 16, fibre: 2 },
    { chain: "Burger King", item: "Medium Fries",         kcal: 361, protein: 4,  carbs: 47, fat: 18, fibre: 3 },

    // ── KFC ─────────────────────────────────────────────────────────────────
    // Source: https://www.kfc.ie/nutrition
    { chain: "KFC", item: "Original Recipe Fillet Burger", kcal: 490, protein: 32, carbs: 43, fat: 19, fibre: 3 },
    { chain: "KFC", item: "Zinger Burger",                kcal: 450, protein: 27, carbs: 46, fat: 17, fibre: 3 },
    { chain: "KFC", item: "Tower Burger",                 kcal: 565, protein: 34, carbs: 46, fat: 25, fibre: 3 },
    { chain: "KFC", item: "3 piece Original Recipe",      kcal: 518, protein: 44, carbs: 22, fat: 28, fibre: 1 },
    { chain: "KFC", item: "Popcorn Chicken (Large)",      kcal: 443, protein: 29, carbs: 34, fat: 21, fibre: 1 },
    { chain: "KFC", item: "Regular Fries",                kcal: 290, protein: 4,  carbs: 38, fat: 13, fibre: 3 },
    { chain: "KFC", item: "Corn Cob",                     kcal: 130, protein: 4,  carbs: 24, fat: 3,  fibre: 3 },

    // ── Five Guys ────────────────────────────────────────────────────────────
    // Source: https://www.fiveguys.co.uk/nutritional-information (IE same menu)
    { chain: "Five Guys", item: "Hamburger",              kcal: 605, protein: 34, carbs: 41, fat: 34, fibre: 2 },
    { chain: "Five Guys", item: "Cheeseburger",           kcal: 677, protein: 38, carbs: 42, fat: 39, fibre: 2 },
    { chain: "Five Guys", item: "Bacon Burger",           kcal: 657, protein: 38, carbs: 41, fat: 37, fibre: 2 },
    { chain: "Five Guys", item: "Little Hamburger",       kcal: 381, protein: 20, carbs: 28, fat: 20, fibre: 1 },
    { chain: "Five Guys", item: "Little Cheeseburger",    kcal: 417, protein: 22, carbs: 28, fat: 23, fibre: 1 },
    { chain: "Five Guys", item: "Veggie Sandwich",        kcal: 440, protein: 15, carbs: 60, fat: 17, fibre: 5 },
    { chain: "Five Guys", item: "Regular Fries",          kcal: 528, protein: 8,  carbs: 71, fat: 24, fibre: 5 },
    { chain: "Five Guys", item: "Little Fries",           kcal: 302, protein: 5,  carbs: 41, fat: 14, fibre: 3 },

    // ── Domino's ────────────────────────────────────────────────────────────
    // Source: https://www.dominos.ie/pages/nutrition
    // Per slice (1/8 of a large pizza) on classic crust
    { chain: "Domino's", item: "Pepperoni Passion (per slice)", kcal: 234, protein: 11, carbs: 26, fat: 9,  fibre: 1 },
    { chain: "Domino's", item: "Margherita (per slice)",        kcal: 180, protein: 8,  carbs: 25, fat: 6,  fibre: 1 },
    { chain: "Domino's", item: "Chicken Feast (per slice)",     kcal: 196, protein: 12, carbs: 24, fat: 6,  fibre: 1 },
    { chain: "Domino's", item: "Vegi Supreme (per slice)",      kcal: 178, protein: 8,  carbs: 25, fat: 5,  fibre: 2 },
    { chain: "Domino's", item: "Garlic Bread (4 pieces)",       kcal: 340, protein: 9,  carbs: 54, fat: 10, fibre: 2 },
];
