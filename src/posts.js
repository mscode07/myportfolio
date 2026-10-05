const articleModules = import.meta.glob("./content/*.mdx", { eager: true });
const featuredOrder = [
  "danii-million-dollar-exit-starting-again",
  "pasha-forbes-to-indie-hacker",
  "building-in-public",
  "idea-to-product",
  "full-stack-journey",
];

function featuredPosition(slug) {
  const position = featuredOrder.indexOf(slug);
  // New articles follow explicitly featured posts until added to the list.
  return position === -1 ? featuredOrder.length : position;
}

export const posts = Object.values(articleModules)
  .map((article) => ({ ...article.meta, Content: article.default }))
  .sort(
    (first, second) =>
      featuredPosition(first.slug) - featuredPosition(second.slug),
  );
