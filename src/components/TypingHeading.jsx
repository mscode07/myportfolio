const INTRODUCTION = "Hey, I’m mscode";

// Keep the complete text in the document and reserve every letter's space.
// Only the visual copy animates, so screen readers hear one complete heading.
export function TypingHeading() {
  let characterIndex = 0;

  return (
    <h1 id="intro-title" className="hero-title typing-heading mt-6 font-display font-bold">
      <span className="sr-only">{INTRODUCTION}</span>
      <span aria-hidden="true">
        {INTRODUCTION.split(" ").map((word, wordIndex) => (
          <span key={word} className="typing-word">
            {wordIndex > 0 && " "}
            {Array.from(word).map((character, index) => (
              <span
                key={index}
                className="typing-character"
                style={{ animationDelay: `${200 + characterIndex++ * 70}ms` }}
              >
                {character}
              </span>
            ))}
          </span>
        ))}
        <span className="typing-caret" />
      </span>
    </h1>
  );
}
