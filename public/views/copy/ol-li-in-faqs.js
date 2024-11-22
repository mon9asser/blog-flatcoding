const FaqsSection = ({ faqs_section }) => {
    const [isExpanded, setIsExpanded] = useState(faqs_section.map(() => false));
    const [hasPadding, setHasPadding] = useState(faqs_section.map(() => false));
  
    const toggleExpansion = (currentIndex) => {
      setIsExpanded((prevState) =>
        prevState.map((item, index) => (index === currentIndex ? !item : false))
      );
  
      setTimeout(() => {
        setHasPadding((prevState) =>
          prevState.map((item, index) =>
            index === currentIndex ? !item : false
          )
        );
      }, 300);
    };
  
    const parseShortcodes = (text) => {
      // Parse [bold]...[/bold]
      text = text.replace(/\[bold\](.*?)\[\/bold\]/g, (_, content) => {
        return `<b>${content}</b>`;
      });
  
      // Parse [a href='link']...[/a]
      text = text.replace(/\[a href=['"](.*?)['"]\](.*?)\[\/a\]/g, (_, href, content) => {
        return `<a href="${href}" target="_blank" rel="noopener noreferrer">${content}</a>`;
      });
  
      // Parse [li]...[/li]
      text = text.replace(/\[li\](.*?)\[\/li\]/g, (_, content) => {
        return `<li>${content}</li>`;
      });
  
      // Parse [ol]...[/ol]
      text = text.replace(/\[ol\](.*?)\[\/ol\]/gs, (_, content) => {
        return `<ol>${content}</ol>`;
      });
  
      // Parse [ul]...[/ul]
      text = text.replace(/\[ul\](.*?)\[\/ul\]/gs, (_, content) => {
        return `<ul>${content}</ul>`;
      });
  
      return text;
    };
  
    return (
      <div className="faqs-section">
        <h3>Frequently Asked Questions (FAQs)</h3>
        <ul>
          {faqs_section.map((faq, index) => {
            const answerParts = faq.answer.split(
              /\{\`\*class=['"]([^'"]+)['"]\*\s([^`]*)\`\}/g
            );
  
            const processedAnswer = answerParts.map((part, idx) => {
              if (idx % 3 === 0) {
                return part.split(/(?<!\|)\|(?!\|)/g).map((segment, i) => {
                  const inlineProcessed = segment
                    .split(/`([^`]*)`/g)
                    .map((inlinePart, j) => {
                      const parsedContent = parseShortcodes(inlinePart);
                      return j % 2 === 0 ? (
                        <span
                          key={`${idx}-${i}-${j}`}
                          dangerouslySetInnerHTML={{ __html: parsedContent }}
                        ></span>
                      ) : (
                        <code key={`${idx}-${i}-${j}`} className="inline-code">
                          {inlinePart}
                        </code>
                      );
                    });
                  return <p key={`${idx}-${i}`}>{inlineProcessed}</p>;
                });
              } else if (idx % 3 === 1) {
                const className = part;
                const codeValue = answerParts[idx + 1];
                return (
                  <Highlight key={idx} className={className}>
                    {codeValue}
                  </Highlight>
                );
              } else {
                return null;
              }
            });
  
            return (
              <li key={index}>
                <h4
                  style={{
                    borderBottomWidth: isExpanded[index] ? "1px" : "0",
                  }}
                  onClick={() => toggleExpansion(index)}
                  className="faq-question"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`faq-arrow ` + (isExpanded[index] ? "expanded" : "")}
                  ></span>
                </h4>
                <div
                  className="faq-answer"
                  ref={(el) => {
                    if (el && isExpanded[index]) {
                      el.style.maxHeight = `${el.scrollHeight}px`;
                    } else if (el) {
                      el.style.maxHeight = "0";
                    }
                  }}
                  style={{
                    overflow: "hidden",
                    transition: "max-height 0.3s ease, opacity 0.3s ease",
                    opacity: isExpanded[index] ? 1 : 0,
                  }}
                >
                  <div style={{ padding: "20px" }}>{processedAnswer}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };