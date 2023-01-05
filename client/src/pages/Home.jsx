import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect } from "react";
//import { useEffect } from "react";
import { Filler, Page } from "../common/layout";
import { useAuth } from "../context/AuthContext";
//import API from "../api";

const HomePage = styled(Page)`
  section {
    .intro {
      max-width: 1000px;
      font-size: 1.2rem;
    }
    .service-list {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding: 1rem;
      .service {
        color: gray;

        font-size: 1.5rem;
      }
    }
  }
`;
export default function Home(props) {
  const theme = useTheme();
  const { state } = useAuth();
  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <HomePage theme={theme}>
      <div className="page-title">
        CUDE - Car Undercover Dealer Exposure site
      </div>

      <div>
        <section>
          <h2>Our services:</h2>
          <ol className="service-list">
            <li className="service">
              Find the information about past car sale activity of specific
              person
            </li>

            <li className="service">
              Already bought car? Good to know! Now, help others to avoid
              frauds, make a car deal record!
            </li>

            <hr />

            <li className="service">
              * Find the information about current car sale activity of specific
              person (to be added)
            </li>
            <li className="service">
              * Read and tell others about deceiving dealer's techniques (to be
              added)
            </li>
          </ol>
        </section>
        <aside>
          <blockquote>
            <p>
              The car business is a cruel, cruel world. It doesn't care about
              you. It doesn't care about your feelings. It doesn't care about
              your family. It doesn't care about anything except selling cars
              and making money.
            </p>
            <cite> - Dale Earnhardt Jr.</cite>
          </blockquote>
        </aside>
      </div>
      <Filler />
    </HomePage>
  );
}
