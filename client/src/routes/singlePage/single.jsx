import React, { useEffect, useState } from "react";
import "../singlePage/single.scss";
import Slider from "../../components/slider/slider.jsx";
import Map from "../../components/map/map.jsx";
import { singlePostData, userData } from "../../lib/dummydata";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function single() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(currentUser);
  console.log(post);
  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }

    setSaved((prev) => !prev);

    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      setSaved((prev) => !prev);
      console.log(err);
    }
  };

  const handleChat = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    try {
      await apiRequest.post("/chats/", { receiverId: post.userId });
      navigate(`/profile`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    try {
      await apiRequest.delete("/posts/" + post.id);
      navigate(`/profile`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1> {post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar || "/noavatar.jpg"} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          {currentUser && currentUser.id == post.userId ? (
            <>
              <p className="title">Action</p>
              <div className="buttons">
                <button>
                  <Link to={`/update/${post.id}`}>Update Post</Link>
                </button>
                <button
                  onClick={handleDelete}
                  style={{
                    backgroundColor: "#ff6a6a",
                  }}
                >
                  Delete Post
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {post.postDetail.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetail.pet === "allowed" ? (
                  <p>Pets allowed</p>
                ) : (
                  <p>Pets not allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>

          <div className="sizes"></div>
          <p className="title">Nearby places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>
                  {post.postDetail.school > 999
                    ? post.postDetail.school / 1000 + "km"
                    : post.postDetail.school + "m"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>
                  {post.postDetail.bus > 999
                    ? post.postDetail.bus / 1000 + "km"
                    : post.postDetail.bus + "m"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>
                  {post.postDetail.restaurant > 999
                    ? post.postDetail.restaurant / 1000 + "km"
                    : post.postDetail.restaurant + "m"}{" "}
                  away
                </p>
              </div>
            </div>
          </div>

          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            {currentUser && currentUser.id !== post.userId ? (
              <>
                <button onClick={handleChat}>
                  <img src="/chat.png" alt="" />
                  Send a Message
                </button>
                <button
                  onClick={handleSave}
                  style={{
                    backgroundColor: saved ? "#fece51" : "white",
                  }}
                >
                  <img src="/save.png" alt="" />
                  {saved ? "Place saved" : "Save the Place"}
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default single;
