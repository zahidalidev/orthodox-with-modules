import { AsyncStorage } from "react-native";

export let favoritePrayer = async obj => {
  //AsyncStorage.removeItem('favPrayers')
  let storedPrayer = await AsyncStorage.getItem("favPrayers");
  if (storedPrayer) {
    if (JSON.parse(storedPrayer).length >= 0) {
      let data = JSON.parse(storedPrayer);
      let check_index = data.findIndex(d=>d.id==obj.id);
      if(check_index == -1){
          data.push(obj)
        await AsyncStorage.setItem("favPrayers",JSON.stringify(data));
      }else{
          data.splice(check_index, 1);
          await AsyncStorage.setItem('favPrayers', JSON.stringify(data))
      }
    }
  } else {
    let favPrayers = [];
    favPrayers.push(obj);
    await AsyncStorage.setItem("favPrayers", JSON.stringify(favPrayers));
  }
};

export let getFavoritePrayer = async() => {
    let data = await AsyncStorage.getItem('favPrayers');
    return JSON.parse(data);
}

export let checkFavoritePrayer = async(id) => {
    let data = await AsyncStorage.getItem('favPrayers');
    let parsed = JSON.parse(data);
    let check = parsed.findIndex(i=>i.id===id)
    return check == -1 ? false : true;
}

export let setFavoriteVideo = async obj => {
  //AsyncStorage.removeItem('favPrayers')
  let storedVideos = await AsyncStorage.getItem("favVideos");
  if (storedVideos) {
    if (JSON.parse(storedVideos).length >= 0) {
      let data = JSON.parse(storedVideos);
      let check_index = data.findIndex(d=>d.id==obj.id);
      if(check_index == -1){
          data.push(obj)
        await AsyncStorage.setItem("favVideos",JSON.stringify(data));
      }else{
          data.splice(check_index, 1);
          await AsyncStorage.setItem('favVideos', JSON.stringify(data))
      }
    }
  } else {
    let favVideos = [];
    favVideos.push(obj);
    await AsyncStorage.setItem("favVideos", JSON.stringify(favVideos));
  }
};

export let checkFavoriteVideos = async(id) => {
  let data = await AsyncStorage.getItem('favVideos');
  let parsed = JSON.parse(data);
  let check = parsed.findIndex(i=>i.id===id)
  return check == -1 ? false : true;
}

export let getFavoriteVideos = async() => {
  let data = await AsyncStorage.getItem('favVideos');
  return JSON.parse(data);
}

export let setFavoriteAudio = async obj => {
  //AsyncStorage.removeItem('favPrayers')
  let storedAudios = await AsyncStorage.getItem("favAudios");
  if (storedAudios) {
    if (JSON.parse(storedAudios).length >= 0) {
      let data = JSON.parse(storedAudios);
      let check_index = data.findIndex(d=>d.id==obj.id);
      if(check_index == -1){
          data.push(obj)
        await AsyncStorage.setItem("favAudios",JSON.stringify(data));
      }else{
          data.splice(check_index, 1);
          await AsyncStorage.setItem('favAudios', JSON.stringify(data))
      }
    }
  } else {
    let favAudios = [];
    favAudios.push(obj);
    await AsyncStorage.setItem("favAudios", JSON.stringify(favAudios));
  }
};

export let checkFavoriteAudios = async(id) => {
  let data = await AsyncStorage.getItem('favAudios');
  let parsed = JSON.parse(data);
  let check = parsed.findIndex(i=>i.id===id)
  return check == -1 ? false : true;
}

export let getFavoriteAudios = async() => {
  let data = await AsyncStorage.getItem('favAudios');
  return JSON.parse(data);
}

export let storeNotification = async(notification) => {
  let nots = [];
  let data = await AsyncStorage.getItem('notifications');
  if(data){
    nots = JSON.parse(data);
    nots.unshift(notification);
  }else{
    nots.unshift(notification)
  }
  
  await AsyncStorage.setItem('notifications', JSON.stringify(nots));
}

export let getLocalNotifications = async() => {
  let data = await AsyncStorage.getItem('notifications');
  return JSON.parse(data);
}

export let deleteLocalNotification = async(index)=>{
  let data = await AsyncStorage.getItem('notifications');
  let parsed = JSON.parse(data);
  parsed.splice(index, 1);
  await AsyncStorage.setItem('notifications', JSON.stringify(parsed))

}