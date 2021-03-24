import '../img/rectangle.png';

export default () => {
  return (
    <section className="wrap-row">
      <aside className="aside">
        <div className="aside_decor">
          <img src="img/rectangle.png" alt="img"/>
        </div>
        <h2 className="pools-title">New Application</h2>
        <p className="pools-title-descr">Moments away from the xdaistarter</p>

        <ul className="aside_btns-wrap tabs">
          <li className="active">
            <a href="">
              <div className="aside_btn">
                <p className="pools-title-descr">Step 1</p>
                <h2 className="pools-title">Create Application</h2>
              </div>
            </a>
          </li>
          <li>
            <a href="">
              <div className="aside_btn">
                <p className="pools-title-descr">Step 2</p>
                <h2 className="pools-title">XDaiStarter Team Review</h2>
              </div>
            </a>
          </li>
          <li>
            <a href="">
              <div className="aside_btn">
                <p className="pools-title-descr">Step 3</p>
                <h2 className="pools-title">Revision</h2>
              </div>
            </a>
          </li>
          <li>
            <a href="">
              <div className="aside_btn">
                <p className="pools-title-descr">Step 4</p>
                <h2 className="pools-title">XDaiStarter Council Review</h2>
              </div>
            </a>
          </li>
          <li>
            <a href="">
              <div className="aside_btn">
                <p className="pools-title-descr">Step 5</p>
                <h2 className="pools-title">Decisions and Next Steps</h2>
              </div>
            </a>
          </li>




        </ul>
      </aside>
      <section className="forms_content">
        <div className="forms_header">
          <h2>Application<span>/ New application</span></h2>
        </div>

        <div className="forms_content-wrap">
          <div className="tabs-panel active" data-index="0">

            <h2 className="pools-title">Contact information</h2>
            <p className="pools-title-descr">We currently have the following contact information if we want to get in touch with you. Feel free to change it in user </p>
            <div className="forms_info">
              <h4>Contact Name: </h4><span>Alex</span>
            </div>
            <div className="forms_info">
              <h4>Contact Telegram: </h4><span>@telegram</span>
            </div>
            <div className="forms_info">
              <h4>Contact Email: </h4><span>mail#mail.com</span>
            </div>

            <h2 className="pools-title pools-title_form ">Basic information</h2>
            <form action="">
              <label htmlFor="">
                <p>Project Name </p>
                <input type="text" placeholder="Project Name "/>
              </label>
              <label htmlFor="">
                <p>Website URL </p>
                <input type="text" placeholder="Website URL "/>
              </label>
              <label htmlFor="">
                <p>White paper </p>
                <input type="text" placeholder="White paper "/>
              </label>
              <label htmlFor="">
                <p>Telegram Handle </p>
                <input type="text" placeholder="Project Name "/>
              </label>
              <label className="textarea" htmlFor="">
                <p>Telegram Handle </p>
                <textarea name="" id=""
                  placeholder="Token distribution, token sale metrics etc..."></textarea>
              </label>
              <label className="textarea" htmlFor="">
                <p>Description </p>
                <textarea name="" id="" placeholder="Paper Description"></textarea>
              </label>
              <div className="form_disc">
                <p>We will use the description to showcase your project on the pool page
                  if application approved.</p>
              </div>
            </form>
            <h2 className="pools-title pools-title_form ">Founder & progress information</h2>
            <form action="">

              <label className="textarea" htmlFor="">
                <p>Founder Linkedins </p>
                <textarea name="" id="" placeholder="Linkdin URL of founders"></textarea>
              </label>
              <label className="textarea" htmlFor="">
                <p>Github URL </p>
                <textarea name="" id="" placeholder="Github URL"></textarea>
              </label>
              <label className="textarea" htmlFor="">
                <p>State of Development </p>
                <textarea name="" id="" placeholder="Any Product & MVP live? testnet?"></textarea>
              </label>
              <label className="textarea" htmlFor="">
                <p>How much of
                  raised? </p>
                <textarea name="" id="" placeholder="Examole 100k Seed,500k Private sale"></textarea>
              </label>
            </form>
            <h2 className="pools-title pools-title_form ">Founder & progress information</h2>
            <form action="">
              <label htmlFor="" className="col">
                <p>How much are you looking to raise with us? </p>
                <input type="text" placeholder="eg:1000000 "/>
              </label>

              <div className="form_disc2">
                <p>How much are you looking to raise with us? </p>
              </div>
              <div className="form_date">
                <label htmlFor="">
                  <input type="number" placeholder=" "/>
                </label>
                <label htmlFor="">
                  <select className="input_select input_select1">
                    <option selected value="1">March</option>
                    <option value="2">March</option>
                    <option value="3">March</option>
                    <option value="4">March</option>
                  </select>
                </label>
                <label htmlFor="">
                  <select className="input_select input_select2">
                    <option selected value="1">18</option>
                    <option value="2">18</option>
                    <option value="3">18</option>
                    <option value="4">18</option>
                  </select>
                </label>
              </div>
            </form>
            <div className="form_btn-wrap">
              <button className="btn">Submit Application</button>
            </div>
          </div>
          <div className="tabs-panel " data-index="1">
            <h2 className="pools-title">Information</h2>
            <p className="pools-title-descr">We currently have the following contact information if we want to get in touch with you. Feel free to change it in user </p>
            <div className="forms_info">
              <h4>Contact Name: </h4><span>Alex</span>
            </div>
            <div className="forms_info">
              <h4>Contact Telegram: </h4><span>@telegram</span>
            </div>
            <div className="forms_info">
              <h4>Contact Email: </h4><span>mail#mail.com</span>
            </div>
            <h2 className="pools-title pools-title_form ">Basic information</h2>
            <form action="">
              <label htmlFor="">
                <p>Project Name </p>
                <input type="text" placeholder="Project Name "/>
              </label>
              <label htmlFor="">
                <p>Website URL </p>
                <input type="text" placeholder="Website URL "/>
              </label>
              <label htmlFor="">
                <p>White paper </p>
                <input type="text" placeholder="White paper "/>
              </label>
              <label htmlFor="">
                <p>Telegram Handle </p>
                <input type="text" placeholder="Project Name "/>
              </label>
              <label className="textarea" htmlFor="">
                <p>Telegram Handle </p>
                <textarea name="" id=""
                  placeholder="Token distribution, token sale metrics etc..."></textarea>
              </label>
              <label className="textarea" htmlFor="">
                <p>Description </p>
                <textarea name="" id="" placeholder="Paper Description"></textarea>
              </label>
              <div className="form_disc">
                <p>We will use the description to showcase your project on the pool page
                  if application approved.</p>
              </div>
            </form>
            <h2 className="pools-title pools-title_form ">Founder & progress information</h2>
            <form action="">

              <label className="textarea" htmlFor="">
                <p>Founder Linkedins </p>
                <textarea name="" id="" placeholder="Linkdin URL of founders"></textarea>
              </label>
              <label className="textarea" htmlFor="">
                <p>Github URL </p>
                <textarea name="" id="" placeholder="Github URL"></textarea>
              </label>
              <label className="textarea" htmlFor="">
                <p>State of Development </p>
                <textarea name="" id="" placeholder="Any Product & MVP live? testnet?"></textarea>
              </label>
              <label className="textarea" htmlFor="">
                <p>How much of
                  raised? </p>
                <textarea name="" id="" placeholder="Examole 100k Seed,500k Private sale"></textarea>
              </label>
            </form>
            <h2 className="pools-title pools-title_form ">Founder & progress information</h2>
            <form action="">
              <label htmlFor="" className="col">
                <p>How much are you looking to raise with us? </p>
                <input type="text" placeholder="eg:1000000"/>
              </label>

              <div className="form_disc2">
                <p>How much are you looking to raise with us? </p>
              </div>
              <div className="form_date">
                <label htmlFor="">
                  <input type="number" placeholder=" "/>
                </label>
                <label htmlFor="">
                  <select className="input_select input_select1">
                    <option selected value="1">March</option>
                    <option value="2">March</option>
                    <option value="3">March</option>
                    <option value="4">March</option>
                  </select>
                </label>
                <label htmlFor="">
                  <select className="input_select input_select2">
                    <option selected value="1">18</option>
                    <option value="2">18</option>
                    <option value="3">18</option>
                    <option value="4">18</option>
                  </select>
                </label>
              </div>
            </form>
            <div className="form_btn-wrap">
              <button className="btn">Submit Application</button>
            </div>
          </div>
          <div className="tabs-panel " data-index="2">
            <h2 className="pools-title">Contact</h2>
            <p className="pools-title-descr">We currently have the following contact information if we want to get in touch with you. Feel free to change it in user </p>
            <div className="forms_info">
              <h4>Contact Name: </h4><span>Alex</span>
            </div>
            <div className="forms_info">
              <h4>Contact Telegram: </h4><span>@telegram</span>
            </div>
            <div className="forms_info">
              <h4>Contact Email: </h4><span>mail#mail.com</span>
            </div>
            <h2 className="pools-title pools-title_form ">Basic information</h2>
            <form action="">
              <label htmlFor="">
                <p>Project Name </p>
                <input type="text" placeholder="Project Name "/>
              </label>
              <label htmlFor="">
                <p>Website URL </p>
                <input type="text" placeholder="Website URL "/>
              </label>
              <label htmlFor="">
                <p>White paper </p>
                <input type="text" placeholder="White paper "/>
              </label>
              <label htmlFor="">
                <p>Telegram Handle </p>
                <input type="text" placeholder="Project Name "/>
              </label>
              <label className="textarea" htmlFor="">
                <p>Telegram Handle </p>
                <textarea name="" id=""
                  placeholder="Token distribution, token sale metrics etc..."></textarea>
              </label>
              <label className="textarea" htmlFor="">
                <p>Description </p>
                <textarea name="" id="" placeholder="Paper Description"></textarea>
              </label>
              <div className="form_disc">
                <p>We will use the description to showcase your project on the pool page
                  if application approved.</p>
              </div>
            </form>
            <h2 className="pools-title pools-title_form ">Founder & progress information</h2>
            <form action="">

              <label className="textarea" htmlFor="">
                <p>Founder Linkedins </p>
                <textarea name="" id="" placeholder="Linkdin URL of founders"></textarea>
              </label>
              <label className="textarea" htmlFor="">
                <p>Github URL </p>
                <textarea name="" id="" placeholder="Github URL"></textarea>
              </label>
              <label className="textarea" htmlFor="">
                <p>State of Development </p>
                <textarea name="" id="" placeholder="Any Product & MVP live? testnet?"></textarea>
              </label>
              <label className="textarea" htmlFor="">
                <p>How much of
                  raised? </p>
                <textarea name="" id="" placeholder="Examole 100k Seed,500k Private sale"></textarea>
              </label>
            </form>
            <h2 className="pools-title pools-title_form ">Founder & progress information</h2>
            <form action="">
              <label htmlFor="" className="col">
                <p>How much are you looking to raise with us? </p>
                <input type="text" placeholder="eg:1000000 "/>
              </label>

              <div className="form_disc2">
                <p>How much are you looking to raise with us? </p>
              </div>
              <div className="form_date">

                <label htmlFor="">

                  <input type="number" placeholder=" "/>
                </label>
                <label htmlFor="">
                  <select className="input_select input_select1">
                    <option selected value="1">March</option>
                    <option value="2">March</option>
                    <option value="3">March</option>
                    <option value="4">March</option>
                  </select>
                </label>
                <label htmlFor="">
                  <select className="input_select input_select2">
                    <option selected value="1">18</option>
                    <option value="2">18</option>
                    <option value="3">18</option>
                    <option value="4">18</option>
                  </select>
                </label>
              </div>
            </form>
            <div className="form_btn-wrap">
              <button className="btn">Submit Application</button>
            </div>
          </div>
          <div className="tabs-panel " data-index="3">

            <h2 className="pools-title">Contact have</h2>
            <p className="pools-title-descr">We currently have the following contact information if we want to get in touch with you. Feel free to change it in user </p>
            <div className="forms_info">
              <h4>Contact Name: </h4><span>Alex</span>
            </div>
            <div className="forms_info">
              <h4>Contact Telegram: </h4><span>@telegram</span>
            </div>
            <div className="forms_info">
              <h4>Contact Email: </h4><span>mail#mail.com</span>
            </div>

            <h2 className="pools-title pools-title_form ">Basic information</h2>
            <form action="">
              <label htmlFor="">
                <p>Project Name </p>
                <input type="text" placeholder="Project Name "/>
              </label>
              <label htmlFor="">
                <p>Website URL </p>
                <input type="text" placeholder="Website URL "/>
              </label>
              <label htmlFor="">
                <p>White paper </p>
                <input type="text" placeholder="White paper "/>
              </label>
              <label htmlFor="">
                <p>Telegram Handle </p>
                <input type="text" placeholder="Project Name "/>
              </label>
              <label className="textarea" htmlFor="">
                <p>Telegram Handle </p>
                <textarea name="" id=""
                  placeholder="Token distribution, token sale mertics elc..."></textarea>
              </label>
              <label className="textarea" htmlFor="">
                <p>Description </p>
                <textarea name="" id="" placeholder="Paper Description"></textarea>
              </label>
              <div className="form_disc">
                <p>We will use the description to showcase your project on the pool page
                  if application approved.</p>
              </div>
            </form>
            <h2 className="pools-title pools-title_form ">Founder & progress information</h2>
            <form action="">

              <label className="textarea" htmlFor="">
                <p>Founder Linkedins </p>
                <textarea name="" id="" placeholder="Linkdin URL of founders"></textarea>
              </label>
              <label className="textarea" htmlFor="">
                <p>Github URL </p>
                <textarea name="" id="" placeholder="Github URL"></textarea>
              </label>
              <label className="textarea" htmlFor="">
                <p>State of Development </p>
                <textarea name="" id="" placeholder="Any Product & MVP live? testnet?"></textarea>
              </label>
              <label className="textarea" htmlFor="">
                <p>How much of
                  raised? </p>
                <textarea name="" id="" placeholder="Examole 100k Seed,500k Private sale"></textarea>
              </label>
            </form>
            <h2 className="pools-title pools-title_form ">Founder & progress information</h2>
            <form action="">
              <label htmlFor="" className="col">
                <p>How much are you looking to raise with us? </p>
                <input type="text" placeholder=" eg:1000000"/>
              </label>

              <div className="form_disc2">
                <p>How much are you looking to raise with us? </p>
              </div>
              <div className="form_date">

                <label htmlFor="">

                  <input type="number" placeholder=" "/>
                </label>
                <label htmlFor="">
                  <select className="input_select input_select1">
                    <option selected value="1">March</option>
                    <option value="2">March</option>
                    <option value="3">March</option>
                    <option value="4">March</option>
                  </select>
                </label>
                <label htmlFor="">
                  <select className="input_select input_select2">
                    <option selected value="1">18</option>
                    <option value="2">18</option>
                    <option value="3">18</option>
                    <option value="4">18</option>
                  </select>
                </label>
              </div>
            </form>
            <div className="form_btn-wrap">
              <button className="btn">Submit Application</button>
            </div>
          </div>
          <div className="tabs-panel " data-index="4">

            <h2 className="pools-title">Contact currently</h2>
            <p className="pools-title-descr">We currently have the following contact information if we want to get in touch with you. Feel free to change it in user </p>
            <div className="forms_info">
              <h4>Contact Name: </h4><span>Alex</span>
            </div>
            <div className="forms_info">
              <h4>Contact Telegram: </h4><span>@telegram</span>
            </div>
            <div className="forms_info">
              <h4>Contact Email: </h4><span>mail#mail.com</span>
            </div>

            <h2 className="pools-title pools-title_form ">Basic information</h2>
            <form action="">
              <label htmlFor="">
                <p>Project Name </p>
                <input type="text" placeholder="Project Name "/>
              </label>
              <label htmlFor="">
                <p>Website URL </p>
                <input type="text" placeholder="Website URL "/>
              </label>
              <label htmlFor="">
                <p>White paper </p>
                <input type="text" placeholder="White paper "/>
              </label>
              <label htmlFor="">
                <p>Telegram Handle </p>
                <input type="text" placeholder="Project Name "/>
              </label>
              <label className="textarea" htmlFor="">
                <p>Telegram Handle </p>
                <textarea name="" id=""
                  placeholder="Token distribution, token sale mertics elc..."></textarea>
              </label>
              <label className="textarea" htmlFor="">
                <p>Description </p>
                <textarea name="" id="" placeholder="Paper Description"></textarea>
              </label>
              <div className="form_disc">
                <p>We will use the description to showcase your project on the pool page
                  if application approved.</p>
              </div>
            </form>
            <h2 className="pools-title pools-title_form ">Founder & progress information</h2>
            <form action="">

              <label className="textarea" htmlFor="">
                <p>Founder Linkedins </p>
                <textarea name="" id="" placeholder="Linkdin URL of founders"></textarea>
              </label>
              <label className="textarea" htmlFor="">
                <p>Github URL </p>
                <textarea name="" id="" placeholder="Github URL"></textarea>
              </label>
              <label className="textarea" htmlFor="">
                <p>State of Development </p>
                <textarea name="" id="" placeholder="Any Product & MVP live? testnet?"></textarea>
              </label>
              <label className="textarea" htmlFor="">
                <p>How much of
                  raised? </p>
                <textarea name="" id="" placeholder="Examole 100k Seed,500k Private sale"></textarea>
              </label>
            </form>
            <h2 className="pools-title pools-title_form ">Founder & progress information</h2>
            <form action="">
              <label htmlFor="" className="col">
                <p>How much are you looking to raise with us? </p>
                <input type="text" placeholder="eg:1000000 "/>
              </label>

              <div className="form_disc2">
                <p>How much are you looking to raise with us? </p>
              </div>
              <div className="form_date">

                <label htmlFor="">

                  <input type="number" placeholder=""/>
                </label>
                <label htmlFor="">
                  <select className="input_select input_select1">
                    <option selected value="1">March</option>
                    <option value="2">March</option>
                    <option value="3">March2</option>
                    <option value="4">March3</option>
                  </select>
                </label>
                <label htmlFor="">
                  <select className="input_select input_select2">
                    <option selected value="1">18</option>
                    <option value="2">17</option>
                    <option value="3">19</option>
                    <option value="4">20</option>
                  </select>
                </label>
              </div>
            </form>
            <div className="form_btn-wrap">
              <button className="btn">Submit Application</button>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}