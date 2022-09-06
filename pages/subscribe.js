import Layout from "../components/Layout.js";
import React, { Component } from "react";
import PageWrapper from "../components/PageWrapper.js";

class NewsletterSubscription extends Component {

    validateForm() {
      var value = '';
      var email = document.SubscribeForm.SubscriberForm_email;
      value = email.value;
      if (value == null || value == '') {
        var errorElement = document.getElementById("SubscriberForm_email_error_required");
        if(errorElement){
          errorElement.style.display = 'block';
        }
        email.focus();
        return false;
      }
      else {
        var errorElement = document.getElementById("SubscriberForm_email_error_required");
        if(errorElement){
          errorElement.style.display = 'hidden';
        }
      }
      if (!RegExp(/^(?:[A-Za-z0-9!#$%&\'*+\/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*|""(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*"")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/).test(value)) {
        var errorElement = document.getElementById("SubscriberForm_email_error_0");
        if(errorElement){
          errorElement.style.display = 'block';
        }
        email.focus();
        return false;
      }
      else {
        var errorElement = document.getElementById("SubscriberForm_email_error_0");
        if(errorElement){
          errorElement.style.display = 'hidden';
        }
      }
      if(!RegExp(/^(.|\s){0,400}$/).test(value)) {
        var errorElement = document.getElementById("SubscriberForm_email_error_1");
        if(errorElement){
          errorElement.style.display = 'block';
        }
        email.focus();
        return false;
      }
      else {
        var errorElement = document.getElementById("SubscriberForm_email_error_1");
        if(errorElement){
          errorElement.style.display = 'hidden';
        }
      }
    }


    render() {

        return (
            <Layout {...this.props}>

              <div className="container subscription-page">
              <main aria-labelledby="main-title" className="row single m-52">
                  <article className="col-lg-8 offset-lg-2">

                    <h1 id="main-title">Prenumerera på vårt nyhetsbrev</h1>
                    <div>
                    <p>Håll dig uppdaterad om vad som händer inom Sunet. Fyll i din e-postadress nedan för att börja prenumerera.</p>
                    <p>Du behöver också ta del av informationen om behandling av personuppgifter och samtycka till att Vetenskapsrådet, där Sunet är en avdelning, behandlar dina personuppgifter.</p>
                    <p className="font-weight-bold">E-POST (OBLIGATORISK):</p>

	      <form name="SubscribeForm" method="post" onSubmit={() => {return validateForm()}} action="https://ui.ungpd.com/Api/Subscriptions/723e8a84-1f5c-4c1e-8837-b4755f4e6244">
		  <input type="hidden" name="ListIds" value="a7fb77c1-f7a8-48a7-8756-ea306f1dd3f6" id="listIda7fb77c1-f7a8-48a7-8756-ea306f1dd3f6" />
		  <input type="hidden" name="SubscriptionConfirmedUrl" value="https://www.sunet.se/om-sunet/valkommen-som-prenumerant/" />
                  <input type="hidden" name="SubscriptionFailedUrl" value="https://www.sunet.se/om-sunet/nagot-gick-fel" />
                  <input type="hidden" name="DoubleOptIn[Issue][IssueId]" value="fab8be83-807a-43b4-b91f-13d1b4f1c6f9" />
                  <input type="hidden" name="DoubleOptIn[EmailSentUrl]" value="https://www.sunet.se/om-sunet/nyhetsbrev-tack/" />
		  <p>
                  <input type="email" id="SubscriberForm_email" name="Contact[Email]"  required placeholder="namn.namnsson@email.com" /><br />
		      </p>
                      <span id="SubscriberForm_email_error_required">Obligatorisk</span>
                      <span id="SubscriberForm_email_error_0">Ogiltig e-postadress</span>
                      <span id="SubscriberForm_email_error_1">Max 400 tecken</span>
		  <p><label for="contactConsentText"> 
		      <input type="checkbox" required name="ConsentText" id="contactConsentText" value="Jag vill få relevant information från Sunet till min inkorg. Sunet ska inte dela eller sälja min pe\
rsonliga information. Jag kan när som helst avsluta prenumerationen." />

&nbsp;  Jag har läst &nbsp; <a href="/om-sunet/nyhetsbrev-personuppgiftsbehandling">informationen</a>&nbsp; och samtycker till Vetenskapsrådets behandling av mina personuppgifter.</label>
 </p>

              <input type="submit" id="submit-button" value="Skicka" />
</form>
                    <p>Vill du avsluta din prenumeration? Klicka på länken “Avprenumerera” längst ner i nyhetsbrevet.</p>            
                     </div>
                  </article>
                  </main>
              </div>

<script type="text/javascript">
</script >

            </Layout>
        );
    }
}

export default PageWrapper(NewsletterSubscription);
