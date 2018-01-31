import React from 'react';

const Home = () => {
  return (
    <div className="slider">
      <ul className="slides">
        <li>
          <img src="img/events.jpeg" alt="" />
          <div className="caption center-align">
            <h3 className="color-black">Kachi's Event Manager</h3>
          </div>
        </li>
        <li>
          <img src="img/events.jpeg" alt="" />
          <div className="caption left-align">
            <h3 className="color-black">Find centers that suit you</h3>
          </div>
        </li>
        <li>
          <img src="img/events.jpeg" alt="" />
          <div className="caption right-align">
            <h3 className="color-black">And events you'll want to attend</h3>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default Home;
