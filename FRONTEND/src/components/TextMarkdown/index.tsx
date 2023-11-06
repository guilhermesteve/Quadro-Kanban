import React from 'react';
import Markdown from "react-markdown";
import rehypeHighlight from 'rehype-highlight'
import { CodeStyled, PreStyled } from './styles';
import DOMPurify from 'dompurify';

interface TextMarkdownProps {
    content: string;
}

const TextMarkdown: React.FC<TextMarkdownProps> = ({ content }) => {
    const sanitizedMarkdown = DOMPurify.sanitize(content);
    return (

        <Markdown
            components={{
                code({ className, children, ...props }) {
                    return <PreStyled className={`${className}`}>
                        <CodeStyled {...props}>
                            {children}
                        </CodeStyled>
                    </PreStyled>
                },
            }}

            rehypePlugins={[rehypeHighlight]}>{sanitizedMarkdown}</Markdown>

    )
};

export default TextMarkdown;