import React from 'react';

class SelectCenter extends React.Component {
  componentDidMount() {
    $('select').material_select();
    $('select').on('contentChanged', () => {
      $(this).material_select();
    });
  }
  render() {
    return (
      <select
        name="center"
        value={this.props.center.value}
        onChange={this.props.handleSelectCenterChange}
        id="event-center"
      >
        <option value="">Pick a Center</option>
        {this.props.centers.map(aCenter => (
          <option
            key={aCenter.id}
            value={aCenter.id}
          >{aCenter.name}
          </option>
        ))}
      </select>
    );
  }
}
export default SelectCenter;
