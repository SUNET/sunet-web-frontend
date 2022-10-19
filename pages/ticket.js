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
			error: !ticket,
			ticketid, 
			lang,
			title,
		 };
	}

  getCustomFields(ticket) {
    const kvpairs = [];
    for (const fname in ticket.fields) {
      if (! usedNames.contains(fname)) {
        const val = ticket.fields[fname];
        if (val) {
          const name = customFields.find(f => f.id === fname).name;
          if (typeof(val) === 'string') {
            kvpairs.push([name, val]);
          } else if (val.hasOwnProperty('name')) {
            kvpairs.push([name, val.name]);
          } else {
            kvpairs.push([name, `${val}`]);
          }
        }
      }
    };
    return kvpairs;
  }

	render() {
		const { ticket, error, lang, title } = this.props;
		if (error) return <Error statusCode={404} />;

    const customFields = this.getCustomFields(ticket);

		return (
			<Layout {...this.props}>

				<div className="container">
					<main aria-labelledby="main-title" className="row single m-80">
				
						<article className="col-lg-8 offset-lg-2">
              <h1 id="main-title">{ticket.key}: {title}</h1>
              <p>{ticket.fields.description}</p>
              <dl>
                <dt>
                  Project:
                </dt>
                <dd>
                  {ticket.fields.project.name}
                </dd>
                <dt>
                  Created:
                </dt>
                <dd>
                  {new Date(ticket.fields.created).toLocaleString()}
                </dd>
                <dt>
                  Created by:
                </dt>
                <dd>
                  {`${ticket.fields.creator.displayName} &lt;${ticket.fields.creator.emailAddress}&gt;`}
                </dd>
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
