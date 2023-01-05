import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import { FormControl, FormLayout, Page } from "../common/layout";
import { changeInput } from "../utils";
import { Button } from "../common/layout";
import { FormButtons } from "../common/layout";
import API from "../api";
const CheckPage = styled(Page)`
  .services-list {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  .service {
    padding: 1rem;
    border: 2px solid white;
    font-size: 1.25rem;
    color: #2c2c2c;
    font-weight: bold;
    border-radius: 0.5rem;
    max-width: 500px;
    //background-image: linear-gradient(to bottom, #000000b0 20%, gray 80%);
    .name {
      font-size: 1.5rem;
      border-bottom: 2px solid lightblue;
    }
    form {
      max-width: 400px;
      margin: auto;
    }
  }
  .results {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
export default function CheckSellerPage(props) {
  const theme = useTheme();
  const [results, setResults] = useState(null);
  const initialInputs = {
    passportID: "",
    phoneNumber: "",
    licensePlate: "",
    VIN: "",
  };
  const handleInputChange = ({ target }) => {
    changeInput(target, setInputs);
  };
  const [inputs, setInputs] = useState(initialInputs);
  const findSeller = async (e) => {
    try {
      e.preventDefault();
      const { passportID } = inputs;
      const { data } = await API.get(`/seller/${passportID}`);

      setResults(() => data);
      console.log(results);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
  return (
    <CheckPage theme={theme}>
      <p className="page-title">Our services</p>
      <div className="services-list">
        <div className="service">
          <p className="name">
            Find person's car sell records by his/her passport ID or cell number
          </p>
          <p className="note"> </p>
          <FormLayout onSubmit={findSeller}>
            <p className="title">Fill here:</p>
            <FormControl>
              <label htmlFor="passportID">Person passport ID</label>
              <input
                type="text"
                name="passportID"
                id="passportID"
                placeholder="9 digits only"
                pattern="[0-9]{9}"
                title="9 digits without any extra symbols"
                value={inputs.passportID}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormButtons>
              <Button type="reset">Clear</Button>
              <Button type="submit">Submit</Button>
            </FormButtons>
          </FormLayout>
        </div>
        {/* <div className="service">
          <p className="name">
            Find specific car's ownership records by its license plate or VIN
            number
          </p>
          <p className="note"> </p>
        </div> */}
        <div className="results">
          {results?.soldCars.map((car, index) => (
            <div className="result" key={index + car.saleDate}></div>
          ))}
        </div>
      </div>
    </CheckPage>
  );
}
