
import React from 'react';

const SecurityTxt = () => null;

export const getServerSideProps = async ({ res }) => {
  const date = new Date();
  date.setMonth(date.getMonth() + 2);
  if (res) {
    res.setHeader('Content-Type', 'text/plain');
    res.write(`Contact: https://www.sunet.se/om-sunet/sakerhet\n`);
    res.write(`Contact: mailto:abuse@sunet.se\n`);
    res.write(`Expires: ${date.toISOString()}\n`);
    res.write(`Preferred-Languages: en, sv\n`);
    res.write(`Acknowledgments: https://www.sunet.se/om-sunet/sakerhet/hall-of-fame\n`);
    res.write(`Encryption: https://keys.openpgp.org/vks/v1/by-fingerprint/9CBFAF18D1E1AF3176E74C3E2F23CB193ACFD1F0`);
    res.end();
  }
	  return {props:{}};
}

export default SecurityTxt

