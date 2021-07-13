import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Recaptcha from "react-recaptcha";
import PageWrapper from "../components/PageWrapper.js";
import config from "../config.js";

class NewsletterSubscription extends Component {

    constructor() {
      super();
      this.state = {
        captchaResponse: "",
        acceptedConds: true,
        emailEntered: true,
        subscribed: false,
      };
    }

    async subscribe(e) {
      e.preventDefault();
      const acceptConds = document.getElementById('conditions-input').checked;
      this.setState({acceptedConds: acceptConds});
      if (!acceptConds) {
        return;
      }
      const emailAddress = document.getElementById('email-input').value;
      if (!emailAddress) {
        this.setState({emailEntered: false});
        return;
      } else {
        this.setState({emailEntered: true});
      }
      const data = {
        email: emailAddress,
        fullname: "",
        pw: "",
        "pw-conf": "",
        language: "sv",
        digest: "0",
        "email-button": "Subscribe",
        "g-recaptcha-response": this.state.captchaResponse,
      };
      const encodedData = Object.keys(data).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])).join('&');
      const response = await fetch (config.subscriptionUrl, {
        body: encodedData,
        method:'POST',
        cache: 'no-cache',
        credentials:'omit',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (response.status == 200) {
        this.setState({subscribed: true});
      }
    }

    verification(response) {
      const span = document.getElementById('recaptcha-response');
      this.setState({captchaResponse: response.payload});
    }

    render() {

        return (
            <Layout {...this.props}>

              <h1>Prenumerera på vårt nyhetsbrev</h1>
              <h2>Håll dig uppdaterad om vad som händer inom Sunet. Fyll i din e-postadress nedan för att börja prenumerera.</h2>
              {!this.state.acceptedConds && (
                <br key="0" /><span key="1">XXX successfullySubscribed</span>
              )}
              <p>Du behöver också ta del av informationen om behandling av personuppgifter och samtycka till att Vetenskapsrådet, där Sunet är en avdelning, behandlar dina personuppgifter.</p>
              <p>E-POST (OBLIGATORISK):</p>
              <form id="newsletter-form">
                <p>
                  <input type="email" name="email" id="email-input" />
                  {!this.state.emailEntered && (
                    <br key="0" /><span key="1">XXX this is required</span>
                  )}
                </p>
                <p>
                  <input type="checkbox" name="conditions" id="conditions-input" />
                  Jag har läst <a href="https://sunet.se/om-sunet/information-om-behandling-av-personuppgifter/">informationen</a> och samtycker till Vetenskapsrådets behandling av mina personuppgifter.
                  {!this.state.acceptedConds && (
                    <br key="0" /><span key="1">XXX this is required</span>
                  )}
                </p>
                <div>
                  <Recaptcha
                    sitekey={config.recaptchaKey}
                    render="explicit"
                    verifyCallback={this.verification}
                  />
                </div>
                <button id="submit-button" onClick={this.subscribe}>PRENUMERERA</button>
              </form>
              <p>Vill du avsluta din prenumeration? Maila till info@sunet.se så tar vi bort dig från listan.</p>
            </Layout>
        );
    }
}

export default PageWrapper(NewsletterSubscription);
