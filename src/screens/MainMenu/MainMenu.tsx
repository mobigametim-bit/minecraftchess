import { DIFFICULTIES, type DifficultyId } from '../../config/difficulties';

interface MainMenuProps {
  emeralds: number;
  onStart: (difficulty: DifficultyId) => void;
}

export function MainMenu({ emeralds, onStart }: MainMenuProps) {
  return (
    <main className="menu-screen">
      <header className="menu-topbar">
        <div className="brand-lockup" aria-label="Minecraftchess">
          <span className="brand-mark" aria-hidden="true">♟</span>
          <span>Minecraftchess</span>
        </div>
        <div className="emerald-balance" aria-label={`Изумруды: ${emeralds}`}>
          <span className="emerald-gem" aria-hidden="true">◆</span>
          <strong>{emeralds}</strong>
        </div>
      </header>

      <section className="menu-content" aria-labelledby="difficulty-title">
        <div className="menu-copy">
          <p className="eyebrow">Одиночная партия</p>
          <h1 id="difficulty-title">Выберите сложность</h1>
          <p className="menu-lead">
            Выберите соперника — партия начнётся сразу. Чем выше сложность,
            тем больше изумрудов за победу.
          </p>
        </div>

        <div className="difficulty-list">
          {DIFFICULTIES.map((difficulty) => (
            <button
              className="difficulty-button"
              key={difficulty.id}
              type="button"
              onClick={() => onStart(difficulty.id)}
            >
              <span className="difficulty-copy">
                <strong>{difficulty.label}</strong>
                <small>{difficulty.subtitle}</small>
              </span>
              <span className="difficulty-reward">
                <span aria-hidden="true">◆</span>
                +{difficulty.winReward}
              </span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
