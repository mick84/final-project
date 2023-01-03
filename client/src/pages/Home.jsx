import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Page } from "../common/layout";
const HomePage = styled(Page)``;
export default function Home(props) {
  const theme = useTheme();

  return (
    <HomePage theme={theme}>
      <div className="page-title">
        CUDE - Car Undercover Dealer Exposure site
      </div>
      <h3>Dear guest,welcome to our site!</h3>

      <div>
        <section>
          <p>
            If you are going to purchase an used car, you did the right thing,
            coming here! The main goal of the site is to provide you the most
            accurate information about the car seller, with whom you want to
            make a deal.
          </p>
          <h3>Our services:</h3>
          <ul className="service-list">
            <li className="service">
              Find the information about past and current car deal activity of
              specific person
            </li>
            <li className="service">
              Already bought car? Good to know! Now, help others to avoid
              frauds, make a car deal record!
            </li>
            <li className="service">
              Read and tell others about deceiving dealer's techniques
            </li>
          </ul>
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
    </HomePage>
  );
}
