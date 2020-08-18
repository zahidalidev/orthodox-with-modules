let url =
  "https://www.orthodoxprayersandservices.com/orthodoxprayer/api/?action=category_data_list";

export let getPrayerCategories = () => {
  return fetch(url+'&get_all_category=1')
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
};

export let getPrayers = (id) => {
    return fetch(url+'&sub_category='+id)
    .then(res=>res.json())
    .then(res=>{
        return res
    })
    .catch(err=>console.log(err))
}

export let viewPrayer = (id) => {
    return fetch(url+'&category_details='+id)
    .then(res=>res.json())
    .then(res=>{
        return res
    })
    .catch(err=>console.log(err))
}

export let getContact = () => {
  return fetch(url+'&contact_us=1')
  .then(res=>res.json())
  .then(res=>{
    return res
  })
  .catch(err=>console.log(err))
}

export let getAboutUs = () => {
  return fetch(url+'&about_us=1')
  .then(res=>res.json())
  .then(res=>{
    return res
  })
  .catch(err=>console.log(err))
}

export let getOtherApps = () => {
  return fetch(url+'&other_apps=1')
  .then(res=>res.json())
  .then(res=>{
    return res
  })
  .catch(err=>console.log(err))
}

export let getVideos = () => {
  return fetch(url+'&get_all_video=1')
  .then(res=>res.json())
  .then(res=>{
    return res
  })
  .catch(err=>console.log(err))
}

export let getAudios = () => {
  return fetch(url+'&get_all_audio=1')
  .then(res=>res.json())
  .then(res=>{
    return res
  })
  .catch(err=>console.log(err))
}

export let getNotifications = () => {
  return fetch(url+'&get_all_notification=1')
  .then(res=>res.json())
  .then(res=>{
    return res
  })
  .catch(err=>console.log(err))
}

export let getNotificationMessage = (id) => {
  return fetch(url+'&get_message=1&message_id='+id)
  .then(res=>res.json())
  .then(res=>{
    return res
  })
  .catch(err=>console.log(err))
}
