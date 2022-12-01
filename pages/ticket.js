import Layout from "../components/Layout.js";
import React, { Component } from "react";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import fetch from 'isomorphic-unfetch';
import config from '../config.js'
import * as dutils from '../src/utils/dates.js'
import { buildSidebarMenu } from '../src/utils/menu-builder';
import SideBarMenu from "../components/SideBarMenu.js";
import {getJIRATickets} from '../src/utils'
import {getAffected} from "../components/AllTicketsList.js";


class Ticket extends Component {
	
  static async getInitialProps(context) {
	
    const {slug, lang, section} = context.query
    const tickets = await getJIRATickets();
    const ticket = tickets.find(ticket => ticket.key === slug);
    const title = ticket ? ticket.fields.summary : "";
    const type = ticket ? ticket.fields.issuetype.name.trim() : "";

    if (!ticket) context.res.statusCode = 404;

		return { 
			ticket,
      type,
			error: !ticket,
			lang,
			title,
      section,
		 };
	}

  renderUser(val) {
    return `${val.displayName} &lt;${val.emailAddress}&gt;`
  }

	render() {
		const { ticket, type, error, lang, title } = this.props;
		if (error) return (
			<Layout {...this.props}>

				<div className="container">
					<main aria-labelledby="main-title" className="row single m-80">
				
						<article className="col-lg-12">
              <h1 id="main-title">Ticket not found</h1>
              <div>
                <p>Please note that we only keep closed tickets at sunet.se for one month.<br/>
                For closed tickets older than that, contact <span>noc</span>&#64;<span>sunet.se</span>.</p>
              </div>
						</article>
					</main>
				</div>
				
			</Layout>
    );

    const affectedServices = getAffected(ticket, 'service');

		return (
			<Layout {...this.props}>

				<div className="container">
					<main aria-labelledby="main-title" className="row single m-80">
				
						<article className="col-lg-12">
              <h1 id="main-title">{title}</h1>
              <dl className="ticket-update">
                <dt>
      Ticket number:
                </dt>
                <dd>
      {ticket.key}
                </dd>
                <dt>
      Ticket type:
                </dt>
                <dd>
      {ticket.fields.issuetype.name}
                </dd>
                <dt>
      Ticket status:
                </dt>
                <dd>
      {ticket.fields.status.name}
                </dd>
                <dt>
      Ticket summary:
                </dt>
                <dd>
      {ticket.fields.summary}
                </dd>
      {(ticket.fields.customfield_11800 !== null) && (
                <>
                  <dt>
        Ticket scope:
                  </dt>
                  <dd>
        {ticket.fields.customfield_11800.value}
                  </dd>
                </>
      )}
                <dt>
      Ticket opened:
                </dt>
                <dd>
      {dutils.formatDateTimeFromString(ticket.fields.created)}
                </dd>
      {(ticket.fields.resolutiondate !== null) && (
                <>
                  <dt>
        Ticket closed:
                  </dt>
                  <dd>
        {dutils.formatDateTimeFromString(ticket.fields.resolutiondate)}
                  </dd>
                </>
      )}
      {(type === "Scheduled" && ticket.fields.customfield_11603 !== null) && (
                <>
                  <dt>
        Maintenance:
                  </dt>
                  <dd>
        {dutils.formatDateTimePairFromString(ticket.fields.customfield_11603)}
                  </dd>
                </>
      )}
      {(type === "Unscheduled" && ticket.fields.customfield_11604 !== null) && (
                <>
                  <dt>
        Problem start / end:
                  </dt>
                  <dd>
        {dutils.formatDateTimePairFromString(ticket.fields.customfield_11604)}
                  </dd>
                </>
      )}
      {(type === "Scheduled" && ticket.fields.customfield_10402 !== null) && (
                <>
                  <dt>
        Estimated outage:
                  </dt>
                  <dd>
        {ticket.fields.customfield_10402} min
                  </dd>
                </>
      )}
      {(ticket.fields.customfield_11601 !== null) && (
                <>
                  <dt>
        Outage:
                  </dt>
                  <dd>
        {dutils.formatDateTimePairsFromList(ticket.fields.customfield_11601).map((pair, i) => (
                    <div key={i}>{pair}</div>
        ))}
                  </dd>
                </>
      )}
                <dt>
      Affected organizations:
                </dt>
                <dd>
        {getAffected(ticket).map((customer, i) => (
          <span key={i}>{customer}&nbsp;&nbsp;</span>
        ))}
                </dd>
      {(affectedServices.length > 0) && (
                <>
                  <dt>
        Affected services:
                  </dt>
                  <dd>
        {affectedServices.map((service, i) => (
          <span key={i}>{service}&nbsp;&nbsp;</span>
        ))}
                  </dd>
                </>
      )}
      {(ticket.fields.description !== null) && (
                <>
                  <dt>
        Description:
                  </dt>
                  <dd>
		    <pre>
			{ticket.fields.description}
	             </pre> 
                  </dd>
                </>
      )}
      {(ticket.fields.customfield_11802 !== null) && (
                <>
                  <dt>
        Impact:
                  </dt>
                  <dd>
                    <pre>
        {ticket.fields.customfield_11802}
                    </pre>
                  </dd>
                </>
      )}
      {(ticket.fields.customfield_10403 !== null) && (
                <>   
                  <dt>
        Final ticket report:
                  </dt>
                  <dd>
                   <pre>
        {ticket.fields.customfield_10403}
                   </pre>
                  </dd>
              </>
      )}
      
              </dl>
      {(ticket.fields.comment !== null && ticket.fields.comment.comments !== undefined && ticket.fields.comment.comments.length > 0) && (
        <>
          <p><strong>Updates:</strong></p>
          {ticket.fields.comment.comments.map((comment, i) => (
            <div key={i} className="ticket-detail-update">
              <span className="ticket-update-date">{dutils.formatDateTimeFromString(comment.created)}</span><br/>
              <pre>{comment.body}</pre>
            </div>
          ))}
        </>
      )}
						</article>
					</main>
				</div>
				
			</Layout>
		);
	}
}

export default PageWrapper(Ticket);
