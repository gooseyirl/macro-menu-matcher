// Nutritional data for fast food menu items.
// All values per serving. Sources: official chain nutrition pages.
// Fields: kcal, protein (g), carbs (g), fat (g), fibre (g)
// glutenFree: true = no gluten-containing ingredients per official allergen info.
//             Does NOT mean certified GF — cross-contamination risk always exists
//             in fast food kitchens. See gluten-free.html for full disclaimer.

const menuData = [
    // ── McDonald's ───────────────────────────────────────────────────────────
    // Source: https://www.mcdonalds.com/ie/en-ie/eat/nutritioninfo.html
    // GF note: fries contain no gluten ingredients but are cooked in shared oil.
    { chain: "McDonald's", item: "Big Mac",                    kcal: 508, protein: 25, carbs: 43, fat: 25, fibre: 3,  glutenFree: false },
    { chain: "McDonald's", item: "Quarter Pounder with Cheese",kcal: 510, protein: 31, carbs: 40, fat: 25, fibre: 3,  glutenFree: false },
    { chain: "McDonald's", item: "McChicken Sandwich",         kcal: 388, protein: 19, carbs: 41, fat: 16, fibre: 2,  glutenFree: false },
    { chain: "McDonald's", item: "Filet-O-Fish",               kcal: 329, protein: 15, carbs: 34, fat: 14, fibre: 2,  glutenFree: false },
    { chain: "McDonald's", item: "Cheeseburger",               kcal: 297, protein: 15, carbs: 28, fat: 13, fibre: 2,  glutenFree: false },
    { chain: "McDonald's", item: "Double Cheeseburger",        kcal: 418, protein: 25, carbs: 29, fat: 21, fibre: 2,  glutenFree: false },
    { chain: "McDonald's", item: "McFlurry Oreo (Regular)",    kcal: 340, protein: 8,  carbs: 52, fat: 11, fibre: 1,  glutenFree: false },
    { chain: "McDonald's", item: "Medium Fries",               kcal: 337, protein: 4,  carbs: 44, fat: 16, fibre: 4,  glutenFree: true  },
    { chain: "McDonald's", item: "Chicken McNuggets x6",       kcal: 259, protein: 15, carbs: 16, fat: 15, fibre: 1,  glutenFree: false },
    { chain: "McDonald's", item: "Chicken McNuggets x9",       kcal: 389, protein: 23, carbs: 24, fat: 22, fibre: 1,  glutenFree: false },

    // ── Subway ───────────────────────────────────────────────────────────────
    // Source: https://www.subway.com/en-IE/MenuNutrition/Nutrition
    // GF bread available in Ireland. GF subs marked accordingly.
    // Standard Italian bread subs:
    { chain: "Subway", item: "6\" Chicken Teriyaki",           kcal: 331, protein: 26, carbs: 48, fat: 5,  fibre: 3,  glutenFree: false },
    { chain: "Subway", item: "6\" Turkey Breast",              kcal: 280, protein: 22, carbs: 43, fat: 4,  fibre: 3,  glutenFree: false },
    { chain: "Subway", item: "6\" Veggie Delite",              kcal: 200, protein: 9,  carbs: 38, fat: 2,  fibre: 4,  glutenFree: false },
    { chain: "Subway", item: "6\" Meatball Marinara",          kcal: 480, protein: 23, carbs: 57, fat: 19, fibre: 4,  glutenFree: false },
    { chain: "Subway", item: "6\" Tuna",                       kcal: 430, protein: 22, carbs: 40, fat: 22, fibre: 3,  glutenFree: false },
    { chain: "Subway", item: "6\" BLT",                        kcal: 310, protein: 16, carbs: 40, fat: 10, fibre: 3,  glutenFree: false },
    { chain: "Subway", item: "6\" Steak & Cheese",             kcal: 380, protein: 30, carbs: 44, fat: 11, fibre: 3,  glutenFree: false },
    // GF bread subs (GF base: ~190 kcal, 3g protein, 42g carbs, 2g fat, 1g fibre):
    { chain: "Subway", item: "6\" Chicken Teriyaki — GF bread",kcal: 322, protein: 23, carbs: 52, fat: 4,  fibre: 2,  glutenFree: true  },
    { chain: "Subway", item: "6\" Turkey Breast — GF bread",   kcal: 271, protein: 19, carbs: 47, fat: 3,  fibre: 2,  glutenFree: true  },
    { chain: "Subway", item: "6\" Veggie Delite — GF bread",   kcal: 191, protein: 6,  carbs: 42, fat: 1,  fibre: 3,  glutenFree: true  },
    { chain: "Subway", item: "6\" Tuna — GF bread",            kcal: 421, protein: 19, carbs: 44, fat: 21, fibre: 2,  glutenFree: true  },
    { chain: "Subway", item: "6\" BLT — GF bread",             kcal: 301, protein: 13, carbs: 44, fat: 9,  fibre: 2,  glutenFree: true  },
    { chain: "Subway", item: "6\" Steak & Cheese — GF bread",  kcal: 371, protein: 27, carbs: 48, fat: 10, fibre: 2,  glutenFree: true  },

    // ── Burger King ──────────────────────────────────────────────────────────
    // Source: https://www.burgerking.ie/nutrition
    // GF note: fries contain no gluten ingredients but shared fryers used.
    { chain: "Burger King", item: "Whopper",                   kcal: 657, protein: 31, carbs: 50, fat: 38, fibre: 3,  glutenFree: false },
    { chain: "Burger King", item: "Whopper Jr",                kcal: 379, protein: 19, carbs: 32, fat: 19, fibre: 2,  glutenFree: false },
    { chain: "Burger King", item: "Double Whopper",            kcal: 901, protein: 53, carbs: 51, fat: 57, fibre: 3,  glutenFree: false },
    { chain: "Burger King", item: "Chicken Royale",            kcal: 588, protein: 25, carbs: 56, fat: 31, fibre: 3,  glutenFree: false },
    { chain: "Burger King", item: "Veggie Bean Burger",        kcal: 466, protein: 17, carbs: 58, fat: 18, fibre: 7,  glutenFree: false },
    { chain: "Burger King", item: "Medium Onion Rings",        kcal: 320, protein: 5,  carbs: 40, fat: 16, fibre: 2,  glutenFree: false },
    { chain: "Burger King", item: "Medium Fries",              kcal: 361, protein: 4,  carbs: 47, fat: 18, fibre: 3,  glutenFree: true  },

    // ── KFC ─────────────────────────────────────────────────────────────────
    // Source: https://www.kfc.ie/nutrition
    // GF note: all chicken is breaded. Corn Cob contains no gluten ingredients.
    { chain: "KFC", item: "Original Recipe Fillet Burger",     kcal: 490, protein: 32, carbs: 43, fat: 19, fibre: 3,  glutenFree: false },
    { chain: "KFC", item: "Zinger Burger",                     kcal: 450, protein: 27, carbs: 46, fat: 17, fibre: 3,  glutenFree: false },
    { chain: "KFC", item: "Tower Burger",                      kcal: 565, protein: 34, carbs: 46, fat: 25, fibre: 3,  glutenFree: false },
    { chain: "KFC", item: "3 piece Original Recipe",           kcal: 518, protein: 44, carbs: 22, fat: 28, fibre: 1,  glutenFree: false },
    { chain: "KFC", item: "Popcorn Chicken (Large)",           kcal: 443, protein: 29, carbs: 34, fat: 21, fibre: 1,  glutenFree: false },
    { chain: "KFC", item: "Regular Fries",                     kcal: 290, protein: 4,  carbs: 38, fat: 13, fibre: 3,  glutenFree: false },
    { chain: "KFC", item: "Corn Cob",                          kcal: 130, protein: 4,  carbs: 24, fat: 3,  fibre: 3,  glutenFree: true  },

    // ── Five Guys ────────────────────────────────────────────────────────────
    // Source: https://www.fiveguys.co.uk/nutritional-information (IE same menu)
    // GF note: fries are cooked in dedicated peanut oil fryers (no shared oil).
    //          Burgers/hotdog can be served bunless in a bowl — see GF entries below.
    { chain: "Five Guys", item: "Hamburger",                   kcal: 605, protein: 34, carbs: 41, fat: 34, fibre: 2,  glutenFree: false },
    { chain: "Five Guys", item: "Cheeseburger",                kcal: 677, protein: 38, carbs: 42, fat: 39, fibre: 2,  glutenFree: false },
    { chain: "Five Guys", item: "Bacon Burger",                kcal: 657, protein: 38, carbs: 41, fat: 37, fibre: 2,  glutenFree: false },
    { chain: "Five Guys", item: "Little Hamburger",            kcal: 381, protein: 20, carbs: 28, fat: 20, fibre: 1,  glutenFree: false },
    { chain: "Five Guys", item: "Little Cheeseburger",         kcal: 417, protein: 22, carbs: 28, fat: 23, fibre: 1,  glutenFree: false },
    { chain: "Five Guys", item: "Veggie Sandwich",             kcal: 440, protein: 15, carbs: 60, fat: 17, fibre: 5,  glutenFree: false },
    { chain: "Five Guys", item: "Regular Fries",               kcal: 528, protein: 8,  carbs: 71, fat: 24, fibre: 5,  glutenFree: true  },
    { chain: "Five Guys", item: "Little Fries",                kcal: 302, protein: 5,  carbs: 41, fat: 14, fibre: 3,  glutenFree: true  },
    // Bunless / bowl options (no bun = subtract bun macros from standard burger)
    { chain: "Five Guys", item: "Hamburger (bunless)",         kcal: 490, protein: 32, carbs: 7,  fat: 34, fibre: 0,  glutenFree: true  },
    { chain: "Five Guys", item: "Cheeseburger (bunless)",      kcal: 562, protein: 36, carbs: 8,  fat: 39, fibre: 0,  glutenFree: true  },
    { chain: "Five Guys", item: "Bacon Burger (bunless)",      kcal: 542, protein: 36, carbs: 7,  fat: 37, fibre: 0,  glutenFree: true  },
    { chain: "Five Guys", item: "Little Hamburger (bunless)",  kcal: 266, protein: 18, carbs: 4,  fat: 20, fibre: 0,  glutenFree: true  },
    { chain: "Five Guys", item: "Little Cheeseburger (bunless)",kcal: 302, protein: 20, carbs: 4,  fat: 23, fibre: 0,  glutenFree: true  },
    { chain: "Five Guys", item: "Hotdog (bunless)",            kcal: 320, protein: 14, carbs: 2,  fat: 28, fibre: 0,  glutenFree: true  },

    // ── Nando's ──────────────────────────────────────────────────────────────
    // Source: https://www.nandos.ie/food/nutrition
    // Chicken served plain (no sauce adds negligible macros).
    { chain: "Nando's", item: "1/4 Chicken Breast",            kcal: 249, protein: 34, carbs: 1,  fat: 12, fibre: 0,  glutenFree: true  },
    { chain: "Nando's", item: "1/2 Chicken",                   kcal: 497, protein: 68, carbs: 2,  fat: 24, fibre: 0,  glutenFree: true  },
    { chain: "Nando's", item: "Chicken Butterfly",             kcal: 356, protein: 54, carbs: 2,  fat: 15, fibre: 0,  glutenFree: true  },
    { chain: "Nando's", item: "Chicken Breast Fillet Burger",  kcal: 484, protein: 42, carbs: 44, fat: 14, fibre: 2,  glutenFree: false },
    { chain: "Nando's", item: "Fino Pitta",                    kcal: 521, protein: 40, carbs: 51, fat: 16, fibre: 3,  glutenFree: false },
    { chain: "Nando's", item: "Regular PERi-PERi Chips",       kcal: 390, protein: 6,  carbs: 53, fat: 17, fibre: 5,  glutenFree: true  },
    { chain: "Nando's", item: "Macho Peas",                    kcal: 174, protein: 10, carbs: 17, fat: 6,  fibre: 6,  glutenFree: true  },
    { chain: "Nando's", item: "Coleslaw",                      kcal: 187, protein: 1,  carbs: 11, fat: 15, fibre: 2,  glutenFree: true  },
    { chain: "Nando's", item: "Corn on the Cob",               kcal: 168, protein: 5,  carbs: 27, fat: 5,  fibre: 3,  glutenFree: true  },

    // ── Shake Shack ──────────────────────────────────────────────────────────
    // Source: https://www.shakeshack.com/nutrition/ (EU menu, Dublin locations)
    { chain: "Shake Shack", item: "ShackBurger",               kcal: 460, protein: 22, carbs: 29, fat: 29, fibre: 1,  glutenFree: false },
    { chain: "Shake Shack", item: "SmokeShack",                kcal: 590, protein: 30, carbs: 30, fat: 39, fibre: 1,  glutenFree: false },
    { chain: "Shake Shack", item: "'Shroom Burger",            kcal: 490, protein: 22, carbs: 44, fat: 26, fibre: 3,  glutenFree: false },
    { chain: "Shake Shack", item: "Chicken Shack",             kcal: 470, protein: 30, carbs: 44, fat: 19, fibre: 2,  glutenFree: false },
    { chain: "Shake Shack", item: "Chick'n Bites (6pc)",       kcal: 340, protein: 21, carbs: 24, fat: 17, fibre: 1,  glutenFree: false },
    { chain: "Shake Shack", item: "Crinkle Cut Fries",         kcal: 440, protein: 7,  carbs: 59, fat: 20, fibre: 5,  glutenFree: true  },
    { chain: "Shake Shack", item: "Chocolate Shake",           kcal: 640, protein: 14, carbs: 88, fat: 27, fibre: 1,  glutenFree: false },

    // ── Supermac's ──────────────────────────────────────────────────────────
    // Source: https://www.supermacs.ie/nutrition/
    { chain: "Supermac's", item: "Supermac's Burger",          kcal: 552, protein: 28, carbs: 47, fat: 27, fibre: 3,  glutenFree: false },
    { chain: "Supermac's", item: "Chicken Fillet Burger",      kcal: 497, protein: 31, carbs: 49, fat: 19, fibre: 3,  glutenFree: false },
    { chain: "Supermac's", item: "Taco Fries",                 kcal: 610, protein: 22, carbs: 68, fat: 28, fibre: 5,  glutenFree: false },
    { chain: "Supermac's", item: "Regular Chips",              kcal: 320, protein: 5,  carbs: 45, fat: 14, fibre: 4,  glutenFree: true  },
    { chain: "Supermac's", item: "Snack Box",                  kcal: 730, protein: 35, carbs: 70, fat: 34, fibre: 4,  glutenFree: false },
    { chain: "Supermac's", item: "Quarter Pounder",            kcal: 487, protein: 27, carbs: 38, fat: 24, fibre: 2,  glutenFree: false },

    // ── Leon ────────────────────────────────────────────────────────────────
    // Source: https://leon.co/nutrition/ (IE locations same menu as UK)
    { chain: "Leon", item: "Chicken Caesar Wrap",              kcal: 422, protein: 32, carbs: 38, fat: 14, fibre: 4,  glutenFree: false },
    { chain: "Leon", item: "Classic Falafel Wrap",             kcal: 480, protein: 16, carbs: 62, fat: 18, fibre: 8,  glutenFree: false },
    { chain: "Leon", item: "Grilled Chicken Rice Box",         kcal: 460, protein: 38, carbs: 52, fat: 10, fibre: 4,  glutenFree: true  },
    { chain: "Leon", item: "Falafel Rice Box",                 kcal: 490, protein: 14, carbs: 70, fat: 16, fibre: 9,  glutenFree: true  },
    { chain: "Leon", item: "Sweet Potato Fries",               kcal: 290, protein: 4,  carbs: 42, fat: 12, fibre: 5,  glutenFree: true  },
    { chain: "Leon", item: "Superfood Salad",                  kcal: 310, protein: 12, carbs: 28, fat: 16, fibre: 7,  glutenFree: true  },

    // ── Pret a Manger ────────────────────────────────────────────────────────
    // Source: https://www.pret.com/en-IE/nutritional-information
    { chain: "Pret a Manger", item: "Classic Super Club",      kcal: 430, protein: 30, carbs: 38, fat: 16, fibre: 4,  glutenFree: false },
    { chain: "Pret a Manger", item: "Chicken Caesar Baguette", kcal: 476, protein: 32, carbs: 52, fat: 15, fibre: 3,  glutenFree: false },
    { chain: "Pret a Manger", item: "Tuna & Cucumber Baguette",kcal: 390, protein: 24, carbs: 51, fat: 9,  fibre: 3,  glutenFree: false },
    { chain: "Pret a Manger", item: "Hummus & Falafel Wrap",   kcal: 436, protein: 14, carbs: 56, fat: 17, fibre: 8,  glutenFree: false },
    { chain: "Pret a Manger", item: "Egg & Crayfish Roll",     kcal: 328, protein: 19, carbs: 34, fat: 11, fibre: 2,  glutenFree: false },
    { chain: "Pret a Manger", item: "Porridge with Honey",     kcal: 319, protein: 9,  carbs: 55, fat: 7,  fibre: 4,  glutenFree: false },
    { chain: "Pret a Manger", item: "Chicken & Avocado Salad", kcal: 298, protein: 27, carbs: 10, fat: 17, fibre: 4,  glutenFree: true  },
    { chain: "Pret a Manger", item: "Green Goddess Salad",     kcal: 214, protein: 8,  carbs: 18, fat: 12, fibre: 6,  glutenFree: true  },

    // ── Domino's ────────────────────────────────────────────────────────────
    // Source: https://www.dominos.ie/pages/nutrition
    // Per slice (1/8 of a large pizza)
    // GF base available in Ireland. GF entries use Domino's GF base macros.
    { chain: "Domino's", item: "Pepperoni Passion — classic crust (per slice)", kcal: 234, protein: 11, carbs: 26, fat: 9,  fibre: 1,  glutenFree: false },
    { chain: "Domino's", item: "Margherita — classic crust (per slice)",        kcal: 180, protein: 8,  carbs: 25, fat: 6,  fibre: 1,  glutenFree: false },
    { chain: "Domino's", item: "Chicken Feast — classic crust (per slice)",     kcal: 196, protein: 12, carbs: 24, fat: 6,  fibre: 1,  glutenFree: false },
    { chain: "Domino's", item: "Vegi Supreme — classic crust (per slice)",      kcal: 178, protein: 8,  carbs: 25, fat: 5,  fibre: 2,  glutenFree: false },
    { chain: "Domino's", item: "Garlic Bread (4 pieces)",                       kcal: 340, protein: 9,  carbs: 54, fat: 10, fibre: 2,  glutenFree: false },
    // Gluten-free base options (per slice, 1/8 of a medium GF pizza)
    { chain: "Domino's", item: "Margherita — GF base (per slice)",              kcal: 156, protein: 7,  carbs: 20, fat: 5,  fibre: 1,  glutenFree: true  },
    { chain: "Domino's", item: "Pepperoni — GF base (per slice)",               kcal: 191, protein: 9,  carbs: 21, fat: 8,  fibre: 1,  glutenFree: true  },
    { chain: "Domino's", item: "Chicken Feast — GF base (per slice)",           kcal: 168, protein: 10, carbs: 19, fat: 6,  fibre: 1,  glutenFree: true  },
    { chain: "Domino's", item: "Vegi Supreme — GF base (per slice)",            kcal: 152, protein: 7,  carbs: 20, fat: 5,  fibre: 2,  glutenFree: true  },
];
