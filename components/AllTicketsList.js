import React from 'react';
import Link from 'next/link';
import withLocale from './withLocale'

const routes = {
	"en": "/about-sunet/tickets",
	"sv": "/om-sunet/tickets",
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
  return affectedCustomers.join(' ');
}

const ScheduledTicket = ({ ticket, locale }) => {
  const dates = ticket.fields.customfield_11300.split('/');
  const start = new Date(dates[0]);
  const end = new Date(dates[1]);
  return (
		<Link href={`${routes[locale.lang]}/${ticket.id}`} as={`${routes[locale.lang]}/${ticket.id}`} key={ticket.key}>
			<a>
        <div className="card">
          <div className="card-tags">
            <span>{ticket.fields.summary}</span>
          </div>
          <div className="card-content">
            <div className="header-container">
              <h3>
                {start.toLocaleString()}
              </h3>
              <h3>
                {end.toLocaleString()}
              </h3>
            </div>
            <div>{getAffectedCustomers(ticket)}</div>
          </div>
        </div>
		  </a>
		</Link>
  );
}

const UnscheduledTicket = ({ ticket, locale }) => {
  return (
		<Link href={`${routes[locale.lang]}/${ticket.id}`} as={`${routes[locale.lang]}/${ticket.id}`} key={ticket.key}>
			<a>
        <div className="card">
          <div className="card-tags">
            <span>{ticket.fields.summary}</span>
          </div>
          <div className="card-content">
            <div className="header-container">
              <h3>
                {ticket.fields.created}
              </h3>
            </div>
            <div>{getAffectedCustomers(ticket)}</div>
          </div>
        </div>
		  </a>
		</Link>
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
