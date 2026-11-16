import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;
// Built pages arrive prerendered (see src/entry-server.tsx): hydrate them. The dev server serves an empty root.
if (container.firstElementChild) hydrateRoot(container, <App />);
else createRoot(container).render(<App />);
