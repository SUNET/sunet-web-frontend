import Document, { Head, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {
    render() {
        return (
            <html lang="sv">
                <Head>
                  <script dangerouslySetInnerHTML={{ __html: `
                    var _paq = window._paq = window._paq || [];
                    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
                    _paq.push(['trackPageView']);
                    _paq.push(['enableLinkTracking']);
                    (function() {
                      var u="https://analytics.sunet.se/";
                      _paq.push(['setTrackerUrl', u+'matomo.php']);
                      _paq.push(['setSiteId', '3']);
                      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                      g.type='text/javascript'; g.async=true; g.src=u+'matomo.js';
                      s.parentNode.insertBefore(g,s);
                    })();
                  ` }} />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
