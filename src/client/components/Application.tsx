import React from 'react';
const { useEffect } = React;
import '../js/jquery.nice-select.min.js';
import '../img/rectangle.png';

export default (props: any) => {
  console.log(props.location);
  useEffect(() => {
    ($('select') as any).niceSelect();
  });

  return (
    <section className="xdaistarter_apply">
      <div className="apply_main_header top">
        <h2>Application<span>/ New application</span></h2>
      </div>
      <aside className="aside">
        <div className="aside_header">
          <div className="aside_decor">
            <img src="img/rectangle.png" alt="img"/>
          </div>
          <h2 className="medium_title">New Application</h2>
          <p className="medium_descriptor">Moments away from the xDaiStarter</p>
        </div>
        <ul className="aside_btns_wrap">
          <li>
            <div className="aside_btn">
              <p className="medium_descriptor">Step 1</p>
              <h2 className="medium_title">Create Application</h2>
            </div>
          </li>
          <li>
            <div className="aside_btn">
              <p className="medium_descriptor">Step 2</p>
              <h2 className="medium_title">XDaiStarter Team Review</h2>
            </div>
          </li>
          <li>
            <div className="aside_btn">
              <p className="medium_descriptor">Step 3</p>
              <h2 className="medium_title">Revision</h2>
            </div>
          </li>
          <li>
            <div className="aside_btn">
              <p className="medium_descriptor">Step 4</p>
              <h2 className="medium_title">XDaiStarter Council Review</h2>
            </div>
          </li>
          <li>
            <div className="aside_btn">
              <p className="medium_descriptor">Step 5</p>
              <h2 className="medium_title">Decisions and Next Steps</h2>
            </div>
          </li>
        </ul>
      </aside>
      <section className="apply_main">
        <div className="apply_main_header">
          <h2>Application<span>/ New application</span></h2>
        </div>
        <form action="/application" method="post" className="apply_form">
          <div className="application_inputs">
            <h2 className="medium_title">Contact Information</h2>
            <div className="labeled_input">
              <label htmlFor="contactName">Name</label>
              <input name="contactName" type="text" placeholder="Full Name"/>
            </div>
            <div className="labeled_input">
              <label htmlFor="contactSocial">Social Media</label>
              <input name="contactSocial" type="text" placeholder="@founder"/>
            </div>
            <div className="labeled_input">
              <label htmlFor="contactEmail">Email</label>
              <input name="contactEmail" type="text" placeholder="Project Name"/>
            </div>
            <h2 className="medium_title">Project Information</h2>
            <div className="labeled_input">
              <label htmlFor="projectName">Project Name</label>
              <input name="projectName" type="text" placeholder="Project Name"/>
            </div>
            <div className="labeled_input">
              <label htmlFor="websiteURL">Website URL</label>
              <input name="websiteURL" type="text" placeholder="Website URL"/>
            </div>
            <div className="labeled_input">
              <label htmlFor="whitepaper">Whitepaper</label>
              <input name="whitepaper" type="text" placeholder="Whitepaper URL"/>
            </div>
            <div className="labeled_input">
              <label htmlFor="linkChat">Community Chat (Discord, Telegram...)</label>
              <input name="linkChat" type="text" placeholder="discord.com/ourserver"/>
            </div>
            <div className="labeled_input">
              <label htmlFor="linkTwitter">Project Twitter</label>
              <input name="linkTwitter" type="text" placeholder="@ourproject"/>
            </div>
            <div className="labeled_input">
              <label className="textarea" htmlFor="description">Description</label>
              <textarea name="description" placeholder="Paper Description"></textarea>
            </div>
            <p>We will use the description to showcase your project on the pool page if the application is approved.</p>
          </div>
          <div className="application_inputs">
            <h2 className="medium_title">Founder & Progress Information</h2>
            <div className="labeled_input">
              <div className="label_container">
                <label className="textarea" htmlFor="founders">Founder Profiles</label>
                <p>Please separate by a comma</p>
              </div>
              <textarea name="founders" placeholder="Professional Bios, Personal Sites, LinkedIn URLs, etc, of founders"></textarea>
            </div>
            <div className="labeled_input">
              <label className="textarea" htmlFor="github">Github URL</label>
              <textarea name="github" placeholder="Github URL"></textarea>
              </div>
            <div className="labeled_input">
              <label className="textarea" htmlFor="stateOfDevelopment">State of Development</label>
              <textarea name="stateOfDevelopment" placeholder="Any Product & MVP live? Testnet?"></textarea>
            </div>
            <div className="labeled_input">
              <label className="textarea" htmlFor="amountRaised">How much raised so far?</label>
              <textarea name="amountRaised" placeholder="Example 100k Seed, 500k Private sale"></textarea>
            </div>
          </div>
          <div className="application_inputs">
            <h2 className="medium_title">Capital & Timeline</h2>
            <div className="column_inputs">
              <div className="column_input">
                <p className="medium_descriptor">How much are you looking to raise with us?</p>
                <input name="hardcap" type="text" placeholder="eg:1000000 "/>
              </div>
              <div className="column_input">
                <p className="medium_descriptor">When would you like to launch?</p>
                <label style={{display: "none"}} htmlFor="date">Date</label>
                <input type="date" name="launchDate"></input>
              </div>
            </div>
            <input className="form_btn" type="submit" value="Submit Application"></input>
          </div>
        </form>
      </section>
    </section>
  )
}
