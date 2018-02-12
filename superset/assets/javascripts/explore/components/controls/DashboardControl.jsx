import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { t } from '../../../locales';

const $ = window.$ = require('jquery');

const propTypes = {
  dashboardurl: PropTypes.array,
};
const defaultProps = {
  dashboardurl: [{ value: 'url', label: 'name' }] ,
};

export default class DashboardControl extends React.PureComponent {
  constructor(props) {
      super(props);
      console.log('constructor');
      this.state = {
        dashboardurl:null,  
      };

    }
    componentDidMount(){
     const data= this.fetchDashboardLinks();
     console.log(data);
    }

    fetchDashboardLinks(){
      const url = '/dashboardlinkviewasync/api/read';
      
      $.ajax({
        type: 'GET',
        url:url,
        success: (data) => {
          this.setState((ds) => {
            const result=ds.result;
            return {dashboardurl :result,loading: true};
          })
        },
        error() {
          that.setState({ loading: false });
          notify.error(t('Something went wrong while fetching the datasource list'));
        },
      });
    }

    render(){
      let dashboardurl=this.props.dashboardurl;
      return(
       <Select
              id="select-col"
              placeholder={t('Select dashboard url')}
              clearable={false}
              options={dashboardurl}
            /> 
      )
    }
  }
DashboardControl.propTypes=propTypes;
DashboardControl.defaultProps = defaultProps;


