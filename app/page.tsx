
import React, {Suspense, StrictMode} from 'react';
import App from '@/components/App';
import "@/app/globals.css";


export default function Home() {
  return (
    <div className="min-h-screen bg-amber-50"> {/* Champagne background */}
      <main className="container mx-auto px-2 py-10 max-w-12xl"> {/* Increased padding and max-width */}
        <App />
      </main>
    </div>
  );
}
