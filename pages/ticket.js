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
import {getAffectedCustomers} from "../components/AllTicketsList.js";


class Ticket extends Component {
	
  static async getInitialProps(context) {
	
    const {slug, lang, section} = context.query
    const tickets = await getJIRATickets();
    const ticket = tickets.find(ticket => ticket.key === slug);
    const title = ticket ? ticket.fields.summary : "";

    if (!ticket) context.res.statusCode = 404;

		return { 
			ticket,
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
		const { ticket, error, lang, title } = this.props;
		if (error) return <Error statusCode={404} />;

		return (
			<Layout {...this.props}>

				<div className="container">
					<main aria-labelledby="main-title" className="row single m-80">
				
						<article className="col-lg-12">
              <h1 id="main-title">{title}</h1>
              <dl>
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
      {(ticket.fields.customfield_10922 !== null) && (
                <>
                  <dt>
        Ticket scope:
                  </dt>
                  <dd>
        {ticket.fields.customfield_10922.value}
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
      {(ticket.fields.customfield_11300 !== null) && (
                <>
                  <dt>
        Maintenance:
                  </dt>
                  <dd>
        {dutils.formatDateTimePairFromString(ticket.fields.customfield_11300)}
                  </dd>
                </>
      )}
      {(ticket.fields.customfield_10921 !== null) && (
                <>
                  <dt>
        Estimated outage:
                  </dt>
                  <dd>
        {ticket.fields.customfield_10921} min
                  </dd>
                </>
      )}
      {(ticket.fields.customfield_11200 !== null) && (
                <>
                  <dt>
        Outage:
                  </dt>
                  <dd>
        {dutils.formatDateTimePairsFromList(ticket.fields.customfield_11200).map(pair, i => (
                    <div key={i}>{pair}</div>
        ))}
                  </dd>
                </>
      )}
                <dt>
      Affected organizations:
                </dt>
                <dd>
        {getAffectedCustomers(ticket).map((customer, i) => (
          <span key={i}>{customer}</span>
        ))}
                </dd>
      {(ticket.fields.description !== null) && (
                <>
                  <dt>
        Description:
                  </dt>
                  <dd>
        {ticket.fields.description}
                  </dd>
                </>
      )}
      {(ticket.fields.customfield_10935 !== null) && (
                <>
                  <dt>
        Impact:
                  </dt>
                  <dd>
                    <blockquote>
        {ticket.fields.customfield_10935}
                    </blockquote>
                  </dd>
                </>
      )}
      {(ticket.fields.customfield_10932 !== null) && (
                <>
                  <dt>
        External reference:
                  </dt>
                  <dd>
        {ticket.fields.customfield_10932}
                  </dd>
              </>
      )}
              </dl>
      {(ticket.fields.comment.comments.length > 0) && (
        <>
          <p><strong>Updates:</strong></p>
          {ticket.fields.comment.comments.map(comment, i => (
            <p><blockquote>comment</blockquote></p>
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
