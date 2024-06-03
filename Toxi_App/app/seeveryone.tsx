import React, { useEffect, useState } from 'react';
import { Image, Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import {useDispatch, useSelector} from "react-redux"
import { getPersoneList } from '@/Redux/thunk/PersonneThunk';
import { CataloguePersonne } from '@/components/PersonneCatalogue';

import { RootState } from '@/Redux/store';

export default function SeeEveryone() {

  const PersonneList = useSelector((state: RootState) => state.personne.personnes)

  const dispatch = useDispatch()
  
  useEffect(() => {
    const loadPersonnes = async() => {
      // @ts-ignore
      dispatch(getPersoneList());
    };
    loadPersonnes()
  }, [dispatch])



  return (
        <View>
          <CataloguePersonne dataPersonne={PersonneList}/>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  text: {
    fontSize: 18,
  },
});
