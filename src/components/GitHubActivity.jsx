import { useRef } from 'react';
import { TextLink } from './TextLink.jsx';
import { useContributions } from '../hooks/useContributions.js';
import { calendarWeeks } from '../data/contributions.js';
import { site } from '../site.js';

const monthFormat = new Intl.DateTimeFormat('en', { month: 'short', timeZone: 'UTC' });
const dateFormat = new Intl.DateTimeFormat('en', { dateStyle: 'long', timeZone: 'UTC' });

export function GitHubActivity() {
  const { days, fetchedAt, status } = useContributions();
  const weeks = calendarWeeks(days);
  const buttons = useRef([]);
  const total = days.reduce((sum, day) => sum + day.count, 0);
  let lastMonth;
  function moveFocus(event, index) {
    const delta = { ArrowRight: 7, ArrowLeft: -7, ArrowDown: 1, ArrowUp: -1 }[event.key];
    if (!delta) return;
    event.preventDefault();
    buttons.current[Math.max(0, Math.min(days.length - 1, index + delta))]?.focus();
  }
  return (
    <section className="github-activity border-t border-line" aria-labelledby="github-title">
      <div className="github-heading">
        <div>
          <h2 id="github-title" className="eyebrow">GitHub activity</h2>
          <p className="github-total" aria-live="polite">{days.length ? `${total.toLocaleString()} contributions in the last year` : status === 'error' ? 'Activity is temporarily unavailable' : 'Loading GitHub activity…'}</p>
        </div>
        <TextLink href={site.github} external>View GitHub</TextLink>
      </div>
      {days.length ? <>
        <div className="github-scroll" tabIndex={0} role="group" aria-label="Contribution calendar. Scroll horizontally on small screens. Use arrow keys between days.">
          <div className="github-calendar" style={{ '--weeks': weeks.length }}>
            <div className="github-weekdays" aria-hidden="true"><span>Mon</span><span>Wed</span><span>Fri</span></div>
            {weeks.map((week, weekIndex) => {
              const first = week.find(Boolean);
              const month = first?.date.slice(0, 7);
              const label = month !== lastMonth ? monthFormat.format(new Date(`${first.date}T00:00:00Z`)) : '';
              lastMonth = month;
              return <div className="github-week" key={weekIndex} style={{ '--delay': `${weekIndex * 8}ms` }}>
                <span className="github-month" aria-hidden="true">{label}</span>
                {week.map((day, row) => {
                  if (!day) return <span key={`empty-${row}`} />;
                  const index = days.indexOf(day);
                  const description = `${day.count} ${day.count === 1 ? 'contribution' : 'contributions'} on ${dateFormat.format(new Date(`${day.date}T00:00:00Z`))}`;
                  return <button type="button" key={day.date} ref={element => { buttons.current[index] = element; }} tabIndex={index === days.length - 1 ? 0 : -1} className={`github-day level-${day.level}`} aria-label={description} onKeyDown={event => moveFocus(event, index)}><span className="github-tooltip" role="tooltip">{description}</span></button>;
                })}
              </div>;
            })}
          </div>
        </div>
        <div className="github-meta">
          <p>{status === 'stale' ? 'Saved data · feed unavailable' : 'Synced from GitHub'}{fetchedAt && ` · ${new Date(fetchedAt).toLocaleDateString('en', { month: 'short', day: 'numeric' })}`}</p>
          <div className="github-legend" aria-label="Color intensity indicates fewer to more contributions"><span>Less</span>{[0, 1, 2, 3, 4].map(level => <i key={level} className={`level-${level}`} />)}<span>More</span></div>
        </div>
      </> : <p className="github-placeholder text-muted">{status === 'error' ? 'You can still view the full contribution graph on GitHub.' : 'Fetching the latest public contributions.'}</p>}
    </section>
  );
}
