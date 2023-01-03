import { useTheme } from "@emotion/react";
import { Button, FormControl, FormLayout, Page } from "../common/layout";
import styled from "@emotion/styled";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { changeInput } from "../utils";
import API from "../api";
import { FormButtons } from "../common/layout";
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
  };
  const clearInputs = () => setInputs(() => initialInputs);
  const submitForm = async (e) => {
    try {
      e.preventDefault();
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
      const { data } = await API.post("/boughtcar", carBody);
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
        (res) => res.data
      );
      console.log(`Owner response: `, responses[0]);
      responses.length === 2 && console.log(`Seller response: `, responses[1]);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <CurrentPage theme={theme}>
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
              <label htmlFor="owner">Owner Passport ID</label>
              <input
                type="text"
                name="owner"
                id="owner"
                value={state.user.passportID}
                disabled
              />
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
