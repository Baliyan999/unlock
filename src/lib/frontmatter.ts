export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  cover: string;
  slug: string;
  content: string;
}

export function parseFrontmatter(content: string): { frontmatter: Partial<BlogPost>; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, content };
  }
  
  const [, frontmatterText, contentText] = match;
  const frontmatter: Partial<BlogPost> = {};
  
  // Простой парсер front-matter
  const lines = frontmatterText.split('\n');
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = line.slice(0, colonIndex).trim();
    const value = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
    
    frontmatter[key as keyof BlogPost] = value;
  }
  
  return {
    frontmatter,
    content: contentText.trim()
  };
}
