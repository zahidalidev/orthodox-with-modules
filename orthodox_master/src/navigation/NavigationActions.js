import {NavigationActions} from 'react-navigation';
import store from '../store/store'
const viewNotification = (navigation, params) => {
    store.dispatch({ type: "UPDATE_ROUTE", route: 'notificationStack' });
    const navigate = NavigationActions.navigate({
        routeName: 'notificationStack',
        action: NavigationActions.navigate({
            routeName: 'viewNotification',
            params: params
        })
    })
    navigation.dispatch(navigate)
}

const viewPrayer = (navigation, params) => {
    store.dispatch({ type: "UPDATE_ROUTE", route: 'notificationStack' });
    const navigate = NavigationActions.navigate({
        routeName: 'notificationStack',
        action: NavigationActions.navigate({
            routeName: 'viewPrayer',
            params: {...params, id: params.subcat_id}
        })
    })
    navigation.dispatch(navigate)
}

const viewVideo = (navigation, params) => {
    store.dispatch({ type: "UPDATE_ROUTE", route: 'notificationStack' });
    const navigate = NavigationActions.navigate({
        routeName: 'notificationStack',
        action: NavigationActions.navigate({
            routeName: 'viewVideo',
            params: {...params, youtube_vid_id: getVideoId({ video_link: params.video_link })}
        })
    })
    navigation.dispatch(navigate)
}

const viewAudio = (navigation, params) => {
    store.dispatch({ type: "UPDATE_ROUTE", route: 'notificationStack' });
    const navigate = NavigationActions.navigate({
        routeName: 'notificationStack',
        action: NavigationActions.navigate({
            routeName: 'viewAudio',
            params: {...params, youtube_vid_id: this.getVideoId({ audio_link: params.audio_link })}
        })
    })
    navigation.dispatch(navigate)
}

getVideoId = vidObj => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = vidObj.video_link ? vidObj.video_link.match(regExp) : vidObj.audio_link.match(regExp);
     return match[7];
  };

export default {viewNotification, viewPrayer, viewVideo, viewAudio}