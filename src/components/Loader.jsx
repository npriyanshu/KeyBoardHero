import { Space,Spin } from "antd"
import '../styles/loader.scss'
const Loader = () => {
  return (
    <div className="loader">
<p>Loading..please wait..</p>
        <Space size='middle'>
        <Spin size="large"/>
        </Space>
    </div>
  )
}

export default Loader