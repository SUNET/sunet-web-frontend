import React from 'react';
import Link from 'next/link';
import withLocale from './withLocale'

const routes = {
	"en": "/contact/tickets",
	"sv": "/kontakt/tickets",
}


function getAffectedCustomers(ticket) {
  const affectedCustomers = [];
  if (ticket.fields.customfield_11100) {
    ticket.fields.customfield_11100.forEach((item) => {
      try {
        if (item.startsWith('affected_customer')) {
          const customer = item.split(':').at(-1);
          affectedCustomers.push(customer);
        }
      } catch(err) {
          console.log(err);
        }
    });
  }
  return affectedCustomers;
}

const ScheduledTicket = ({ ticket, locale }) => {
  const dates = ticket.fields.customfield_11300.split('/');
  const start = new Date(dates[0]);
  const end = new Date(dates[1]);
  return (
    <div className="card">
      <div className="card-tags">
        {getAffectedCustomers(ticket).map(customer => (
          <span>{customer}</span>
        ))}
      </div>
      <div className="card-content ticket">
        <Link href={`${routes[locale.lang]}/${ticket.id}`} as={`${routes[locale.lang]}/${ticket.id}`} key={ticket.key}>
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
          <div className="start-end-dates">
            <span className="start-date">
              <span className="date-label">
                start:
              </span>
              {start.toUTCString()}
            </span>
            <span className="end-date">
              <span className="date-label">
                end:
              </span>
              {end.toUTCString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const UnscheduledTicket = ({ ticket, locale }) => {
  return (
    <div className="card">
      <div className="card-tags">
        {getAffectedCustomers(ticket).map(customer => (
          <span>{customer}</span>
        ))}
      </div>
      <div className="card-content ticket">
        <Link href={`${routes[locale.lang]}/${ticket.id}`} as={`${routes[locale.lang]}/${ticket.id}`} key={ticket.key}>
          <div className="header-container-long">
            <h3>
              <span>{ticket.key}</span>
            </h3>
            <div className="summary">
              {ticket.fields.summary}
            </div>
          </div>
        </Link>
        <p className="card-intro-long">
          <div className="start-end-dates">
            <span className="start-date">
              <span className="date-label">
                created:
              </span>
              {new Date(ticket.fields.created).toUTCString()}
            </span>
          </div>
        </p>
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
