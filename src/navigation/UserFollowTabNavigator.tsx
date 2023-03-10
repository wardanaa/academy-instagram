import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {UserFollowers, UserFollowings} from '../screens/UserFollow';
import colors from '../theme/colors';
import {
  UserFollowScreenProps,
  UserFollowTabNavigatorParamList,
} from '../types/navigation';

const Tab = createMaterialTopTabNavigator<UserFollowTabNavigatorParamList>();

const UserFollowTabNavigator = ({route}: UserFollowScreenProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {paddingTop: insets.top},
        tabBarIndicatorStyle: {backgroundColor: colors.primary},
      }}>
      <Tab.Screen name="Followers">
        {props => <UserFollowers {...props} userId={route.params.id} />}
      </Tab.Screen>
      <Tab.Screen name="Followings">
        {props => <UserFollowings {...props} userId={route.params.id} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default UserFollowTabNavigator;
