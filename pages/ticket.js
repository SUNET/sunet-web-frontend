import Layout from "../components/Layout.js";
import React, { Component } from "react";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import fetch from 'isomorphic-unfetch';
import config from '../config.js'
import { buildSidebarMenu } from '../src/utils/menu-builder';
import SideBarMenu from "../components/SideBarMenu.js";
import {getOpenTickets, getJiraCustom} from '../src/utils'


const usedNames = [
  'description',
  'summary',
  'project',
  'created',
  'creator',
  'customfield_10918',
  'customfield_11300',
];

class Ticket extends Component {
	
  static async getInitialProps(context) {
	
    const {slug, lang, section} = context.query
    const openTickets = await getOpenTickets();
    const customFields = await getJiraCustom();
    const ticket = openTickets.issues.find(ticket => ticket.id === slug);
    const title = ticket ? ticket.fields.summary : "";

    if (!ticket) context.res.statusCode = 404;

		return { 
			ticket,
      customFields,
			error: !ticket,
			lang,
			title,
      section,
		 };
	}

  getCustomFields(ticket) {
    const kvpairs = [];
    for (const fname in ticket.fields) {
      if (! usedNames.includes(fname)) {
        const val = ticket.fields[fname];
        if (val) {
          if (!(typeof(val) === 'object' && Object.keys(val).length === 0)) {
            const name = this.props.customFields.find(f => f.id === fname).name;
            const value = this.renderCustomField(fname, val);
            kvpairs.push([name, value]);
          }
        }
      }
    };
    return kvpairs;
  }

  renderUser(val) {
    return `${val.displayName} &lt;${val.emailAddress}&gt;`
  }

  renderComingDates(ticket) {
    if (ticket.fields.customfield_11300 !== undefined) {
      const dates = ticket.fields.customfield_11300.split('/');
      const start = new Date(dates[0]).toLocaleString();
      const end = new Date(dates[1]).toLocaleString();
      return (
        <p>Start date: {start}<br/>End date: {end}</p>
      );
    } else if (ticket.fields.customfield_10918 !== undefined) {
      const date = new Date(ticket.fields.customfield_10918).toLocaleString();
      return (<p>Next action: {date}</p>);
    }
    return '';
  }

  renderCustomField(id, val) {
    const field = this.props.customFields.find(f => f.id === id);
    switch (field.schema.type) {
      case 'array':
        switch (field.schema.items) {
          case 'string':
            return val.map((item, i) => (<div className="ticket-listing" key={i}>{item}</div>));
          case 'user':
            return val.map((item, i) => (<div className="ticket-listing" key={i}>{this.renderUser(item)}</div>));
          case 'option':
            return val.map((item, i) => (<div className="ticket-listing" key={i}>{item.value}</div>));

          case 'version':
          case 'issuelinks':
          case 'component':
          case 'sd-customerorganization':
          case 'worklog':
          case 'attachment':

          default:
            return val.map((item, i) => (<div className="ticket-listing" key={i}>{`${item}`}</div>));
        }
      case 'string':
      case 'number':
        return (<span>{val}</span>);
      case 'date':
      case 'datetime':
        return (<span>{new Date(val).toUTCString()}</span>);
      case 'user':
        return (<span>{this.renderUser(val)}</span>);
      case 'option':
        return (<span>{val.value}</span>);

      case 'priority':
      case 'any':
      case 'status':
      case 'progress':
      case 'sd-approvals':
      case 'votes':
      case 'issuetype':
      case 'project':
      case 'resolution':
      case 'sd-customerrequesttype':
      case 'sd-servicelevelagreement':
      case 'watches':
      case 'timetracking':
      case 'securitylevel':
      case 'comments-page':

      case 'option-with-child':
      default:
        return `${val}`;
    }
  }

	render() {
		const { ticket, error, lang, title } = this.props;
		if (error) return <Error statusCode={404} />;

    const customFields = this.getCustomFields(ticket);
    const creation = `Created by ${this.renderUser(ticket.fields.creator)} on ${new Date(ticket.fields.created).toUTCString()}`;

		return (
			<Layout {...this.props}>

				<div className="container">
					<main aria-labelledby="main-title" className="row single m-80">
				
						<article className="col-lg-12">
              <h1 id="main-title">{ticket.key}: [{ticket.fields.project.name}] {title}</h1>
              <p className="ticket-creation">
                <span	dangerouslySetInnerHTML={{ __html: creation }} />
              </p>
              <p className="ticket-description">{ticket.fields.description}</p>
              {this.renderComingDates(ticket)}
              <dl>
                {customFields.map((f, i) => (
                  <React.Fragment key={i}>
                    <dt>
                      {f[0]}
                    </dt>
                    <dd>
                      {f[1]}
                    </dd>
                  </React.Fragment>
                ))}
              </dl>
						</article>
					</main>
				</div>
				
			</Layout>
		);
	}
}

export default PageWrapper(Ticket);
