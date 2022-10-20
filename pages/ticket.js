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
];

class Ticket extends Component {
	
    static async getInitialProps(context) {
	
	const {ticketid, lang} = context.query
  const openTickets = await getOpenTickets();
  const customFields = await getJiraCustom();
	const ticket = openTickets.issues.find(ticket => ticket.id === ticketid);
	
	const title = ticket ? ticket.fields.summary : "";

        if (!ticket) context.res.statusCode = 404;

		return { 
			ticket,
      customFields,
			error: !ticket,
			ticketid, 
			lang,
			title,
		 };
	}

  getCustomFields(ticket) {
    const kvpairs = [];
    for (const fname in ticket.fields) {
      if (! usedNames.includes(fname)) {
        const val = ticket.fields[fname];
        if (val && !(typeof(val) === 'object' && Object.keys(val).length === 0)) {
          const name = this.props.customFields.find(f => f.id === fname).name;
          const val = renderCustomField(fname, val);
          kvpairs.push([name, val]);
        }
      }
    };
    return kvpairs;
  }

  renderUser(val) {
    return `${val.displayName} &lt;${val.emailAddress}&gt;`
  }

  renderCustomField(id, val) {
    const field = this.props.customFields.find(f => f.id === id);
    switch (field.schema.type) {
      case 'array':
        switch (field.schema.items) {
          case 'string':
            return val.map((item, i) => (<span key={i}>{item}</span>)).join(',&nbsp');
          case 'user':
            return val.map((item, i) => (<span key={i}>{this.renderUser(item)}</span>)).join(',&nbsp');
          case 'option':
            return val.map((item, i) => (<span key={i}>{item.value}</span>)).join(',&nbsp');

          case 'version':
          case 'issuelinks':
          case 'component':
          case 'sd-customerorganization':
          case 'worklog':
          case 'attachment':

          default:
            return val.map((item, i) => (<span key={i}>{`${item}`}</span>)).join(',&nbsp');
        }
      case 'string':
      case 'number':
        return (<span>val</span>);
      case 'date':
      case 'datetime':
        return (<span>{new Date(val).toLocaleString()}</span>);
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
    const creation = `Created by ${this.renderUser(ticket.fields.creator)} on ${new Date(ticket.fields.created).toLocaleString()}`;

		return (
			<Layout {...this.props}>

				<div className="container">
					<main aria-labelledby="main-title" className="row single m-80">
				
						<article className="col-lg-8 offset-lg-2">
              <h1 id="main-title">{ticket.key}: [{ticket.fields.project.name}] {title}</h1>
              <p className="ticket-creation">
                <span	dangerouslySetInnerHTML={{ __html: creation }} />
              </p>
              <p className="ticket-description">{ticket.fields.description}</p>
              <dl>
                {customFields.map(f => (
                  <>
                    <dt>
                      {f[0]}
                    </dt>
                    <dd>
                      {f[1]}
                    </dd>
                  </>
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
