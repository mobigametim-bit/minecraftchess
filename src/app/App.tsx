import { initialAppState } from './appState';

export function App() {
  return (
    <main className="stage-zero-shell">
      <section className="stage-zero-card" aria-labelledby="stage-zero-title">
        <p className="eyebrow">Minecraftchess</p>
        <h1 id="stage-zero-title">Stage 0 foundation</h1>
        <p>
          The application shell is ready. Player-facing UX starts only after the
          corresponding feature is discussed and approved.
        </p>
        <dl className="foundation-status">
          <div>
            <dt>Current app phase</dt>
            <dd>{initialAppState.phase}</dd>
          </div>
          <div>
            <dt>Development branch</dt>
            <dd>develop</dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
