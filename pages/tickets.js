import React, {Component} from 'react';
import Layout from "../components/Layout.js";
import PageWrapper from "../components/PageWrapper.js";
import {ScheduledTicketsList, UnscheduledTicketsList} from "../components/AllTicketsList.js";
import fetch from 'isomorphic-unfetch';
import config from '../config.js'
import {getJIRATickets} from '../src/utils'


class Tickets extends Component {
    static async getInitialProps(context) {
	const { lang, slug, section } = context.query;
	
	const res = await fetch(`${config.apiUrl}pages.json`);
        const pages = await res.json();
	const page = pages.find(page => page.slug === slug && (!lang || page.lang === lang));
	
	const tickets = await getJIRATickets(lang);
	const openTickets = tickets.filter(ticket => ticket.fields.status.name === 'Open' || ticket.fields.status.name === 'Resolved');
	const schedTickets = openTickets.filter((ticket) =>
						ticket.fields.issuetype.name.trim() === "Scheduled" && ticket.fields.customfield_11603 !== null
					       );
	const unschedTickets = openTickets.filter((ticket) =>
						  ticket.fields.issuetype.name.trim() === "Unscheduled"
						 );
	
	schedTickets.map(item => {	
	    
	    if (item.fields.customfield_11603 !== undefined) {
		const startend = item.fields.customfield_11603.split('/');
		item.start = startend[0];
	    }   
	    return item;
	    
        })

	unschedTickets.map(item => {
	    
            item.start = item.fields.created;

            return item;

        })
	
	
	function compare( a, b ) {
	    if ( a.start < b.start ){
		return -1;
	    }
	    if ( a.start > b.start ){
		return 1;
	    }
	    return 0;
	}
	
	schedTickets.sort(compare);
	unschedTickets.sort(compare);
	
	return { 
	    slug,
	    page,
	    error: !page,
	    schedTickets,
	    unschedTickets,
	    title: 'Tickets',
	    path: context.asPath,
	}
    }
    
	render () {
		const {page, error, path} = this.props;
		return (
			<Layout {...this.props}>
				<div className="container">
					<div className="row">
						<div className="col-lg-8 offset-lg-2 hero">
							<div dangerouslySetInnerHTML={ {__html: page.acf.segment_top} } />
						</div>
					</div>
				</div>
				<div className="bg-grey">
					<div className="container">
            <div className="ticket-list-legend">
              SUNET open trouble tickets - unscheduled / incident
            </div>
					</div>
					<div className="container listing tickets">
						<UnscheduledTicketsList tickets={this.props.unschedTickets} />
					</div>
				</div>
				<div className="bg-white">
					<div className="container">
            <div className="ticket-list-legend">
              SUNET open trouble tickets - scheduled maintenance
            </div>
					</div>
					<div className="container listing tickets">
						<ScheduledTicketsList tickets={this.props.schedTickets} />
					</div>
				</div>
				
			</Layout>
		);
	}
}

export default PageWrapper(Tickets);
