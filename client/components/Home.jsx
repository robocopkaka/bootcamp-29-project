import React from 'react';
import events from '../img/events.jpeg';

class Home extends React.Component {
  componentDidMount() {
    $('.slider').slider();
  }
  render() {
    return (
      <div className="slider">
        <ul className="slides">
          <li>
            <img src={events} alt="" />
            <div className="caption center-align">
              <h3 className="color-black">Kachi&#39;s Event Manager</h3>
            </div>
          </li>
          <li>
            <img src={events} alt="" />
            <div className="caption left-align">
              <h3 className="color-black">Find centers that suit you</h3>
            </div>
          </li>
          <li>
            <img src={events} alt="" />
            <div className="caption right-align">
              <h3 className="color-black">And events you&#39;ll want to attend</h3>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
export default Home;
