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
          <div data-index="0">
            <div className="applicant_info_header">
              <h2 className="medium_title">Contact information</h2>
              <p className="medium_descriptor">We currently have the following contact information if we want to get in touch with you. Feel free to change it in user </p>
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
              <h2 className="medium_title">Basic Information</h2>
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
                <label htmlFor="socialHandle">Social Media Handle</label>
                <input name="socialHandle" type="text" placeholder="@us"/>
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
                <label className="textarea" htmlFor="founders">Founder Profiles</label>
                <p className="">Please separate by a comma</p>
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
                  <div className="form_date">
                    <div className="date_input">
                      <label htmlFor="year"></label>
                      <input name="year" type="number" value="2021" />
                    </div>
                    <div className="date_input">
                      <label htmlFor="month"></label>
                      <select name="month" className="input_select">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </select>
                    </div>
                    <div className="date_input">
                      <label htmlFor="day">
                      </label>
                      <select name="day" className="input_select">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <input className="form_btn" type="submit" value="Submit Application"></input>
            </div>
          </div>
        </form>
      </section>
    </section>
  )
}
