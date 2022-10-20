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
  return affectedCustomers;
}

// <Link href={`${routes[locale.lang]}/${ticket.id}`} as={`${routes[locale.lang]}/${ticket.id}`} key={ticket.key}>

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
      <div className="card-content">
        <div className="header-container-long">
          <h3>
            <span>{ticket.key}</span>
          </h3>
          <div className="summary">
            {ticket.fields.summary}
          </div>
        </div>
        <p className="card-intro">
          <div className="start-end-dates">
            <span className="start-date">
              {start.toLocaleString()}
            </span>
            <span className="end-date">
              {end.toLocaleString()}
            </span>
          </div>
        </p>
      </div>
    </div>
  );
}

// <Link href={`${routes[locale.lang]}/${ticket.id}`} as={`${routes[locale.lang]}/${ticket.id}`} key={ticket.key}>

const UnscheduledTicket = ({ ticket, locale }) => {
  return (
    <div className="card">
      <div className="card-tags">
        {getAffectedCustomers(ticket).map(customer => (
          <span>{customer}</span>
        ))}
      </div>
      <div className="card-content">
        <div className="header-container">
          <h3>
            <span>{ticket.key}</span>
          </h3>
        </div>
        <p className="card-intro">
          {ticket.fields.summary}
          <div className="created-date">
            {ticket.fields.created.toLocaleString()}
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
