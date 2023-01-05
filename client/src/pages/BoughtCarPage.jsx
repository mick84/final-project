import { useTheme } from "@emotion/react";
import { Button, FormControl, FormLayout, Page } from "../common/layout";
import styled from "@emotion/styled";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { changeInput } from "../utils";
import API from "../api";
import { FormButtons } from "../common/layout";
import { Loader } from "../components/Loader";
const CurrentPage = styled(Page)``;
const Form = styled(FormLayout)`
  & .info {
    display: flex;
    gap: 1rem;
  }
  @media screen and (max-width: 700px) {
    & .info {
      flex-direction: column;
    }
  }
`;
export default function BoughtCarPage(props) {
  const theme = useTheme();
  const { state } = useAuth();
  const [reqState, setReqState] = useState({
    loading: false,
    error: null,
  });
  const initialInputs = {
    sellerPassportID: "",
    sellerPhone: "",
    previousOwnerPassportID: "",
    ownerPhone: "",
    brand: "",
    model: "",
    VIN: "",
    licensePlate: "",
    ownershipDate: "2023-01-01",
  };
  const [inputs, setInputs] = useState(initialInputs);
  const handleInputChange = ({ target }) => {
    changeInput(target, setInputs);
    reqState.error && setReqState((st) => ({ ...st, error: null }));
  };
  const clearInputs = () => setInputs(() => initialInputs);
  //const [file, setFile] = useState(null);
  //const changeFile = (e) => setFile(e.target.files[0]);
  const submitForm = async (e) => {
    try {
      e.preventDefault();
      setReqState((st) => ({ ...st, loading: true }));
      const {
        sellerPassportID,
        sellerPhone,
        previousOwnerPassportID,
        ownerPhone,
        brand,
        model,
        VIN,
        licensePlate,
        ownershipDate,
      } = inputs;
      /*
      const formdata = new FormData();
      formdata.append("name", `${licensePlate}_${VIN}`);
      formdata.append("file", file);
      const { data: licenseResponse } = await API.post(
        "/boughtcar/license",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      console.log(licenseResponse);
      */
      const role =
        sellerPassportID === previousOwnerPassportID ? "owner" : "seller";
      const carBody = {
        brand,
        model,
        VIN,
        licensePlate,
        ownershipDate,
        ownerID: state.user._id,
      };
      const { data } = await API.post("/boughtcar", carBody, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      let sellerBody = null;
      let sellerReq = null;
      const ownerBody = {
        passportID: previousOwnerPassportID,
        phoneNumber: ownerPhone,
        saleDate: ownershipDate,
        role: "owner",
        carID: data.carID,
      };
      if (role === "seller") {
        sellerBody = {
          passportID: sellerPassportID,
          phoneNumber: sellerPhone,
          saleDate: ownershipDate,
          carID: data.carID,
          role,
        };
        sellerReq = API.post("/seller", sellerBody);
      }

      const ownerReq = API.post("/seller", ownerBody);
      const requests = [ownerReq];
      sellerReq && requests.push(sellerReq);
      const responses = (await Promise.allSettled(requests)).map(
        (r) => r.value.data
      );
      console.log(`Owner response: `, responses[0]);
      responses.length === 2 && console.log(`Seller response: `, responses[1]);
    } catch (error) {
      setReqState((st) => ({ ...st, error }));
      console.dir(error);
    } finally {
      clearInputs();
      setReqState((st) => ({ ...st, loading: false }));
    }
  };

  return (
    <CurrentPage theme={theme}>
      {reqState.loading && <Loader />}
      <Form onSubmit={submitForm} onReset={clearInputs}>
        <div className="title">Info: Please fill carefully</div>
        <hr />
        <div className="info">
          <div className="personal">
            <p className="title">Personal</p>
            <FormControl>
              <label htmlFor="sellerPassportID">Seller Passport ID</label>
              <input
                type="text"
                name="sellerPassportID"
                id="sellerPassportID"
                value={inputs.sellerPassportID}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <label htmlFor="sellerPhone">Seller phone number</label>
              <input
                type="text"
                name="sellerPhone"
                id="sellerPhone"
                value={inputs.sellerPhone}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <label htmlFor="previousOwnerPassportID">
                Previous owner Passport ID
              </label>
              <input
                type="text"
                name="previousOwnerPassportID"
                id="previousOwnerPassportID"
                value={inputs.previousOwnerPassportID}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <label htmlFor="ownerPhone">Previous owner phone number</label>
              <input
                type="text"
                name="ownerPhone"
                id="ownerPhone"
                value={inputs.ownerPhone}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <label htmlFor="ownershipDate">Ownership date</label>
              <input
                type="date"
                name="ownershipDate"
                id="ownershipDate"
                value={inputs.ownershipDate}
                onChange={handleInputChange}
              />
            </FormControl>
          </div>
          <div className="car">
            <div className="title">Car</div>
            <FormControl>
              <label htmlFor="brand">Car Brand</label>
              <input
                type="text"
                name="brand"
                id="brand"
                value={inputs.brand}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <label htmlFor="model">Car model</label>
              <input
                type="text"
                name="model"
                id="model"
                value={inputs.model}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <label htmlFor="VIN">VIN</label>
              <input
                type="text"
                name="VIN"
                id="VIN"
                value={inputs.VIN}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <label htmlFor="licensePlate">License Plate</label>
              <input
                type="text"
                name="licensePlate"
                id="licensePlate"
                value={inputs.licensePlate}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <label htmlFor="license">Your ID: (can not change)</label>
              <input
                type="text"
                name="owner"
                id="owner"
                value={state.user.passportID}
                disabled
              />
              {/* <input
                type="file"
                name="license"
                id="license"
                accept=".pdf"
                onChange={changeFile}
                hidden
              /> */}
            </FormControl>
          </div>
        </div>
        <FormButtons>
          <Button type="reset">Clear</Button>
          <Button type="submit">Submit</Button>
        </FormButtons>
      </Form>
    </CurrentPage>
  );
}
