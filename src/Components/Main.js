import React, { useState, useEffect } from "react";
import Edit from "../images/Edit-s.png";
import Trash from "../images/trash.png";

const Main = () => {
  const [data, setData] = useState(
    {
    title: "",
    msg: "",
    }
  );

  const [dbDatas, setDbDatas] = useState([]);
  const [showbtn, setshowbtn] = useState(false);

  const handleIput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const addData = (e) => {
    e.preventDefault();
    const { title, msg } = data;
    
    if (!title || !msg) {
      alert("Please fill the field");
    } else {
      fetch("http://localhost:5000/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((res) => fetchData())
        .catch((error) => console.error(error));
      setData({ title: "", msg: "" });
    }
    setshowbtn(false);
  };

  const dleteNote = (indx, name) => {
    if (window.confirm(`Are you sure want to delete ${name}`)) {
      fetch("http://localhost:5000/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: indx,
        }),
      })
        .then((response) => response.json())
        .then((res) =>  fetchData())
        .catch((error) => console.error(error));
     
    } else {
      console.log(indx);
    }
  };

  const fetchData = async () => {
    const KeepDBData = await fetch("http://localhost:5000/data");
    const DbData = await KeepDBData.json();
    setDbDatas(DbData.findResult);
  };

  
  useEffect(() => {
    fetchData();
  }, [data]);

  const formattedDate = (e) => {
    var d = new Date(e),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("/");
  };

  const editData = (id) => {
    fetch("http://localhost:5000/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        return setData(res.userData);
      });
    setshowbtn(true);
  };

  const update = (e) => {
    fetch("http://localhost:5000/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => fetchData())
      .catch((error) => console.error(error));
    setData({ title: "", msg: "" });
    setshowbtn(false);
  };

  return (
    <>
      <section className="main_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 m-auto col-md-6 col-sm-6 col-12">
              <div className="nots_main">
                <h2>Create Notes</h2>
                <div className="nots_frm">
                  <div>
                    <input
                      placeholder="Title..."
                      onChange={handleIput}
                      name="title"
                      value={data.title}
                      className="inpt_field"
                    />
                    <textarea
                      placeholder="Message..."
                      className="inpt_field"
                      onChange={handleIput}
                      value={data.msg}
                      name="msg"
                    ></textarea>
                    <button className="frm_btn" onClick={addData}>
                     {showbtn === true ? 'Create' : 'Add➕' } 
                    </button>

                    {showbtn === true ? (
                      <button className="frm_btn" onClick={() => update(data)}>
                        Update
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="not_data">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="all_nots">
                {dbDatas.map((value, indx) => {
                  return (
                    <div className="nots_bx" key={indx}>
                      <h3>{value.title}</h3>
                      <p className="msg_detls">{value.msg}</p>
                      <p className="dateFrmt">
                        {formattedDate(value.createdAt)}
                      </p>
                      <button
                        className="dlt_btn edit"
                        onClick={() => editData(value._id)}
                      >
                        <img src={Edit} alt="Edit icon" />
                      </button>
                      <button
                        className="dlt_btn"
                        onClick={() => dleteNote(value._id, value.title)}
                      >
                        <img src={Trash} alt="Trash icon" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;
