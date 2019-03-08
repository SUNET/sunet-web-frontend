import React from 'react';
import {Config} from '../config.js';

const PageWrapper = Comp =>
  class extends React.Component {
    static async getInitialProps(args) {
      const mainNavRes = await fetch(
        `${Config.apiUrl}/wp-json/menus/v1/menus/header-menu`
      );
      const mainNav = await mainNavRes.json();
      const globalNavRes = await fetch(
        `${Config.apiUrl}/wp-json/menus/v1/menus/header-secondary-menu`
      );
      const globalNav = await globalNavRes.json();
      const aboutNavRes = await fetch(
        `${Config.apiUrl}/wp-json/menus/v1/menus/about-menu`
      );
      const aboutNav = await aboutNavRes.json();
      const contactNavRes = await fetch(
        `${Config.apiUrl}/wp-json/menus/v1/menus/contact-menu`
      );
      const contactNav = await contactNavRes.json();
      return {
        mainNav,
        globalNav,
        aboutNav,
        contactNav,
        ...(Comp.getInitialProps ? await Comp.getInitialProps(args) : null),
      };
    }

    render() {
      return <Comp {...this.props} />;
    }
  };

export default PageWrapper;