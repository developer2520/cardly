import React, { useState, useRef, useEffect } from "react";
// import Overview from './../cardDetails/details/overview/overview';
import './topbar.css'
import Page from './../page/page'
import Design from './../design/design'

const Topbar = ({ card, isNewCard, setSelectedCard, setIsCreatingNewCard }) => {
  const [activeTab, setActiveTab] = useState("Main");
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef([]);

  useEffect(() => {
    const activeIndex = ["Main", "Design", ].indexOf(activeTab);
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
        return <Page setSelectedCard={setSelectedCard} setIsCreatingNewCard={setIsCreatingNewCard}/>
      case "Design":
        return <Design />;
      // case "Settings":
      //   return <div>Settings Content</div>;
      default:
        return <div>Select a Tab</div>;
    }
  };

  return (
    <div className="topbar-container">
       
      <div className="tab-container">
        {["Main", "Design", ].map((tab, index) => (
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