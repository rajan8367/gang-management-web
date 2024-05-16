import { useUserContext } from "../hooks/userContext";
import CustomAlert from "./CustomAlert";

function ContentHolder() {
  const { customMsg } = useUserContext();
  if (customMsg.isVisible) return <CustomAlert msg={customMsg} />;
}
export default ContentHolder;
