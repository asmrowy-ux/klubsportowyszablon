// Helper to replace [KLUB] tag in plain strings
export function replaceClubTag(text: string | undefined | null, clubName: string): string {
  if (!text) return '';
  return text.replace(/\[KLUB\]/g, clubName || '');
}

// Helper to deeply replace [KLUB] tag in PortableText blocks
export function processPortableText(blocks: any[], clubName: string): any[] {
  if (!blocks || !Array.isArray(blocks)) return blocks;

  return blocks.map(block => {
    // If it's a standard text block with children (spans)
    if (block._type === 'block' && Array.isArray(block.children)) {
      return {
        ...block,
        children: block.children.map((child: any) => {
          if (child._type === 'span' && typeof child.text === 'string') {
            return {
              ...child,
              text: replaceClubTag(child.text, clubName)
            };
          }
          return child;
        })
      };
    }
    // Return other types of blocks (images, custom blocks) unchanged
    return block;
  });
}
