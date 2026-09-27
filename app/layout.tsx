import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Minimax Game Playing Bot | B.Tech CSE-AIML Academic Project',
  description: 'An AI-powered game-playing system using the Minimax algorithm for Tic-Tac-Toe and Connect Four, with curriculum mapping and viva preparation.',
  openGraph: {
    title: 'Minimax Game Playing Bot | B.Tech CSE-AIML Academic Project',
    description: 'An AI-powered game-playing system using the Minimax algorithm for Tic-Tac-Toe and Connect Four, with curriculum mapping and viva preparation.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Minimax Game Playing Bot | B.Tech CSE-AIML Academic Project',
    description: 'An AI-powered game-playing system using the Minimax algorithm for Tic-Tac-Toe and Connect Four, with curriculum mapping and viva preparation.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
