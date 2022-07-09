import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProductAction } from "../../action/productAction";
import Modal from "../../component/Modal";

const AddProductWrapper = styled.div`
  margin-bottom: auto;
  input {
    flex-grow: 1;
  }

  .margin-1 {
    margin-top: 1rem;
  }

  textarea {
    width: 100%;
    padding: 0;
    border-radius: 3px;
    border: 1px solid rgb(219, 219, 219);
    padding-left: 0.5rem;
    outline: none;

    &:hover {
      border-color: blue;
    }

    &:focus {
      border-color: black;
    }
  }

  select {
    outline: none;
    border-radius: 3px;
    border: 1px solid rgb(219, 219, 219);
    height: 2.5rem;
    flex-grow: 1;
  }

  .line-5 {
    height: 2rem;

    span {
      margin: auto;
      color: red;
    }
  }

  .line-6 {
    button {
      height: 2.5rem;
      background: rgb(248, 74, 47);
      color: white;
      font-weight: 500;

      label {
        display: inline-block;
        width: 100%;
        height: 100%;
        line-height: 2.5rem;
        padding-left: 1rem;
        padding-right: 1rem;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .submit {
    button {
      height: 2.5rem;
      background: rgb(248, 74, 47);
      color: white;
      font-weight: 500;
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
`;

export default function AddProduct() {
  const [error, setError] = useState("");
  const [productName, setProductName] = useState("");
  const [categoryIdSelected, setCategoryIdSelected] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [priceSale, setPriceSale] = useState("");
  const [quantitySale, setQuantitySale] = useState("");
  const [desc, setDesc] = useState("");
  const [productImages, setProductImages] = useState("");
  const [isAddSuccess, setIsAddSuccess] = useState(false);
  const user = useSelector((s) => s.user);
  const categories = useSelector((s) => s.categories);
  const dispatch = useDispatch();

  function handleAddProduct() {
    if (productImages.length === 0) {
      return setError("noImage");
    }
    const form = new FormData();
    form.append("shopId", user._id);
    form.append("productName", productName);
    form.append("categoryIdSelected", categoryIdSelected);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("priceSale", priceSale);
    form.append("quantitySale", quantitySale);
    form.append("desc", desc);
    for (const a in productImages) {
      form.append("productImages", productImages[a]);
    }

    dispatch(addProductAction(form, setError, setIsAddSuccess));
  }

  useEffect(() => {
    document.title = "Shopee - Thêm sản phẩm"
  } , [])

  return (
    <AddProductWrapper className="div-add-products">
      <div className="title-2">THÊM SẢN PHẨM</div>
      <hr className="margin-1" />
      <div className="body-2 flex flex-column">
        <div className="line-1 flex margin-1">
          <input
            type="text"
            placeholder="Tên Sản Phẩm"
            onChange={(e) => {
              setError("");
              setProductName(e.target.value.trim());
            }}
          />
          <select
            onChange={(e) => {
              setError("");
              setCategoryIdSelected(e.target.value);
            }}
          >
            <option value="">Chọn Thể Loại</option>
            {categories.map((value, key) => (
              <option key={key} value={value._id}>
                {value.name}
              </option>
            ))}
          </select>
        </div>
        <div className="line-2 flex margin-1">
          <input
            type="text"
            placeholder="Giá (Đồng)"
            onChange={(e) => {
              setError("");
              setPrice(e.target.value.trim());
            }}
          />
          <input
            type="text"
            placeholder="Số Lượng"
            onChange={(e) => {
              setError("");
              setQuantity(e.target.value.trim());
            }}
          />
        </div>
        <div className="line-3 flex margin-1">
          <input
            type="text"
            placeholder="Giảm Giá (Đồng)"
            onChange={(e) => {
              setError("");
              setPriceSale(e.target.value.trim());
            }}
          />
          <input
            type="text"
            placeholder="Số Lượng Với Giá Đã Giảm"
            onChange={(e) => {
              setError("");
              setQuantitySale(e.target.value.trim());
            }}
          />
        </div>
        <div className="line-4 flex margin-1">
          <textarea
            placeholder="Mô Tả Sản Phẩm"
            onChange={(e) => {
              setError("");
              setDesc(e.target.value.trim());
            }}
          ></textarea>
        </div>
        <div className="line-5 flex">
          {error === "noImage" && <span>Không Có Ảnh Được Tải Lên</span>}
          {error === "productName" && (
            <span>Tên Sản Phẩm không được để trống</span>
          )}
          {error === "categoryIdSelected" && <span>Chưa Chọn Thể Loại</span>}
          {error === "price" && <span>Chưa Nhập Giá Sản Phẩm</span>}
          {error === "quantity" && <span>Chưa Nhập Số Lượng</span>}
        </div>
        <div className="line-6 flex margin-1">
          <input
            style={{ display: "none" }}
            id="img"
            type="file"
            multiple
            onChange={(e) => {
              setError("");
              setProductImages(e.target.files);
            }}
          />
          <button>
            <label htmlFor="img">CHỌN ẢNH</label>
          </button>
        </div>
        <div className="submit flex margin-1">
          <button onClick={handleAddProduct}>THÊM SẢN PHẨM</button>
        </div>
      </div>
      {isAddSuccess && (
        <Modal>
          <div>
            <span>Tạo Sản Phẩm Thành Công</span>
          </div>
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              style={{
                height: "2rem",
                width: "80%",
                background: "rgb(248, 74, 47)",
                color: "white",
                fontWeight: "500",
              }}
              onClick={() => window.location.reload()}
            >
              OK
            </button>
          </div>
        </Modal>
      )}
    </AddProductWrapper>
  );
}
