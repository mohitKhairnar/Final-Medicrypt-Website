import { Carousel } from 'antd';
import header1 from "../Form/prescriptionHeader.png";
const contentStyle = {
  height: '360px',
  color: '#fff',
  lineHeight: '160px',
  display: "flex",
  alignItem: "center",
  justifyContent: "center",
  background: '#364d79',
};
const App = () => (
  <Carousel autoplay>
    <div>
    <h1 style={contentStyle}>Welcome</h1>
    </div>
    <div>
      <h1 style={contentStyle}>To</h1>
    </div>
    <div>
      <h1 style={contentStyle}>My</h1>
    </div>
    <div>
      <h1 style={contentStyle}>Website</h1>
    </div>
  </Carousel>
);
export default App;