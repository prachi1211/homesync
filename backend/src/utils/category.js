function inferCategory(name) {
  const n = name.toLowerCase();

  if (/(milk|cheese|yogurt|butter)/.test(n)) return "Dairy";
  if (/(apple|banana|spinach|onion|tomato|vegetable|fruit)/.test(n)) return "Produce";
  if (/(rice|pasta|bread|flour|cereal)/.test(n)) return "Pantry";
  if (/(chicken|beef|fish|egg)/.test(n)) return "Protein";
  if (/(soap|detergent|tissue|paper|clean)/.test(n)) return "Household";

  return "Other";
}

module.exports = { inferCategory };
