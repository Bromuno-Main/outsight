// app/post/layout.tsx
import React from 'react';
// You could import a different, simpler header specific to posts if needed
// import PostHeader from '@/app/components/PostHeader';

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // This layout is nested within the RootLayout (app/layout.tsx),
    // so it inherits the body className (fonts, etc.) and globals.css.
    // We are simply defining the structure *within* the main body for /post/* routes.

    // Example: A simple container for the post content.
    // It does NOT include the main <Header /> component from the root layout.
    <main className="pt-16 sm:pt-20"> {/* Add padding top if you have any fixed elements specific to this layout, or remove if none */}
      {/* Optional: Add a simpler header specific to posts here */}
      {/* <PostHeader /> */}

      {/* The children prop renders the actual page content (app/post/[index]/page.tsx) */}
      {children}

      {/* Optional: Add a footer specific to posts here */}
      {/* <PostFooter /> */}
    </main>
  );
}
