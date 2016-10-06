import React from 'react'
import Nav from './Nav.jsx'
import CartoMap from './CartoMap.jsx'
import FacLayerSelector from './FacLayerSelector.jsx'
import Modal from './Modal.jsx'

var FacilitiesExplorer = React.createClass({
  getInitialState() {
    return({
      modalHeading: null,
      modalContent: null
    })
  },

  componentDidMount: function() {
    document.title = "NYC Facilities Explorer";
  },

  updateSQL(sql) {
    this.refs.map.setSQL(sql)
  },

  showAbout() {
    this.showModal({
      modalHeading: 'About this Tool',
      modalContent: aboutContent
    })
  },

  showModal(options) {
    this.setState(options)
    this.refs.modal.open()
  },

  handleFeatureClick(e, latlng, pos, data) {
    var d = data

    var content = (
      <div>
        <h3>{d.facilityname}</h3>
        <p>{d.address}</p>

        <hr/>

        <p className='modal-label'>Domain / Group / Subgroup / Type</p>
        <p>{d.domain} / {d.facilitygroup} / {d.facilitysubgroup} / {d.facilitytype}</p>

        <p className='modal-label'>Operator</p>
        <p>{d.oversightabbrev} - {d.operatorname}</p>

        <p className='modal-label'>Oversight Agency</p>
        <p>{d.oversightabbrev} - {d.oversightagency}</p>

        <hr/>

        <p className='modal-label'>Data Source</p>
        <p>Source Dataset: {d.sourcedatasetname}</p>
        <p>Last Update: {d.datesourceupdated}</p>
      </div>
    )

    this.showModal({
      modalHeading: 'Facility Details',
      modalContent: content
    })


  },

  render() {
    return(
      <div className="full-height">
        <Nav title="NYC Facilities Explorer">
          <li onClick={this.showAbout}><a><span className="glyphicon glyphicon-info-sign" aria-hidden="true"></span> About</a></li>
        </Nav>
        <div id="main-container">
          <div id="sidebar">
            <FacLayerSelector
              updateSQL={this.updateSQL}
            />
          </div>
          <div id="content">
            <CartoMap
             vizJson="data/facViz.json"
             handleFeatureClick={this.handleFeatureClick}
             ref="map"/>
          </div>
            <Modal
              heading={this.state.modalHeading}
              body={this.state.modalContent}
              ref="modal"
            />
        </div>
      </div>
    )
  }
})

module.exports=FacilitiesExplorer


var aboutContent = (
  <div>
    <h4>What's included?</h4>
            <p>
              The City Planning Facilities Database (FacDB), a data product produced by the New York City (NYC) Department of City Planning (DCP) Capital Planning Division, captures the location, type, and capacity of public and private facilities ranging across six domains:
              <ul type={"disc"}>
                <li>Health Care and Human Services</li>
                <li>Youth, Education, and Child Welfare</li>
                <li>Public Safety, Emergency Services, and Administration of Justice</li>
                <li>Core Infrastructure and Transportation</li>
                <li>Parks, Cultural, and Other Community Facilities</li>
                <li>Administration of Government (See note in Disclaimers)</li>
              </ul>
              Currently, FacDB aggregates and synthesizes data sourced from 42 agencies, recording more than 31,000 facilities throughout NYC. Details on the facility categories, fields in the database, the database update process, and data sources is provided on NYC Planning’s <a href="https://nycplanning.github.io/cpdocs/facdb/#city-planning-facilities-database">Capital Planning Docs</a> site.
            </p>

            <h4>How is this useful?</h4>
            <p>
              This data resource provides agencies and communities with easy access to data and neighborhood context needed for site planning, assessing service delivery, preparing neighborhood plans, or informing capital investment decisions. The facilities and program sites are generally operated, funded, licensed, or certified by a City, State, or Federal government agency.
            </p>
            <p>
              The facilities which are included are valuable for planning purposes because of the social services they provide and their role in land use typology which impacts activity in the neighborhood. For example parking lots and garages (including commerical garages) are captured in the database, both because they are an asset that residents and visitors use and because they could indicate increased vehicular traffic in the area.
            </p>

            <h5>Limitations and Disclaimers</h5>
            <p>
              The FacDB is only as good as the source data it aggregates. Currently, FacDB is the most comprehensive, spatial data resource of facilities run by public and non-public entities in NYC, but it does not claim to capture every facility within the specified domains. Many records could not be geocoded. There are also known to be cases when the address provided in the source data is for a headquarters office rather the facility site location. Unfortunately these could not be systematically verified. For more detailed information on a specific facility please reach out to the respective oversight agency.
            </p>
            <p>
              <b>Duplicates.</b> Please be aware that this beta version of the database also includes cases of duplicate records for the same facility. This is because several of the source datasets have content that overlaps with other datasets. We are working to systematically identify these duplicate records and retain the most up-to-date and detailed record.
            </p>
            <p>
              <b>Admin. of Government.</b> Please note that this domain currently only contains data from NYPD and FDNY in addition to a few DPR properties. After the 2016 version of the <a href="https://www1.nyc.gov/site/planning/about/publications/colp.page">City-Owned and Leased Properties</a> (COLP) database is realeased, all of its contents will also be added to FacDB.
            </p>

            <h4>Feedback</h4>
            <p>
              We are constantly looking for ways to improve and add additional value to the database. Please reach out to the NYC DCP Capital Planning team at CapitalPlanning_DL@planning.nyc.gov with any suggestions.
            </p>
  </div>
)