# VCALENDAR Event Server

A small Express website that serves a safe, dynamically generated iCalendar event.

## Run locally

```bash
npm install
npm start
```

Open <http://localhost:3000> for the HTML page or <http://localhost:3000/event.ics> for the calendar feed.

The event can be customized with URL parameters:

```text
/event.ics?summary=Project%20Review&location=Room%201
```

The HTML landing page uses `text/html`; the calendar endpoint correctly uses `text/calendar` so calendar applications can consume it. User-provided values are escaped as iCalendar text fields.
