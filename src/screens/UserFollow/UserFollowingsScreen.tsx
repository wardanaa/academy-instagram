import {View, Text, ActivityIndicator, FlatList} from 'react-native';
import React from 'react';
import {useQuery} from '@apollo/client';
import {userFollowings} from './queries';
import {UserFollowingsQuery, UserFollowingsQueryVariables} from '../../API';
import ApiErrorMessage from '../../components/ApiErrorMessage';
import UserListItem from '../../components/UserListItem';

interface UserFollowingsScreenProps {
  userId: string;
}

const UserFollowingsScreen = ({userId}: UserFollowingsScreenProps) => {
  const {data, loading, error, refetch} = useQuery<
    UserFollowingsQuery,
    UserFollowingsQueryVariables
  >(userFollowings, {
    variables: {
      followerID: userId,
    },
  });

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return (
      <ApiErrorMessage
        title="Error fetching followers"
        message={error.message}
      />
    );
  }

  const users =
    data?.userFollowings?.items
      ?.filter(i => !i?._deleted)
      .map(i => i?.Followee) || [];


  return (
    <FlatList
      data={users}
      renderItem={({item}) => item && <UserListItem user={item} />}
      onRefresh={() => refetch()}
      refreshing={loading}
    />
  );
};

export default UserFollowingsScreen;
