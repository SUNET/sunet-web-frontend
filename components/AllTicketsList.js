import React from 'react';
import Link from 'next/link';
import * as dutils from '../src/utils/dates.js'
import withLocale from './withLocale'

const routes = {
	"en": "/en/tickets",
	"sv": "/tickets",
}


export function getAffected(ticket, what='affected_customer') {
  const affected = [];
  if (ticket.fields.customfield_11100) {
    ticket.fields.customfield_11100.forEach((item) => {
      try {
        if (item.startsWith(what)) {
          const thing = item.split(':').at(-1);
          affected.push(thing);
        }
      } catch(err) {
          console.log(err);
        }
    });
  }
  return affected;
}

const ScheduledTicket = ({ ticket, locale }) => {
  let dates = '';
  if (ticket.fields.customfield_11300 !== undefined) {
    const startend = ticket.fields.customfield_11300.split('/');
    const start = new Date(startend[0]);
    const end = new Date(startend[1]);
    dates = (
      <div className="start-end-dates">
        <span className="start-date">
          <span className="date-label">
            Maintenance start:
          </span>
          {dutils.formatDateTime(start)}
        </span>
        <span className="end-date">
          <span className="date-label">
            Maintenance end:
          </span>
          {dutils.formatDateTime(end)}
        </span>
      </div>
    );
  }
  return (
    <div className="card">
      <div className="card-tags">
        {getAffected(ticket).map((customer, i) => (
          <span key={i}>{customer}</span>
        ))}
      </div>
      <div className="card-content ticket">
        <Link href={`${routes[locale.lang]}/${ticket.key}`} as={`${routes[locale.lang]}/${ticket.key}`} key={ticket.key}>
          <div className="header-container-long">
            <h3>
              <span>{ticket.key}</span>
            </h3>
            <div className="summary">
              {ticket.fields.summary}
            </div>
          </div>
        </Link>
        <div className="card-intro-long">
          {dates}
        </div>
      </div>
    </div>
  );
}

const UnscheduledTicket = ({ ticket, locale }) => {
  let created, next, dates ='';
  if (ticket.fields.customfield_10918 !== undefined) {
    next = new Date(ticket.fields.customfield_10918);
  }
  if (ticket.fields.created !== undefined) {
    created = new Date(ticket.fields.created);
  }
  if (created || next) {
    dates = (
      <div className="start-end-dates">
        {created && (
          <span className="start-date">
            <span className="date-label">
              Problem start:
            </span>
            {dutils.formatDateTime(created)}
          </span>
        )}
        {next && (
          <span className="end-date">
            <span className="date-label">
              Next action:
            </span>
            {dutils.formatDate(next)}
          </span>
        )}
      </div>
    );
  }
  return (
    <div className="card">
      <div className="card-tags">
        {getAffectedCustomers(ticket).map((customer, i) => (
          <span key={i}>{customer}</span>
        ))}
      </div>
      <div className="card-content ticket">
        <Link href={`${routes[locale.lang]}/${ticket.key}`} as={`${routes[locale.lang]}/${ticket.key}`} key={ticket.key}>
          <div className="header-container-long">
            <h3>
              <span>{ticket.key}</span>
            </h3>
            <div className="summary">
              {ticket.fields.summary}
            </div>
          </div>
        </Link>
        <div className="card-intro-long">
          {dates}
        </div>
      </div>
    </div>
  );
}

const _ScheduledTicketsList = ({ tickets, locale }) => {
	
	function renderTickets() {
		return tickets.map((ticket, i) => {
      return (<ScheduledTicket ticket={ticket} locale={locale} key={i} />);
		});
	}
	return (
		<div className="row">
			<div className="col-12 cards list tickets">{renderTickets()}</div>
		</div>
	);
};

const _UnscheduledTicketsList = ({ tickets, locale }) => {
	
	function renderTickets() {
		return tickets.map((ticket, i) => {
      return (<UnscheduledTicket ticket={ticket} locale={locale} key={i} />);
		});
	}
	return (
		<div className="row">
			<div className="col-12 cards list tickets">{renderTickets()}</div>
		</div>
	);
};

export const ScheduledTicketsList = withLocale(_ScheduledTicketsList);
export const UnscheduledTicketsList = withLocale(_UnscheduledTicketsList);
