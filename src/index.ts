'use strict';

import '@/index.scss';
import {dispatcher} from '@utils/dispatcher';
import {actionStart} from '@actions/user';
import {socket} from '@utils/webSocket';
import {webPush} from "@utils/push";

dispatcher.dispatch(actionStart()).then(() => {
    webPush.askPermission();
});


