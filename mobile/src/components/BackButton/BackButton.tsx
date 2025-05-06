import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <MaterialIcons name="arrow-back-ios-new" size={25} color="black" />
    </TouchableOpacity>
  );
};
export default BackButton;