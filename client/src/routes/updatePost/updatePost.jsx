import { useContext, useEffect, useState } from "react";
import "./updatePost.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function UpdatePostPage() {
  const post = useLoaderData();

  const { postDetail, user, ...rest } = post;
  console.log(post);
  const [value, setValue] = useState(post.postDetail.desc);
  const [images, setImages] = useState(post.images);
  const [error, setError] = useState("");

  const [query, setQuery] = useState(rest);
  const [detail, setDetail] = useState(postDetail);
  console.log(detail);

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.id !== post.userId) {
      navigate("/profile");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put("/posts/" + query.id, {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images,
        },
        postDetail: {
          desc: value,
          utilities: inputs.utilities,
          pet: inputs.pet,
          income: inputs.income,
          size: parseInt(inputs.size),
          school: parseInt(inputs.school),
          bus: parseInt(inputs.bus),
          restaurant: parseInt(inputs.restaurant),
        },
        userId: currentUser.id,
      });

      // console.log(res);
      navigate("/" + res.data.updatedPost.id);
    } catch (err) {
      console.log(err);
      setError(error);
    }
  };

  const handleChange = (e) => {
    setQuery({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleDetailChange = (e) => {
    setDetail({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Update Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={query.title}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                name="price"
                type="number"
                value={query.price}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                value={query.address}
                onChange={handleChange}
              />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                type="text"
                value={query.city}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input
                min={1}
                id="bedroom"
                name="bedroom"
                type="number"
                value={query.bedroom}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input
                min={1}
                id="bathroom"
                name="bathroom"
                type="number"
                value={query.bathroom}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input
                id="latitude"
                name="latitude"
                type="text"
                value={query.latitude}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input
                id="longitude"
                name="longitude"
                type="text"
                value={query.longitude}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
                value={detail.income}
                onChange={handleDetailChange}
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input
                min={0}
                id="size"
                name="size"
                type="number"
                value={detail.size}
                onChange={handleDetailChange}
              />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input
                min={0}
                id="school"
                name="school"
                type="number"
                value={detail.school}
                onChange={handleDetailChange}
              />
            </div>
            <div className="item">
              <label htmlFor="bus">bus</label>
              <input
                min={0}
                id="bus"
                name="bus"
                type="number"
                value={detail.bus}
                onChange={handleDetailChange}
              />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input
                min={0}
                id="restaurant"
                name="restaurant"
                type="number"
                value={detail.restaurant}
                onChange={handleDetailChange}
              />
            </div>
            <button className="sendButton">Update</button>
            {error && <span>error</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        <h4>Upload new images to replace.</h4>
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "dqbnwumwy",
            uploadPreset: "radproject",
            folder: "posts",
          }}
          setState={setImages}
        />
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
      </div>
    </div>
  );
}

export default UpdatePostPage;
