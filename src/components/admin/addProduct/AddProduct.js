import { useEffect, useState } from "react";
import styles from "./AddProduct.module.scss";
import Card from "../../card/Card";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddProductMutation,
  useGetCategoriesAdminQuery,
  useGetTvaAdminQuery,
  useGetOneProductAdminQuery,
  useUpdateProductPatchMutation,
} from "../../../redux/api/shopApi";
import Loader from "../../../components/loader/Loader";

const initialState = {
  reference: "",
  title: "",
  description: "",
  image: "",
  priceHT: 0,
  stock: 0,
  category_id: 0,
  tva_id: 0,
};

const AddProduct = () => {
  const { param } = useParams();

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [TVA, setTVA] = useState([]);
  const [product, setProduct] = useState(initialState);

  const detectForm = (id, f1, f2) => {
    if (param === "ADD") {
      return f1;
    }
    return f2;
  };

  const { data: tvaData } = useGetTvaAdminQuery();

  const { data: catData } = useGetCategoriesAdminQuery();

  const { data: prodOneData, isSuccess: prodOneIsSuccess } =
    useGetOneProductAdminQuery(parseInt(param));

  useEffect(() => {
    if (catData) setCategories(catData.data);
    if (tvaData) setTVA(tvaData.data);
    if (prodOneIsSuccess) {
      setProduct(prodOneData.data);
    }
  }, [catData, tvaData, param, prodOneIsSuccess, prodOneData]);

  const handleInputChange = (e) => {
    const { name, type, value } = e.target;

    setProduct({ ...product, [name]: value });

    setProduct((product) => {
      const BProduct = { ...product };
      if (type === "number") {
        BProduct[name] = Number(value);
      } else if (name.includes("_id")) {
        BProduct[name] = Number(value);
      } else {
        BProduct[name] = value;
      }
      return BProduct;
    });
  };

  const [updateProductPatch, { isLoading: isUpdateLoadingPatch }] =
    useUpdateProductPatchMutation();

  const [addProduct, { isLoading: isAddLoading }] = useAddProductMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(product);
    await addProduct(product)
      .unwrap()
      .then((result) => {
        toast.success(`${result.data.title} has been created !`);
        navigate("/admin/allProducts");
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const {
      id,
      created_at,
      categories,
      product_reviews,
      tva,
      ...productToEdit
    } = product;
    const P = parseInt(param);
    const myObject = { body: productToEdit, id: P };
    console.log(productToEdit);
    await updateProductPatch(myObject)
      .unwrap()
      .then((result) => {
        toast.success(`${result.data.title} has been updated !`);
        navigate("/admin/allProducts");
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };

  return (
    <>
      {(isAddLoading || isUpdateLoadingPatch) && <Loader />}

      <div className={styles.product}>
        <h2>{detectForm(param, "Add new product", "Edit Product")}</h2>

        <Card cardClass={styles.card}>
          <form action="" onSubmit={detectForm(param, handleAdd, handleUpdate)}>
            <label>Product Reference :</label>
            <input
              type="text"
              placeholder="123ABC0000"
              required
              name="reference"
              value={product.reference}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product title :</label>
            <input
              type="text"
              placeholder="oPhone X"
              required
              name="title"
              value={product.title}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product image :</label>
            <input
              type="url"
              placeholder="Product url image"
              required
              name="image"
              value={product.image}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product price :</label>
            <input
              type="number"
              placeholder="Product price HT"
              required
              name="priceHT"
              value={product.priceHT}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product stock :</label>
            <input
              type="number"
              placeholder="Product stock"
              required
              name="stock"
              value={product.stock}
              onChange={(e) => handleInputChange(e)}
            />

            <label htmlFor="tva_select">Product TVA :</label>
            <select
              name="tva_id"
              id="tva_select"
              required
              onChange={(e) => handleInputChange(e)}
            >
              <option autoFocus>-- choose TVA --</option>
              {TVA.map((t) => {
                const { title, id } = t;
                return (
                  <option key={id} value={id}>
                    {title}
                  </option>
                );
              })}
            </select>

            <label htmlFor="cat_select">Product category :</label>
            <select
              name="category_id"
              id="cat_id"
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" autoFocus>
                {" "}
                -- choose category --
              </option>

              {categories.map((cat) => {
                const { id, title } = cat;
                return (
                  <option key={id} value={id}>
                    {title}
                  </option>
                );
              })}
            </select>

            <label>Product description :</label>
            <textarea
              name="description"
              placeholder="Product description"
              required
              cols="30"
              rows="10"
              value={product.description}
              onChange={(e) => handleInputChange(e)}
            />

            <button className="--btn --btn-primary">
              {detectForm(param, "Create product", "Edit Product")}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;
