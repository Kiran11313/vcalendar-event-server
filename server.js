const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Escape values for iCalendar TEXT fields. This prevents malformed calendar
// data and ensures user-controlled values cannot become calendar properties.
function escapeIcsText(value) {
  return String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n')
    .replace(/([;,])/g, '\\$1');
}

function makeCalendar(query) {
  const summary = query.summary || 'Team Sync';
  const description = query.description || 'Team sync for project coordination';
  const location = query.location || 'Conference Room A';

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Example Corp//Calendar 1.0//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:20261001T143000Z-001@example.com',
    'DTSTAMP:20261001T120000Z',
    'DTSTART:20261001T143000Z',
    'DTEND:20261001T153000Z',
    `SUMMARY:${escapeIcsText(summary)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    `LOCATION:${escapeIcsText(location)}`,
    'ORGANIZER;CN=Example Corp:mailto:calendar@example.com',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n') + '\r\n';
}

app.get('/', (req, res) => {
  res.type('html').send(`<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Calendar Feed</title></head>
<body>
  <h1>Calendar Feed</h1>
  <p><a href="/event.ics">Open the calendar event</a></p>
  <p>Customize it with <code>?summary=Project%20Review</code>.</p>
</body>
</html>`);
});

app.get('/event.ics', (req, res) => {
  res.set({
    'Content-Type': 'text/calendar; charset=utf-8',
    'Content-Disposition': 'inline; filename="event.ics"',
    'X-Content-Type-Options': 'nosniff'
  });
  res.send(makeCalendar(req.query));
});

app.listen(port, () => {
  console.log(`Calendar server listening on port ${port}`);
});
