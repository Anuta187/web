import React, { useState } from 'react';

const TextTruncator = ({ paragraphs = [] }) => {
  const [expandedParagraphs, setExpandedParagraphs] = useState([]);

  const handleExpandParagraph = (index) => {
    setExpandedParagraphs((prevExpandedParagraphs) => [
      ...prevExpandedParagraphs,
      index,
    ]);
  };

  const handleCollapseParagraph = (index) => {
    setExpandedParagraphs((prevExpandedParagraphs) =>
      prevExpandedParagraphs.filter((i) => i !== index)
    );
  };

  const renderedParagraphs = paragraphs.map((paragraph, index) => {
    const sentences = paragraph.split('. ');
    const firstSentence = sentences[0] + '.';
    const isExpanded = expandedParagraphs.includes(index);

    return (
      <p
        key={index}
        onClick={() =>
          isExpanded ? handleCollapseParagraph(index) : handleExpandParagraph(index)
        }
      >
        {isExpanded ? paragraph : `${firstSentence}..`}
      </p>
    );
  });

  return <div>{renderedParagraphs}</div>;
};

export default TextTruncator;
