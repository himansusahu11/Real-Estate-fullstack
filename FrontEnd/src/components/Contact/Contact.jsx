import React from "react";
import "./Contact.css";
import { MdCall } from "react-icons/md";
import { BsFillChatDotsFill } from "react-icons/bs";
import { HiChatBubbleBottomCenter } from "react-icons/hi2";
const Contact = () => {
  return (
    <section className="c-wrapper">
      <div className="paddings innerWidth  contact-container">
        {/* left side  */}
        <div className="c-left">
          <span className="orangeText">Our Contact</span>
          <span className="primaryText">Easy to Contact us</span>
          <span className="secondaryText">
            We always ready to help by providing the best service for you. We
            beleive a good place to live can make your life better
          </span>

          <div className="contactModes">
            {/* first row  */}
            <div className="row">
              {/* first mode  */}
              <div className="mode">
                <div className="top">
                  <div className="flexCenter icon">
                    <MdCall size={25} />
                  </div>
                  <div className="detail">
                    <span className="primaryText">Call</span>
                    <span className="secondaryText">012 123 145 14</span>
                  </div>
                </div>
                <div className="button">Call Now</div>
              </div>

              {/* second mode  */}
              <div className="mode">
                <div className="top">
                  <div className="flexCenter icon">
                    <BsFillChatDotsFill size={25} />
                  </div>
                  <div className="detail">
                    <span className="primaryText">Chat</span>
                    <span className="secondaryText">012 123 145 14</span>
                  </div>
                </div>
                <div className="button">Chat Now</div>
              </div>
            </div>

            {/* second row  */}
            <div className="row">
              {/* third mode  */}
              <div className="mode">
                <div className="top">
                  <div className="flexCenter icon">
                    <BsFillChatDotsFill size={25} />
                  </div>
                  <div className="detail">
                    <span className="primaryText">Video Call</span>
                    <span className="secondaryText">012 123 145 14</span>
                  </div>
                </div>
                <div className="button">Video Call Now</div>
              </div>

              {/* fourth mode  */}
              <div className="mode">
                <div className="top">
                  <div className="flexCenter icon">
                    <HiChatBubbleBottomCenter size={25} />
                  </div>
                  <div className="detail">
                    <span className="primaryText">Message</span>
                    <span className="secondaryText">012 123 145 14</span>
                  </div>
                </div>
                <div className="button">Message Now</div>
              </div>
            </div>
          </div>
        </div>
        {/* right side  */}
        <div className="c-right">
          <div className="image-container">
            <img src="./contact.jpg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
