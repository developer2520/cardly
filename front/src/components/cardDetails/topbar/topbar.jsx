import React, { useState, useRef, useEffect } from "react";
import Page from '../details/page/page';
import Settings from './../details/settings/settings'
import './topbar.css'

const Topbar = ({ card, setSelectedCard }) => {
  const [activeTab, setActiveTab] = useState("Main");
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef([]);

  useEffect(() => {
    const activeIndex = ["Main", "Design", "Settings", "Stats"].indexOf(activeTab);
    if (tabsRef.current[activeIndex]) {
      const tab = tabsRef.current[activeIndex];
      setIndicatorStyle({
        width: `${tab.offsetWidth}px`,
        left: `${tab.offsetLeft}px`,
      });
    }
  }, [activeTab]);

  const renderComponent = () => {
    switch (activeTab) {
      case "Main":
        return <Page card={card} />
      case "Design":
        return <div>Design Content</div>;
      case "Settings":
        return <Settings card={card} setSelectedCard={setSelectedCard}/>;
      case "Stats":
          return <div>Your statistocs</div>
         
      default:
        return <div>Select a Tab</div>;
    }
  };

  return (
    <div>
      <div className="tab-container">
        {["Main", "Design", "Settings", "Stats"].map((tab, index) => (
          <div
            key={tab}
            ref={(el) => (tabsRef.current[index] = el)}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
        <div className="indicator" style={indicatorStyle}></div>
      </div>
      <div className="content">{renderComponent()}</div>
    </div>
  );
};

export default Topbar;