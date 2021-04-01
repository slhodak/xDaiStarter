import React from 'react';
import '../js/jquery.nice-select.min.js';
import '../img/rectangle.png';

export default class Application extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
    ($('select') as any).niceSelect();
  }

  render() {
    return (
      <section className="xdaistarter_apply">
        <aside className="aside">
          <div className="aside_header">
            <div className="aside_decor">
              <img src="img/rectangle.png" alt="img"/>
            </div>
            <h2 className="apply_title">New Application</h2>
            <p className="apply_descriptor">Moments away from the xDaiStarter</p>
          </div>
          <ul className="aside_btns_wrap">
            <li>
              <div className="aside_btn">
                <p className="apply_descriptor">Step 1</p>
                <h2 className="apply_title">Create Application</h2>
              </div>
            </li>
            <li>
              <div className="aside_btn">
                <p className="apply_descriptor">Step 2</p>
                <h2 className="apply_title">XDaiStarter Team Review</h2>
              </div>
            </li>
            <li>
              <div className="aside_btn">
                <p className="apply_descriptor">Step 3</p>
                <h2 className="apply_title">Revision</h2>
              </div>
            </li>
            <li>
              <div className="aside_btn">
                <p className="apply_descriptor">Step 4</p>
                <h2 className="apply_title">XDaiStarter Council Review</h2>
              </div>
            </li>
            <li>
              <div className="aside_btn">
                <p className="apply_descriptor">Step 5</p>
                <h2 className="apply_title">Decisions and Next Steps</h2>
              </div>
            </li>
          </ul>
        </aside>
        <section className="apply_main">
          <div className="apply_main_header">
            <h2>Application<span>/ New application</span></h2>
          </div>
          <div className="apply_form">
            <div data-index="0">
              <div className="applicant_info_box">
                <h2 className="apply_title">Contact information</h2>
                <p>We currently have the following contact information if we want to get in touch with you. Feel free to change it in user </p>
              </div>
              <div className="applicant_info">
                <h4>Contact Name:</h4>
                <span>Alex</span>
              </div>
              <div className="applicant_info">
                <h4>Contact Telegram:</h4>
                <span>@telegram</span>
              </div>
              <div className="applicant_info">
                <h4>Contact Email:</h4>
                <span>mail#mail.com</span>
              </div>
              <div className="application_inputs">
                <h2 className="apply_title">Basic information</h2>
                <div className="labeled_input">
                  <label htmlFor="">Project Name</label>
                  <input type="text" placeholder="Project Name "/>
                </div>
                <div className="labeled_input">
                  <label htmlFor="">Website URL</label>
                  <input type="text" placeholder="Website URL "/>
                </div>
                <div className="labeled_input">
                  <label htmlFor="">White paper</label>
                  <input type="text" placeholder="White paper "/>
                </div>
                <div className="labeled_input">
                  <label htmlFor="">Telegram Handle</label>
                  <input type="text" placeholder="Project Name "/>
                </div>
                <div className="labeled_input">
                  <label className="textarea" htmlFor="">Telegram Handle</label>
                  <textarea name="" id="" placeholder="Token distribution, token sale metrics etc..."></textarea>
                </div>
                <div className="labeled_input">
                  <label className="textarea" htmlFor="">Description</label>
                  <textarea name="" id="" placeholder="Paper Description"></textarea>
                </div>
                <p>We will use the description to showcase your project on the pool page if application approved.</p>
              </div>
              <div className="application_inputs">
                <h2 className="apply_title">Founder & progress information</h2>
                <div className="labeled_input">
                  <label className="textarea" htmlFor="">Founder Linkedins</label>
                  <textarea name="" id="" placeholder="Linkdin URL of founders"></textarea>
                </div>
                <div className="labeled_input">
                  <label className="textarea" htmlFor="">Github URL</label>
                  <textarea name="" id="" placeholder="Github URL"></textarea>
                  </div>
                <div className="labeled_input">
                  <label className="textarea" htmlFor="">State of Development</label>
                  <textarea name="" id="" placeholder="Any Product & MVP live? Testnet?"></textarea>
                </div>
                <div className="labeled_input">
                  <label className="textarea" htmlFor="">How much of raised?</label>
                  <textarea name="" id="" placeholder="Example 100k Seed, 500k Private sale"></textarea>
                </div>
              </div>
              <div className="application_inputs">
                <h2 className="apply_title">Founder & progress information</h2>
                <div className="column_input">
                  <p>How much are you looking to raise with us?</p>
                  <input type="text" placeholder="eg:1000000 "/>
                </div>
                <div className="column_input">
                  <p>When would you like to launch?</p>
                  <div className="form_date">
                    <label htmlFor="Year"></label>
                    <input type="number" value="2021" onChange={() => {}} />
                    <label htmlFor="Month"></label>
                    <select className="input_select">
                    </select>
                    <label htmlFor="Day"></label>
                    <select className="input_select">
                    </select>
                  </div>
                </div>
                <div className="form_btn-wrap">
                  <button className="btn">Submit Application</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    )
  }
}
